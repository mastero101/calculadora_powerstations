const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\maste\\.gemini\\antigravity-ide\\brain\\9bbf0584-38a2-49c0-8f85-f36ff1785c14';

const files = [
  ['ef_river3_1783754629069.png', 'ef-river3'],
  ['ef_delta2_1783754637097.png', 'ef-delta2'],
  ['ef_delta2max_1783754646428.png', 'ef-delta2max'],
  ['ef_deltapro_1783754654476.png', 'ef-deltapro'],
  ['ef_deltapro3_1783754661265.png', 'ef-deltapro3'],
  ['bt_eb3a_1783754673574.png', 'bt-eb3a'],
];

const output = {};
files.forEach(([src, key]) => {
  const srcPath = path.join(srcDir, src);
  if (fs.existsSync(srcPath)) {
    const b64 = fs.readFileSync(srcPath).toString('base64');
    output[key] = `data:image/png;base64,${b64}`;
    console.log(`${key}: ${b64.length} chars`);
  } else {
    console.warn(`MISSING: ${src}`);
  }
});

// Write as JS module
const jsContent = `// Auto-generated base64 images\nconst STATION_IMAGES = ${JSON.stringify(output, null, 0)};\n`;
fs.writeFileSync(path.join(__dirname, 'images.js'), jsContent);
console.log('Written images.js');
