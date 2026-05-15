const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGE_DIR = path.resolve(__dirname, '..', 'public', 'assets', 'images');
const GEN_JSON = path.resolve(__dirname, '..', 'lib', 'images-generated.json');

async function generateMetadata() {
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`Directory ${IMAGE_DIR} not found.`);
    return;
  }

  const files = fs.readdirSync(IMAGE_DIR).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));
  const metadata = {};

  for (const filename of files) {
    const publicPath = `/assets/images/${filename}`;
    const absPath = path.join(IMAGE_DIR, filename);

    try {
      console.log(`Processing: ${publicPath}`);
      const buffer = fs.readFileSync(absPath);
      
      const blur = await sharp(buffer)
        .resize({ width: 20 })
        .blur()
        .webp({ quality: 50 })
        .toBuffer();
      const blurDataURL = `data:image/webp;base64,${blur.toString('base64')}`;

      metadata[publicPath] = {
        localJpg: publicPath,
        blurDataURL,
      };
    } catch (err) {
      console.error(`  Error processing ${publicPath}:`, err.message);
    }
  }

  fs.writeFileSync(GEN_JSON, JSON.stringify(metadata, null, 2), 'utf8');
  console.log(`\nSaved metadata to ${GEN_JSON}`);
}

generateMetadata().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
