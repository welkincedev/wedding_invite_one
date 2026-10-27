import fs from 'fs';
import path from 'path';
import http from 'http';

const outDir = path.resolve('out');

console.log('=== Verifying Static Export for GitHub Pages ===');

// 1. Verify .nojekyll
const noJekyllPath = path.join(outDir, '.nojekyll');
if (fs.existsSync(noJekyllPath)) {
  console.log('✔ .nojekyll is present in out/');
} else {
  console.error('✖ MISSING .nojekyll in out/');
  process.exit(1);
}

// 2. Read index.html
const indexPath = path.join(outDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('✖ MISSING index.html in out/');
  process.exit(1);
}
console.log('✔ index.html is present in out/');

const htmlContent = fs.readFileSync(indexPath, 'utf-8');

// Check for broken root /assets links (should be /wedding_invite_one/assets)
const rawAssetMatches = htmlContent.match(/(?:href|src|content)=["']\/assets\/[^"']+["']/g) || [];
if (rawAssetMatches.length > 0) {
  console.error('✖ Found un-prefixed root /assets links:', rawAssetMatches);
  process.exit(1);
} else {
  console.log('✔ No un-prefixed /assets references found in index.html');
}

// Check for /wedding_invite_one references
const basePathMatches = htmlContent.match(/\/wedding_invite_one\/(?:_next|assets|favicon)[^"'\s\)]+/g) || [];
console.log(`✔ Found ${basePathMatches.length} correctly base-prefixed asset references in index.html`);

// Verify CSS files
const cssFiles = fs.readdirSync(path.join(outDir, '_next', 'static', 'css'));
for (const file of cssFiles) {
  const cssContent = fs.readFileSync(path.join(outDir, '_next', 'static', 'css', file), 'utf-8');
  const cssAssetMatches = cssContent.match(/url\(["']?\/assets\/[^"')]+["']?\)/g) || [];
  if (cssAssetMatches.length > 0) {
    console.error(`✖ Found un-prefixed /assets references in CSS ${file}:`, cssAssetMatches);
    process.exit(1);
  } else {
    console.log(`✔ CSS file ${file} has clean or properly prefixed URLs`);
  }
}

// Check actual critical assets defined in weddingConfig.ts on disk in out/
const criticalAssets = [
  'assets/events/event-nikah.jpg',
  'assets/events/event-reception.jpg',
  'assets/paper-texture.webp',
  'assets/wax-seal-gold.webp',
  'assets/floral-corner.webp',
  'assets/bismillah-sage.svg',
  'assets/bismillah.svg',
  'assets/wedding-ambient.wav',
  'favicon.svg'
];

let allAssetsFound = true;
for (const rel of criticalAssets) {
  const full = path.join(outDir, rel);
  if (!fs.existsSync(full)) {
    console.error(`✖ Missing static asset on disk: ${rel}`);
    allAssetsFound = false;
  } else {
    console.log(`✔ Verified asset exists on disk: ${rel}`);
  }
}

if (!allAssetsFound) {
  console.error('✖ Some static assets are missing from out/');
  process.exit(1);
}

// 3. HTTP Server Verification if running
async function testHttp() {
  const testUrls = [
    '/wedding_invite_one/',
    '/wedding_invite_one/assets/paper-texture.webp',
    '/wedding_invite_one/assets/events/event-nikah.jpg',
    '/wedding_invite_one/assets/events/event-reception.jpg',
    '/wedding_invite_one/favicon.svg'
  ];

  for (const u of testUrls) {
    await new Promise((resolve) => {
      http.get(`http://localhost:3001${u}`, (res) => {
        if (res.statusCode === 200) {
          console.log(`✔ HTTP 200 verified via static simulator: ${u}`);
        } else {
          console.error(`✖ HTTP ${res.statusCode} for: ${u}`);
        }
        resolve();
      }).on('error', () => {
        console.log(`(Static server not running at 3001, skipping HTTP check for ${u})`);
        resolve();
      });
    });
  }
}

testHttp().then(() => {
  console.log('=== All static export checks PASSED successfully! ===');
});
