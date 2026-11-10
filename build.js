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

console.log('Copying public/assets to dist/assets...');
const assetsDir = path.resolve('public/assets');
if (fs.existsSync(assetsDir)) {
  fs.cpSync(assetsDir, path.join(dist, 'assets'), { recursive: true });
}

console.log('Copying public/uploads to dist/uploads...');
const uploadsDir = path.resolve('public/uploads');
if (fs.existsSync(uploadsDir)) {
  fs.cpSync(uploadsDir, path.join(dist, 'uploads'), { recursive: true });
}

console.log('Build completed successfully!');
