const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');
const WebSocket = require('/Users/subham/code/intel/node_modules/next/dist/compiled/ws');

async function captureScrolled(scrollY, outputPath, width = 1440, height = 900) {
  const profileDir = `/tmp/brave_test_${Date.now()}`;
  const brave = spawn('/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', [
    '--headless=new',
    '--remote-debugging-port=9333',
    `--window-size=${width},${height}`,
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

    // Wait for animations and layout
    await send('Runtime.evaluate', { expression: 'new Promise(r => setTimeout(r, 1000))', awaitPromise: true });

    // Scroll to position
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY})` });
    await send('Runtime.evaluate', { expression: 'new Promise(r => setTimeout(r, 1500))', awaitPromise: true });

    // Capture screenshot
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outputPath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot to ${outputPath}`);

    ws.close();
  } finally {
    brave.kill();
  }
}

const args = process.argv.slice(2);
const scrollY = parseInt(args[0] || '0', 10);
const outPath = args[1] || 'screenshot.png';
const width = parseInt(args[2] || '1440', 10);
const height = parseInt(args[3] || '900', 10);

captureScrolled(scrollY, outPath, width, height)
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
