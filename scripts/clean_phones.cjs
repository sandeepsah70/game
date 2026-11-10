const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '..');

const allowed = ['9964441472', '9964441471'];

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'dist' || f === 'scripts') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.json') || f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.css')) {
      let content = fs.readFileSync(full, 'utf8');
      
      // Let's find any phone number occurrences
      // Common formats: 9916 218218, +91 9916218218, 9916218218, 9916219219, etc.
      // We will replace all variants of 9916218218 / 9916 218218 with 9964441472 / +91 99644 41472
      // and 9916219219 / 9916 219219 / 9916388000 / 9916827658 with 9964441471 / +91 99644 41471
      
      let modified = false;

      // Check for 9916 occurrences
      const p1_patterns = [
        /\+?91[\s-]*9916[\s-]*218218/g,
        /9916[\s-]*218218/g,
        /\+?91[\s-]*9916[\s-]*388000/g,
        /9916[\s-]*388000/g
      ];

      const p2_patterns = [
        /\+?91[\s-]*9916[\s-]*219219/g,
        /9916[\s-]*219219/g,
        /\+?91[\s-]*9916[\s-]*827658/g,
        /9916[\s-]*827658/g
      ];

      for (const pat of p1_patterns) {
        if (pat.test(content)) {
          content = content.replace(pat, (m) => {
            if (m.startsWith('+91')) return '+91 99644 41472';
            if (m.includes(' ')) return '99644 41472';
            return '9964441472';
          });
          modified = true;
        }
      }

      for (const pat of p2_patterns) {
        if (pat.test(content)) {
          content = content.replace(pat, (m) => {
            if (m.startsWith('+91')) return '+91 99644 41471';
            if (m.includes(' ')) return '99644 41471';
            return '9964441471';
          });
          modified = true;
        }
      }

      // Check general 9916...
      const general9916 = /\+?91[\s-]*9916\d{6}/g;
      if (general9916.test(content)) {
        content = content.replace(general9916, '+91 99644 41472');
        modified = true;
      }
      const raw9916 = /\b9916\d{6}\b/g;
      if (raw9916.test(content)) {
        content = content.replace(raw9916, '9964441472');
        modified = true;
      }

      if (modified) {
        console.log('Cleaned phone numbers in:', full);
        fs.writeFileSync(full, content, 'utf8');
      }
    }
  }
}

scanDir(targetDir);
console.log('Scan complete.');
