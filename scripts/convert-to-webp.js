const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'frontend', 'assets');

async function convertImages() {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file.match(/\.(png|jpe?g)$/i)) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.[^.]+$/, '.webp'));
      
      const inputSize = (fs.statSync(inputPath).size / 1024).toFixed(2);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        const outputSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
        console.log(`✅ Converted ${file} : ${inputSize} KB -> ${outputSize} KB`);
      } catch(err) {
        console.error(`❌ Failed converting ${file}:`, err);
      }
    }
  }
}

convertImages();
