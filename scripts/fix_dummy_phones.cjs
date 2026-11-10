const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..');

function replaceInFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/\+91\s*90000\s*30123/g, '+91 99644 41472');
  content = content.replace(/\+919000030123/g, '+919964441472');
  content = content.replace(/919000030123/g, '919964441472');
  content = content.replace(/9000030123/g, '9964441472');

  content = content.replace(/\+91\s*90000\s*30124/g, '+91 99644 41471');
  content = content.replace(/\+919000030124/g, '+919964441471');
  content = content.replace(/919000030124/g, '919964441471');
  content = content.replace(/9000030124/g, '9964441471');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Replaced in:', file);
  }
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (f === 'node_modules' || f === '.git' || f === 'dist' || f === 'scripts') continue;
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.json')) {
      replaceInFile(full);
    }
  }
}

walk(targetDir);
console.log('Done replacements.');
