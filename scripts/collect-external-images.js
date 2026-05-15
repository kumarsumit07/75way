const fs = require('fs');
const path = require('path');

// Scans the repo for any external image URLs (Unsplash, etc.)
// Usage: node scripts/collect-external-images.js

const root = path.resolve(__dirname, '..');
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json']);
const re = /https?:\/\/[^\"'\s,{})]+(?:\.jpg|\.png|\.webp|\.svg|\.jpeg|unsplash\.com\/photo-|placeholder\.com)[^\"'\s,{})]*/g;

function walk(dir, cb) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === '.next') continue;
      walk(p, cb);
    } else if (exts.has(path.extname(p).toLowerCase())) {
      const filename = path.basename(p);
      if (filename === 'images-to-download.json' || filename === 'images-to-download.utf8.json' || filename === 'images-generated.json') continue;
      cb(p);
    }
  }
}

const urls = new Map();
walk(root, (file) => {
  try {
    const txt = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = re.exec(txt))) {
      const u = m[0];
      if (u.includes('${') || u.length < 20) continue;
      if (u.endsWith('$')) continue;
      
      const arr = urls.get(u) || [];
      const relPath = path.relative(root, file);
      if (!arr.includes(relPath)) {
        arr.push(relPath);
      }
      urls.set(u, arr);
    }
  } catch (e) {}
});

const out = Array.from(urls.entries()).map(([url, files], i) => {
  const firstFile = files[0];
  const basename = path.basename(firstFile, path.extname(firstFile));
  const idMatch = url.match(/photo-([a-z0-9-]+)/i);
  let semanticName = idMatch ? `unsplash-${idMatch[1]}` : `${basename}-${i + 1}`;
  return { id: i + 1, url, files, semanticName };
});

fs.writeFileSync(path.resolve(root, 'images-to-download.json'), JSON.stringify(out, null, 2), 'utf8');
console.log('Saved images-to-download.json');
