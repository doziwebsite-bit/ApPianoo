const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const assetsDir = path.join(__dirname, '..', 'frontend', 'assets');
const files = fs.readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

(async () => {
  for (const file of files) {
    const input = path.join(assetsDir, file);
    const output = path.join(assetsDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    if (fs.existsSync(output)) { console.log('Skip (déjà converti):', file); continue; }
    const before = fs.statSync(input).size;
    await sharp(input).webp({ quality: 80 }).toFile(output);
    const after = fs.statSync(output).size;
    console.log(`✅ ${file} → ${file.replace(/\.(jpg|jpeg|png)$/i,'.webp')} | ${(before/1024).toFixed(0)}Kio → ${(after/1024).toFixed(0)}Kio (-${(100-(after/before*100)).toFixed(0)}%)`);
  }
})();
