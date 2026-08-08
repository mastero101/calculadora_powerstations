const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\maste\\.gemini\\antigravity-ide\\brain\\9bbf0584-38a2-49c0-8f85-f36ff1785c14';
const dstDir = path.join(__dirname, 'images');

if (!fs.existsSync(dstDir)) fs.mkdirSync(dstDir, { recursive: true });

const files = [
  ['ef_river3_1783754629069.png', 'ef-river3.png'],
  ['ef_delta2_1783754637097.png', 'ef-delta2.png'],
  ['ef_delta2max_1783754646428.png', 'ef-delta2max.png'],
  ['ef_deltapro_1783754654476.png', 'ef-deltapro.png'],
  ['ef_deltapro3_1783754661265.png', 'ef-deltapro3.png'],
  ['bt_eb3a_1783754673574.png', 'bt-eb3a.png'],
];

files.forEach(([src, dst]) => {
  const srcPath = path.join(srcDir, src);
  const dstPath = path.join(dstDir, dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`Copied: ${dst}`);
  } else {
    console.warn(`MISSING: ${src}`);
  }
});

console.log('Done.');
