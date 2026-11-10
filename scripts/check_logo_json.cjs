const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Find all occurrences of logoLight and logoDark in indexHtml
let m = indexHtml.match(/"logoLight":\{[^}]+\}/g);
console.log('logoLight:', m);
m = indexHtml.match(/"logoDark":\{[^}]+\}/g);
console.log('logoDark:', m);
m = indexHtml.match(/"logo":\{[^}]+\}/g);
console.log('logo:', m);
