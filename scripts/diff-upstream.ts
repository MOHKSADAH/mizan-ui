import { readdir } from 'node:fs/promises';

// Manual check, not run in CI: bun scripts/diff-upstream.ts [name ...]
// Compares each registry/ui file with the upstream shadcn base-nova item and prints one line per file.
const BASE = 'https://ui.shadcn.com/r/styles/base-nova';

const normalize = (source: string) =>
  source
    .replace(/\r\n/g, '\n')
    .replace(/from\s+["'](?:cn|@\/registry\/lib\/utils)["']/g, 'from "cn"')
    .replace(/["']@\/registry\/(?:base-nova\/)?ui\/([\w-]+)["']/g, '"@/ui/$1"')
    .split('\n')
    .map((line) => line.trimEnd())
    .filter(Boolean);

function countDiff(ours: string[], upstream: string[]) {
  const left = new Map<string, number>();
  for (const line of upstream) left.set(line, (left.get(line) ?? 0) + 1);
  let added = 0;
  for (const line of ours) {
    const n = left.get(line) ?? 0;
    if (n) left.set(line, n - 1);
    else added++;
  }
  return { added, removed: [...left.values()].reduce((a, b) => a + b, 0) };
}

const names = process.argv.slice(2);
const files = (await readdir('registry/ui')).filter((f) => f.endsWith('.tsx')).map((f) => f.replace(/\.tsx$/, ''));
let differ = 0;
for (const name of names.length ? names : files) {
  const res = await fetch(`${BASE}/${name}.json`);
  if (!res.ok) {
    console.log(`${name.padEnd(24)} not upstream (${res.status})`);
    continue;
  }
  const item = (await res.json()) as { files: { path: string; content: string }[] };
  const upstream = item.files.find((f) => f.path.endsWith(`/${name}.tsx`))?.content;
  if (!upstream) {
    console.log(`${name.padEnd(24)} no ${name}.tsx in upstream item`);
    continue;
  }
  const { added, removed } = countDiff(
    normalize(await Bun.file(`registry/ui/${name}.tsx`).text()),
    normalize(upstream),
  );
  if (added || removed) differ++;
  console.log(`${name.padEnd(24)} ${added || removed ? `differs: +${added} -${removed} lines` : 'same'}`);
}
console.log(`\n${differ} file(s) differ from upstream base-nova.`);
