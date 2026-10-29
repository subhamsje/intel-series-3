const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');
const WebSocket = require('/Users/subham/code/intel/node_modules/next/dist/compiled/ws');

async function testInteractions() {
  const profileDir = `/tmp/brave_test_${Date.now()}`;
  const brave = spawn('/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', [
    '--headless=new',
    '--remote-debugging-port=9333',
    '--window-size=1440,900',
    `--user-data-dir=${profileDir}`,
    'http://localhost:3001',
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const list = await new Promise((resolve, reject) => {
      http.get('http://localhost:9333/json/list', res => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => resolve(JSON.parse(raw)));
      }).on('error', reject);
    });

    const page = list.find(item => item.type === 'page');
    if (!page || !page.webSocketDebuggerUrl) {
      throw new Error('No page found');
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.on('open', r));

    let msgId = 1;
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = msgId++;
      const handler = (data) => {
        const msg = JSON.parse(data);
        if (msg.id === id) {
          ws.off('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.on('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });

    // Scroll to Scene 5
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 3600)' });
    await send('Runtime.evaluate', { expression: 'new Promise(r => setTimeout(r, 1200))', awaitPromise: true });

    // 1. Click "Demanding Creation & 3D" (Ultra Priority)
    await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes('Demanding Creation & 3D'));
        if (btn) btn.click();
      })()`
    });
    await send('Runtime.evaluate', { expression: 'new Promise(r => setTimeout(r, 600))', awaitPromise: true });

    let res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/subham/.gemini/antigravity/brain/d34657dd-9386-4111-9f0a-ccb0feb469c7/scene5-interactive-ultra.png', Buffer.from(res.data, 'base64'));
    console.log('Saved scene5-interactive-ultra.png');

    // 2. Also Click "Accessible Price-to-Performance" (Mixed / Split Priority)
    await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes('Accessible Price-to-Performance'));
        if (btn) btn.click();
      })()`
    });
    await send('Runtime.evaluate', { expression: 'new Promise(r => setTimeout(r, 600))', awaitPromise: true });

    res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/subham/.gemini/antigravity/brain/d34657dd-9386-4111-9f0a-ccb0feb469c7/scene5-interactive-split.png', Buffer.from(res.data, 'base64'));
    console.log('Saved scene5-interactive-split.png');

    // 3. Reset Priorities and Click Path B directly (Core Series 3 Focus)
    await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const resetBtn = buttons.find(b => b.textContent && b.textContent.includes('Reset'));
        if (resetBtn) resetBtn.click();
      })()`
    });
    await send('Runtime.evaluate', { expression: 'new Promise(r => setTimeout(r, 400))', awaitPromise: true });

    await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const coreBtn = buttons.find(b => b.textContent && b.textContent.includes('PATH B // MODERN EVERYDAY MOMENTUM'));
        if (coreBtn) coreBtn.click();
      })()`
    });
    await send('Runtime.evaluate', { expression: 'new Promise(r => setTimeout(r, 600))', awaitPromise: true });

    res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/subham/.gemini/antigravity/brain/d34657dd-9386-4111-9f0a-ccb0feb469c7/scene5-interactive-core.png', Buffer.from(res.data, 'base64'));
    console.log('Saved scene5-interactive-core.png');

    ws.close();
  } finally {
    brave.kill();
  }
}

testInteractions().catch(console.error);
