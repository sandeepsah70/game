import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

console.log('Cleaning dist directory...');
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

console.log('Copying index.html to dist...');
fs.copyFileSync('index.html', path.join(dist, 'index.html'));

console.log('Copying public contents to dist...');
const publicDir = path.resolve('public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, dist, { recursive: true });
}

console.log('Build completed successfully!');
