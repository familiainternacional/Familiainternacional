import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');

const targets = [
  { input: 'hero-bg.png', quality: 82 },
  { input: 'internacionales-bg.png', quality: 80 },
] as const;

async function optimizeImage(input: string, quality: number) {
  const source = path.join(publicDir, input);
  if (!existsSync(source)) {
    console.warn(`Skip: ${input} not found`);
    return;
  }

  const output = source.replace(/\.png$/i, '.webp');
  const info = await sharp(source)
    .webp({ quality, effort: 6 })
    .toFile(output);

  const { stat } = await import('node:fs/promises');
  const before = await stat(source);
  console.log(
    `${input} → ${path.basename(output)}: ${Math.round(before.size / 1024)}KB → ${Math.round(info.size / 1024)}KB`,
  );
}

async function main() {
  for (const { input, quality } of targets) {
    await optimizeImage(input, quality);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
