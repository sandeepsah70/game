const fs = require('fs');
const path = require('path');

const bundle = fs.readFileSync(path.join(__dirname, '../public/pages_bundle.js'), 'utf8');

const matches = bundle.match(/class="[^"]*logo[^"]*"/gi);
console.log('Logo classes in bundle:', [...new Set(matches)]);

const imgMatches = bundle.match(/<img[^>]*src="[^"]*logo[^"]*"[^>]*>/gi);
console.log('Logo imgs in bundle:', imgMatches ? imgMatches.slice(0, 5) : 'none');
