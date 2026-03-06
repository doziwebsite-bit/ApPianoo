const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const assetsDir = path.join(__dirname, '..', 'frontend', 'assets');
const files = fs.readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

const SIZES = [300, 600, 900];

(async () => {
  for (const file of files) {
    const input = path.join(assetsDir, file);
    // Skip already resized files to prevent infinite loops (e.g., logo-300w.webp)
    if (/-(\d+)w\./.test(file)) continue;

    const ext = path.extname(file);
    const basename = path.basename(file, ext);

    for (const width of SIZES) {
      const outputName = `${basename}-${width}w.webp`;
      const output = path.join(assetsDir, outputName);

      if (fs.existsSync(output)) {
        console.log(`Skip (déjà redimensionné) : ${outputName}`);
        continue;
      }

      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output);
      
      console.log(`✅ Généré : ${outputName}`);
    }
  }
})();
