const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const sharp = require('sharp');

// Usage: node scripts/download-and-optimize.js images-to-download.json
// The script downloads each URL, writes original and optimized variants into public/images/unsplash,
// and produces a metadata JSON file at lib/images-generated.json

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Expected JSON file path as first arg');
    process.exit(1);
  }
  const raw = fs.readFileSync(arg, 'utf8');
  const items = JSON.parse(raw.replace(/^\uFEFF/, ''));
  const outDir = path.resolve(__dirname, '..', 'public', 'images', 'unsplash');
  fs.mkdirSync(outDir, { recursive: true });

  const meta = {};
  for (const it of items) {
    const url = it.url;
    try {
      const idMatch = url.match(/photo-([a-z0-9-]+)/i);
      const id = idMatch ? idMatch[1] : `img-${it.id}`;
      const filename = `${id}.jpg`;
      const filepath = path.join(outDir, filename);

      console.log('Downloading', url);
      const res = await fetch(url);
      if (!res.ok) {
        console.warn('Failed to download', url, res.status);
        meta[url] = { status: 'download_failed', code: res.status };
        continue;
      }
      const buffer = await res.buffer();
      fs.writeFileSync(filepath, buffer);

      // Generate optimized webp and resized variants
      const sizes = [400, 800, 1200];
      const variants = {};
      for (const w of sizes) {
        const outname = `${id}-${w}.webp`;
        const outpath = path.join(outDir, outname);
        await sharp(buffer).resize({ width: w }).webp({ quality: 80 }).toFile(outpath);
        variants[w] = path.posix.join('/images/unsplash', outname);
      }

      // small blur placeholder
      const blur = await sharp(buffer).resize({ width: 20 }).blur().webp({ quality: 50 }).toBuffer();
      const blurDataURL = `data:image/webp;base64,${blur.toString('base64')}`;

      meta[url] = {
        localJpg: path.posix.join('/images/unsplash', filename),
        variants,
        blurDataURL,
      };
    } catch (e) {
      console.error('Error processing', url, e.message);
      meta[url] = { status: 'error', message: e.message };
    }
  }

  const outMeta = path.resolve(__dirname, '..', 'lib', 'images-generated.json');
  fs.writeFileSync(outMeta, JSON.stringify(meta, null, 2));
  console.log('Wrote metadata to', outMeta);
}

main().catch((e) => { console.error(e); process.exit(1); });
