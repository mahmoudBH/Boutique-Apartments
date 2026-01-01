// scripts/convert-images.js
// Requires: npm i sharp
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
<img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1500" alt="Bloor Street Shopping" />

const inputDir = path.join(__dirname, '..', 'public', 'images'); // ضع صورك هنا
const outDir = inputDir; // نستخرج نفس المجلد بصيغ جديدة
const placeholdersFile = path.join(__dirname, '..', 'public', 'placeholders.json');

async function processImage(file) {
  try {
    const name = path.parse(file).name;
    const full = path.join(inputDir, file);

    // produce webp + avif
    await sharp(full).resize({ width: 1600 }).toFile(path.join(outDir, `${name}.webp`));
    await sharp(full).resize({ width: 1600 }).avif({ quality: 60 }).toFile(path.join(outDir, `${name}.avif`));

    // produce tiny blur placeholder (width: 20)
    const tiny = await sharp(full)
      .resize(20)
      .blur()
      .toBuffer();

    const base64 = `data:image/jpeg;base64,${tiny.toString('base64')}`;
    return { name, src: `images/${file}`, webp: `images/${name}.webp`, avif: `images/${name}.avif`, placeholder: base64 };
  } catch (err) {
    console.error('Failed for', file, err);
    return null;
  }
}

(async () => {
  const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png)$/i.test(f));
  const out = {};
  for (const f of files) {
    const res = await processImage(f);
    if (res) out[res.name] = { webp: res.webp, avif: res.avif, placeholder: res.placeholder, original: res.src };
  }
  fs.writeFileSync(placeholdersFile, JSON.stringify(out, null, 2));
  console.log('Done. placeholders.json written to public/placeholders.json');
})();
