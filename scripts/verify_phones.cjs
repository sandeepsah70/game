const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..');
const allowed = ['9964441472', '9964441471'];

function scan(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'dist' || f === 'scripts') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scan(full);
    } else if (f.endsWith('.json') || f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      // Look for 10-digit numbers or phone-like patterns
      const matches = content.match(/(?:\+?91[\s-]*)?[6-9]\d{9}/g);
      if (matches) {
        for (const m of matches) {
          const digits = m.replace(/\D/g, '').slice(-10);
          if (!allowed.includes(digits) && digits.length === 10) {
            // Check if it's a timestamp (like 1794... or 1730...)
            if (digits.startsWith('179') || digits.startsWith('173') || digits.startsWith('172')) continue;
            console.log(`Found non-allowed phone in ${f}: ${m} (digits: ${digits})`);
          }
        }
      }
    }
  }
}

scan(targetDir);
console.log('Phone verification complete.');
