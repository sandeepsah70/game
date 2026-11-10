const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const pjson = fs.readFileSync(path.join(__dirname, '../public/pages_bundle.json'), 'utf8');

function searchMatches(str, term) {
  let idx = 0;
  while ((idx = str.indexOf(term, idx)) !== -1) {
    console.log(str.slice(Math.max(0, idx - 40), Math.min(str.length, idx + 100)));
    idx += term.length;
  }
}

console.log('=== in index.html ===');
searchMatches(indexHtml, 'vigilant-badge');
searchMatches(indexHtml, 'jtms-logo');

console.log('=== in pages_bundle.json ===');
searchMatches(pjson, 'vigilant-badge');
searchMatches(pjson, 'jtms-logo');
