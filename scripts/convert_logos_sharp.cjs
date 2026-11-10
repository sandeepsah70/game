const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcPng = path.resolve(__dirname, '../public/uploads/logo/jtms-logo-transparent.png');

async function main() {
  const targets = [
    { file: '../public/uploads/logo/jtms-logo.webp', size: 1024 },
    { file: '../public/uploads/logo/jtms-logo-480.webp', size: 480 },
    { file: '../public/uploads/media/2026/10/bengaluru-squad-vigilant-badge-removebg-preview.webp', size: 1024 },
    { file: '../public/uploads/media/2026/10/bengaluru-squad-vigilant-badge-removebg-preview-480.webp', size: 480 },
    { file: '../public/uploads/media/2026/10/bengaluru-squad-vigilant-badge-removebg-preview-2.webp', size: 1024 },
    { file: '../public/uploads/media/2026/10/bengaluru-squad-vigilant-badge-removebg-preview-2-480.webp', size: 480 },
    { file: '../public/uploads/media/2026/10/logo-blr-copy-jpg-photoroom-3.webp', size: 1024 },
    { file: '../public/uploads/media/2026/10/logo-blr-copy-jpg-photoroom-4.webp', size: 1024 },
    { file: '../public/uploads/media/2026/10/logo-blr-copy-jpg-photoroom-4-480.webp', size: 480 },
    { file: '../public/uploads/media/2026/10/logo-blr-copy-jpg-photoroom-5.webp', size: 1024 }
  ];

  for (const t of targets) {
    const dest = path.resolve(__dirname, t.file);
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    await sharp(srcPng)
      .resize(t.size, t.size)
      .webp({ quality: 90, alphaQuality: 100, lossless: false })
      .toFile(dest);
    console.log(`Wrote WebP: ${dest} (${t.size}x${t.size})`);
  }
  console.log('All WebP conversions done successfully!');
}

main().catch(console.error);
