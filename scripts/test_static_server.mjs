import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3001;
const OUT_DIR = path.resolve('out');
const BASE_PATH = '/wedding_invite_one';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url || '/';

  // If requesting root without base path, redirect or 404
  if (!reqUrl.startsWith(BASE_PATH)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Not found (GitHub Pages project site lives at ${BASE_PATH})`);
    return;
  }

  // Strip base path
  let relativePath = reqUrl.slice(BASE_PATH.length);
  if (relativePath === '' || relativePath === '/') {
    relativePath = '/index.html';
  }

  // Remove query params
  relativePath = relativePath.split('?')[0];

  const filePath = path.join(OUT_DIR, relativePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // 404 fallback
    const notFoundPath = path.join(OUT_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Static Pages Simulator running at http://localhost:${PORT}${BASE_PATH}/`);
});
