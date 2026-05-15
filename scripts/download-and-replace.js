const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const sharp = require('sharp');

const IMAGES_JSON = 'images-to-download.json';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'assets', 'images');
const ROOT_DIR = path.resolve(__dirname, '..');
const GEN_JSON = path.resolve(__dirname, '..', 'lib', 'images-generated.json');

async function downloadAndOptimize() {
  if (!fs.existsSync(IMAGES_JSON)) {
    console.error(`File ${IMAGES_JSON} not found.`);
    return;
  }

  const raw = fs.readFileSync(IMAGES_JSON, 'utf8');
  const items = JSON.parse(raw.replace(/^\uFEFF/, ''));

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const mapping = {};
  const metadata = {};

  for (const item of items) {
    const { url, semanticName } = item;
    const ext = '.webp';
    const filename = `${semanticName}${ext}`;
    const targetPath = path.join(OUTPUT_DIR, filename);
    const publicPath = `/assets/images/${filename}`;

    try {
      console.log(`Processing: ${url}`);
      let buffer;
      
      // If already downloaded, just read it
      if (fs.existsSync(targetPath)) {
        buffer = fs.readFileSync(targetPath);
      } else {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        buffer = await res.buffer();
        
        await sharp(buffer)
          .webp({ quality: 85 })
          .toFile(targetPath);
      }

      mapping[url] = publicPath;

      // Generate blur placeholder
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

      console.log(`  Processed: ${publicPath}`);
    } catch (err) {
      console.error(`  Error processing ${url}:`, err.message);
    }
  }

  // Save metadata
  fs.writeFileSync(GEN_JSON, JSON.stringify(metadata, null, 2), 'utf8');
  console.log(`\nSaved metadata to ${GEN_JSON}`);

  // Now replace in files
  console.log('\nReplacing URLs in files...');
  const filesToUpdate = new Set();
  items.forEach(item => item.files.forEach(f => filesToUpdate.add(f)));

  for (const relFilePath of filesToUpdate) {
    const absPath = path.join(ROOT_DIR, relFilePath);
    if (!fs.existsSync(absPath)) continue;

    let content = fs.readFileSync(absPath, 'utf8');
    let changed = false;

    for (const [remoteUrl, localPath] of Object.entries(mapping)) {
      if (content.includes(remoteUrl)) {
        const escapedUrl = remoteUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedUrl, 'g');
        content = content.replace(regex, localPath);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(absPath, content, 'utf8');
      console.log(`  Updated: ${relFilePath}`);
    }
  }

  console.log('\nFinished!');
}

downloadAndOptimize().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
