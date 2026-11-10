const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const pjs = fs.readFileSync(path.join(__dirname, '../public/pages_bundle.js'), 'utf8');

function findContext(text, str) {
  let idx = 0;
  while ((idx = text.indexOf(str, idx)) !== -1) {
    console.log('--- Found', str, '---');
    console.log(text.slice(Math.max(0, idx - 60), Math.min(text.length, idx + 80)));
    idx += str.length;
  }
}

console.log('=== In index.html ===');
findContext(indexHtml, '9000030123');
findContext(indexHtml, '6016908431');

console.log('=== In pages_bundle.js ===');
findContext(pjs, '8881124088');
findContext(pjs, '6016908431');
findContext(pjs, '6324006960');
