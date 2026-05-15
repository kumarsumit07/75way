const fs = require('fs');
const path = require('path');

// Scans the repo for Unsplash URLs and emits a JSON array of unique URLs
// Usage: node scripts/collect-unsplash-urls.js > images-to-download.json

const root = path.resolve(__dirname, '..');
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json']);
const re = /https:\/\/images\.unsplash\.com\/[^\"'\s,{})]+/g;

function walk(dir, cb) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === '.next') continue;
      walk(p, cb);
    } else if (exts.has(path.extname(p).toLowerCase())) {
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
      const arr = urls.get(u) || [];
      arr.push(path.relative(root, file));
      urls.set(u, arr);
    }
  } catch (e) {}
});

const out = Array.from(urls.entries()).map(([url, files], i) => ({ id: i + 1, url, files }));
console.log(JSON.stringify(out, null, 2));
