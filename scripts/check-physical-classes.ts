import { Glob } from 'bun';

const PHYSICAL =
  /(?:^|[\s"'`:!{(,])-?(?:(?:scroll-)?[mp][lr]-|left-|right-|text-(?:left|right)(?![\w-])|rounded-(?:tl|tr|bl|br|l|r)(?!\w)|border-[lr](?!\w))/;

export function findPhysicalLines(source: string): number[] {
  return source
    .split('\n')
    .flatMap((line, i) => (!line.includes('mizan-allow-physical') && PHYSICAL.test(line) ? [i + 1] : []));
}

if (import.meta.main) {
  const violations: string[] = [];
  for await (const file of new Glob('registry/**/*.{ts,tsx,css}').scan('.')) {
    const path = file.replaceAll('\\', '/');
    for (const line of findPhysicalLines(await Bun.file(file).text())) violations.push(`${path}:${line}`);
  }
  if (violations.length) {
    console.error(`Physical direction classes found (use logical ones, or add mizan-allow-physical):\n${violations.join('\n')}`);
    process.exit(1);
  }
  console.log('No physical direction classes in registry/.');
}
