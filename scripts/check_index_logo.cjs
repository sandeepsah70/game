const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

const matches = indexHtml.match(/<img[^>]+>/gi) || [];
for (const m of matches) {
  if (m.toLowerCase().includes('logo') || m.toLowerCase().includes('badge') || m.toLowerCase().includes('jtms')) {
    console.log(m);
  }
}
