import { spawn } from "child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;

const chromeProcess = spawn(CHROME_PATH, [
  `--remote-debugging-port=${PORT}`,
  "--headless=new",
  "--no-first-run",
  "--no-default-browser-check",
  "--user-data-dir=" + process.env.TEMP + "\\chrome-maybe-test-" + Date.now(),
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

  // Wait for Next.js dev server on-demand compilation
  for (let i = 0; i < 30; i++) {
    const len = await evalCode(`document.body?.innerHTML?.length || 0`);
    if (len > 1000) break;
    await new Promise((r) => setTimeout(r, 500));
  }

  const pageInfo = await evalCode(`
    (() => {
      return {
        title: document.title,
        bodyLen: document.body?.innerHTML?.length || 0,
        btns: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim())
      };
    })()
  `);
  console.log("Page info after load:", pageInfo);

  // Skip intro
  const skipLog = await evalCode(`
    (() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Skip intro') || b.textContent.includes('Open Invitation'));
      if (btn) {
        btn.click();
        return 'Clicked: ' + btn.textContent.trim();
      }
      return 'No intro button found';
    })()
  `);
  console.log("Intro button:", skipLog);
  await new Promise((r) => setTimeout(r, 2200));

  console.log("=== 1. TESTING 'Maybe' RESPONSE ===");
  const selectMaybe = await evalCode(`
    (() => {
      const maybeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Maybe') && !b.textContent.includes('Response'));
      if (maybeBtn) {
        maybeBtn.click();
        return { success: true, text: maybeBtn.textContent.trim() };
      }
      return { success: false, allButtons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()) };
    })()
  `);
  console.log("Select Maybe:", selectMaybe);
  await new Promise((r) => setTimeout(r, 500));

  const checkMaybeForm = await evalCode(`
    (() => {
      const countInput = document.getElementById('guestCount');
      const nameInput = document.getElementById('guestName');
      const msgInput = document.getElementById('guestMessage');
      const rsvpText = document.getElementById('rsvp')?.textContent || '';
      const hasHopeHeader = rsvpText.includes('We hope you can join us!');
      const hasSpecialSubtext = rsvpText.includes('It would mean so much to celebrate this special day with you.');
      return {
        guestCountFieldPresent: !!countInput,
        nameFieldPresent: !!nameInput,
        msgFieldPresent: !!msgInput,
        hasHopeHeader,
        hasSpecialSubtext
      };
    })()
  `);
  console.log("Maybe Form Check:", checkMaybeForm);

  console.log("\n=== 2. TESTING 'Change answer' RETENTION ===");
  const testInputRetention = await evalCode(`
    (() => {
      const nameInput = document.getElementById('guestName');
      const setVal = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setVal.call(nameInput, 'Dr. Haris & Family');
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));

      const msgInput = document.getElementById('guestMessage');
      const setValMsg = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      setValMsg.call(msgInput, 'Hoping to make it Insha Allah!');
      msgInput.dispatchEvent(new Event('input', { bubbles: true }));

      const changeBtn = Array.from(document.querySelectorAll('#rsvp button')).find(b => b.textContent.includes('Change answer'));
      changeBtn.click();
      return { filled: true };
    })()
  `);
  console.log("Filled inputs & clicked change answer:", testInputRetention);
  await new Promise((r) => setTimeout(r, 500));

  console.log("\n=== 3. TESTING 'Respectfully No!' WITH RETAINED INPUTS ===");
  const selectNo = await evalCode(`
    (() => {
      const noBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Respectfully No!'));
      if (noBtn) {
        noBtn.click();
        return { success: true };
      }
      return { success: false };
    })()
  `);
  console.log("Select Respectfully No!:", selectNo);
  await new Promise((r) => setTimeout(r, 500));

  const checkNoForm = await evalCode(`
    (() => {
      const countInput = document.getElementById('guestCount');
      const nameInput = document.getElementById('guestName');
      const msgInput = document.getElementById('guestMessage');
      const rsvpText = document.getElementById('rsvp')?.textContent || '';
      const hasMissedMessage = rsvpText.includes('You’ll be missed, and you’ll be in our thoughts.') || rsvpText.includes('You\u2019ll be missed, and you\u2019ll be in our thoughts.');
      return {
        guestCountFieldPresent: !!countInput,
        nameRetained: nameInput?.value,
        messageRetained: msgInput?.value,
        hasMissedMessage
      };
    })()
  `);
  console.log("Respectfully No! Form Check:", checkNoForm);

  console.log("\n=== 4. TESTING 'Joyfully Yes!' GUEST COUNT FIELD ===");
  await evalCode(`
    (() => {
      const changeBtn = Array.from(document.querySelectorAll('#rsvp button')).find(b => b.textContent.includes('Change answer'));
      if (changeBtn) changeBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 500));

  const selectYes = await evalCode(`
    (() => {
      const yesBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Joyfully Yes!'));
      if (yesBtn) {
        yesBtn.click();
        return { success: true };
      }
      return { success: false };
    })()
  `);
  console.log("Select Joyfully Yes!:", selectYes);
  await new Promise((r) => setTimeout(r, 500));

  const checkYesForm = await evalCode(`
    (() => {
      const countInput = document.getElementById('guestCount');
      return {
        guestCountFieldPresent: !!countInput,
        guestCountValue: countInput?.value,
        min: countInput?.min
      };
    })()
  `);
  console.log("Joyfully Yes! Form Check:", checkYesForm);

  ws.close();
} catch (e) {
  console.error("Test error:", e);
} finally {
  chromeProcess.kill();
  console.log("\nRSVP verification test completed.");
}
