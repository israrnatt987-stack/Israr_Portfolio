// Runs before Vercel deploys. No packages or network connection are required.
import { readFileSync, readdirSync, statSync, openSync, readSync, closeSync } from 'node:fs';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const references = new Set();
const errors = [];
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
function addReference(value, base = root) {
  if (!value || value.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return;
  const clean = decodeURIComponent(value.split(/[?#]/)[0]);
  const path = resolve(clean.startsWith('/') ? root : base, clean.replace(/^\/+/, ''));
  if (relative(root, path).startsWith('..' + sep)) {
    errors.push(`Reference outside the website: ${value}`);
    return;
  }
  references.add(relative(root, path));
}
for (const match of html.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi)) addReference(match[1]);
for (const name of readdirSync(root).filter(name => name.endsWith('.css'))) {
  const css = readFileSync(resolve(root, name), 'utf8');
  for (const match of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/gi)) addReference(match[1]);
}
const catalog = JSON.parse(readFileSync(resolve(root, 'video-catalog.json'), 'utf8'));
for (const video of catalog) addReference(video.thumbnail);
for (const name of references) {
  try {
    let dir = root;
    for (const part of name.split(sep)) {
      if (!readdirSync(dir).includes(part)) throw new Error('missing file or wrong filename case');
      dir = resolve(dir, part);
    }
    const stat = statSync(dir);
    if (!stat.isFile() || stat.size === 0) throw new Error('empty or invalid file');
    const fd = openSync(dir, 'r');
    const head = Buffer.alloc(128);
    try { readSync(fd, head, 0, head.length, 0); } finally { closeSync(fd); }
    if (head.toString().startsWith('version https://git-lfs.github.com/spec/v1')) throw new Error('Git LFS pointer instead of image bytes');
  } catch (error) {
    errors.push(`${name}: ${error.message}`);
  }
}
if (errors.length) {
  console.error('\nASSET CHECK FAILED\n' + errors.map(error => `- ${error}`).join('\n'));
  console.error('\nUpload the complete assets folder beside index.html, including assets/video-thumbnails. Keep filenames unchanged.\n');
  process.exitCode = 1;
} else {
  console.log(`Asset check passed: ${references.size} local files, including ${catalog.length} video thumbnails.`);
}
