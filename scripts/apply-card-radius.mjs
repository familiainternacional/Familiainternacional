import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === 'node_modules') continue;
      walk(full, out);
    } else if (/\.(tsx|jsx|css)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const root = path.join(process.cwd(), 'src');
const files = walk(root);

const responsiveRadiusGroup =
  /(?:\s*(?:sm:|md:|lg:|xl:|2xl:)?rounded-\[(?:1\.25|1\.5|1\.75|2|2\.25|2\.5)rem\])+/g;

const fixedRadius = /\brounded-\[(?:14|16|18|20|24)px\]/g;
const cardRounded2xl = /\brounded-2xl(?=\s+(?:border|bg-|shadow|overflow-hidden))/g;
const cardRoundedXl = /\brounded-xl(?=\s+(?:border|bg-white|shadow|overflow-hidden))/g;

let changed = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  const original = content;

  content = content.replace(responsiveRadiusGroup, ' rounded-card');
  content = content.replace(fixedRadius, 'rounded-card');
  content = content.replace(cardRounded2xl, 'rounded-card');
  content = content.replace(cardRoundedXl, 'rounded-card');
  content = content.replace(/(?:rounded-card\s+)+rounded-card/g, 'rounded-card');

  if (content !== original) {
    writeFileSync(file, content, 'utf8');
    changed += 1;
  }
}

console.log(`Updated ${changed} files.`);
