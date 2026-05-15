# Image optimization & replacement workflow

This repository includes tooling to detect external Unsplash image usage, download the images locally, optimize them, and wire them into the app.

Overview
- `scripts/collect-unsplash-urls.js` — scans the codebase for `images.unsplash.com` URLs and prints a JSON list.
- `scripts/download-and-optimize.js` — given the JSON list, downloads each image, writes originals and optimized webp variants into `public/images/unsplash`, and emits `lib/images-generated.json` metadata.
- `lib/image-map.ts` — central image map which imports the generated JSON metadata and exposes `IMAGE_MAP` for use in code.
- `components/OptimizedImage.tsx` — a small wrapper around `next/image` that uses `IMAGE_MAP` to prefer local optimized assets and falls back to `/images/placeholder.svg` on errors.

How to run
1. Install new dev deps: `pnpm add -D sharp node-fetch@2` (or `npm install --save-dev sharp node-fetch@2`).
2. Collect remote images:
   - `pnpm run images:collect` > `images-to-download.json`
3. Download and optimize:
   - `pnpm run images:download`
   This writes files to `public/images/unsplash` and `lib/images-generated.json`.

Afterwards
- `lib/images-generated.json` will contain a mapping you can use to replace remote URLs with local paths.
- Replace direct remote `src` references with `components/OptimizedImage` or update your code to import from `lib/image-map`.

Notes & recommendations
- This script uses Unsplash direct image URLs present in the code; some URLs may return 404 if the photo was removed. The download script will mark failures in the generated metadata so you can substitute manual assets or placeholders.
- For maximum Lighthouse improvements, the script generates WebP variants and a small blur placeholder for a fast LCP-friendly load.
- After images are generated, remove unnecessary `images.remotePatterns` entries from `next.config.ts` to prevent runtime remote loads.
