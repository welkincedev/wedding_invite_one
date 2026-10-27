import { spawn } from "child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;

const chromeProcess = spawn(CHROME_PATH, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=" + process.env.TEMP + "\\chrome-audit-" + Date.now(),
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

  // Skip the intro folio to access main page
  const skipResult = await evalCode(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip intro') || b.textContent.includes('Open Invitation'));
      if (btn) {
        btn.click();
        return 'Clicked button: ' + btn.textContent.trim();
      }
      return 'No intro button found';
    })()
  `);
  console.log("Intro button click:", skipResult);

  await new Promise((r) => setTimeout(r, 1800));

  const viewports = [
    { width: 320, height: 600, label: "Narrow mobile (320px)" },
    { width: 360, height: 740, label: "Standard mobile (360px)" },
    { width: 390, height: 844, label: "iPhone 12/13/14 (390px)" },
    { width: 430, height: 932, label: "Large phone (430px)" },
    { width: 768, height: 1024, label: "Tablet / iPad (768px)" },
    { width: 1024, height: 768, label: "Laptop / Desktop (1024px)" },
    { width: 1440, height: 900, label: "Wide screen (1440px)" }
  ];

  console.log("\n=== AUDITING VIEWPORT WIDTHS ===");
  for (const vp of viewports) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 768
    });
    await new Promise((r) => setTimeout(r, 300));

    const res = await evalCode(`
      (() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasHScroll = docWidth > winWidth;
        const rsvpBtns = Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()).filter(t => t.includes('Joyfully Yes!') || t.includes('Maybe') || t.includes('Respectfully No!'));
        return {
          docWidth,
          winWidth,
          hasHScroll,
          hasHero: !!document.querySelector('header'),
          hasClosing: !!document.querySelector('footer'),
          rsvpButtonsCount: rsvpBtns.length
        };
      })()
    `);

    const status = res && !res.hasHScroll ? "✓ PASS (No horizontal overflow)" : `✗ FAIL (${res?.docWidth}px > ${res?.winWidth}px)`;
    console.log(`[${vp.width}px] ${vp.label}: ${status} | RSVP 3 options present: ${res?.rsvpButtonsCount === 3}`);
  }

  console.log("\n=== TESTING RSVP TWO-STEP INTERACTION ===");
  // Step A: Click "Joyfully Yes!"
  const stepARes = await evalCode(`
    (() => {
      const joyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Joyfully Yes!'));
      if (!joyBtn) return { success: false, error: 'Joyfully Yes! button not found' };
      joyBtn.click();
      return { success: true };
    })()
  `);
  console.log("1. Select 'Joyfully Yes!':", stepARes);
  await new Promise((r) => setTimeout(r, 600));

  // Step B: Check form fields
  const formCheck = await evalCode(`
    (() => {
      const nameInput = document.getElementById('guestName');
      const countInput = document.getElementById('guestCount');
      const msgInput = document.getElementById('guestMessage');
      const submitBtn = document.querySelector('#rsvp button[type="submit"]');
      const changeBtn = Array.from(document.querySelectorAll('#rsvp button')).find(b => b.textContent.includes('Change answer'));
      return {
        hasNameInput: !!nameInput,
        hasCountInput: !!countInput,
        hasMsgInput: !!msgInput,
        hasSubmitBtn: !!submitBtn,
        hasChangeBtn: !!changeBtn
      };
    })()
  `);
  console.log("2. Form fields rendered for 'Joyfully Yes!':", formCheck);

  // Test "Change answer" back to Step A
  const changeRes = await evalCode(`
    (() => {
      const changeBtn = Array.from(document.querySelectorAll('#rsvp button')).find(b => b.textContent.includes('Change answer'));
      if (changeBtn) {
        changeBtn.click();
        return { success: true };
      }
      return { success: false };
    })()
  `);
  console.log("3. Click 'Change answer' returns to Step A:", changeRes);
  await new Promise((r) => setTimeout(r, 600));

  // Test selecting "Respectfully No!"
  const noRes = await evalCode(`
    (() => {
      const noBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Respectfully No!'));
      if (!noBtn) return { success: false, error: 'Respectfully No! button not found' };
      noBtn.click();
      return { success: true };
    })()
  `);
  console.log("4. Select 'Respectfully No!':", noRes);
  await new Promise((r) => setTimeout(r, 600));

  // Check that guest count is not shown for "Respectfully No!"
  const noFormCheck = await evalCode(`
    (() => {
      const countInput = document.getElementById('guestCount');
      const notePresent = document.querySelector('#rsvp')?.textContent.includes('not required');
      return {
        countInputHidden: !countInput,
        notePresent: !!notePresent
      };
    })()
  `);
  console.log("5. 'Respectfully No!' hides guest count with note:", noFormCheck);

  // Test name validation
  const validationRes = await evalCode(`
    (() => {
      const nameInput = document.getElementById('guestName');
      const setVal = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setVal.call(nameInput, '');
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      const submitBtn = document.querySelector('#rsvp button[type="submit"]');
      submitBtn.click();
      return new Promise((resolve) => {
        setTimeout(() => {
          const errorMsg = document.querySelector('#rsvp .text-red-600')?.textContent || '';
          resolve({
            hasErrorMsg: errorMsg.includes('Please enter your name'),
            errorMsgText: errorMsg
          });
        }, 100);
      });
    })()
  `);
  console.log("6. Empty name shows validation error:", validationRes);

  ws.close();
} catch (err) {
  console.error("Audit error:", err);
} finally {
  chromeProcess.kill();
  console.log("\nChrome audit completed successfully.");
}
