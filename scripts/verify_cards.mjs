import { spawn } from "child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;

const chromeProcess = spawn(CHROME_PATH, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=" + process.env.TEMP + "\\chrome-card-audit-" + Date.now(),
  "http://localhost:3000"
]);

await new Promise((r) => setTimeout(r, 1500));

try {
  const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const pages = await versionRes.json();
  const page = pages.find((p) => p.type === "page") || pages[0];

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = idCounter++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  const evalCode = async (expr) => {
    const res = await send("Runtime.evaluate", {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    return res?.result?.result?.value;
  };

  await new Promise((r) => (ws.onopen = r));

  await send("Page.enable");
  await send("DOM.enable");
  await send("Runtime.enable");

  await send("Page.navigate", { url: "http://localhost:3000" });
  await new Promise((r) => setTimeout(r, 2000));

  // Skip intro
  await evalCode(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip intro') || b.textContent.includes('Open Invitation'));
      if (btn) btn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 1500));

  console.log("=== VERIFYING EVENT CARDS CONTENT & MAP LINKS ===");
  const cardData = await evalCode(`
    (() => {
      const cards = Array.from(document.querySelectorAll('.event-glass-card'));
      return cards.map(c => {
        const title = c.querySelector('h3')?.textContent.trim();
        const badge = c.querySelector('.event-glass-badge')?.textContent.trim();
        const status = c.querySelector('.event-glass-status')?.textContent.trim();
        const mapLink = c.querySelector('a[href*="google.com/maps"]')?.href;
        const img = c.querySelector('img')?.src;
        const text = c.textContent;
        return {
          title,
          badge,
          status,
          mapLink,
          img,
          hasKuthiathode: text.includes('Kuthiathode Juma Masjid'),
          hasPalace: text.includes('The Palace Convention Centre'),
          has13Dec: text.includes('Sunday, 13 December 2026'),
          has11AM: text.includes('11:00 AM'),
          hasUnconfirmedNote: text.includes('To be announced by the family') || text.includes('Schedule to be announced')
        };
      });
    })()
  `);
  console.log(JSON.stringify(cardData, null, 2));

  // Check mobile and desktop layouts
  console.log("\n=== CHECKING RESPONSIVE LAYOUT OF CARDS ===");
  for (const w of [360, 390, 768, 1200]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: 800,
      deviceScaleFactor: 1,
      mobile: w < 768
    });
    await new Promise((r) => setTimeout(r, 300));
    const layout = await evalCode(`
      (() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const cards = Array.from(document.querySelectorAll('.event-glass-card'));
        const rects = cards.map(c => ({
          width: c.offsetWidth,
          height: c.offsetHeight,
          top: c.offsetTop,
          left: c.offsetLeft
        }));
        return {
          hasHScroll: docWidth > winWidth,
          isStacked: rects.length >= 2 && rects[0].top !== rects[1].top,
          isSideBySide: rects.length >= 2 && rects[0].top === rects[1].top,
          card1Width: rects[0]?.width,
          card2Width: rects[1]?.width
        };
      })()
    `);
    console.log(`[${w}px] Overflow: ${layout?.hasHScroll ? 'FAIL' : 'PASS'} | Stacked: ${layout?.isStacked} | SideBySide: ${layout?.isSideBySide}`);
  }

  ws.close();
} catch (e) {
  console.error("Error:", e);
} finally {
  chromeProcess.kill();
}
