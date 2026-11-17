import { Glob } from 'bun';

const B = String.raw`(?:^|[\s"'\x60:!{(,])-?`;
const PHYSICAL = new RegExp(
  B +
    String.raw`(?:(?:scroll-)?[mp][lr]-|left-|right-|text-(?:left|right)(?![\w-])|rounded-(?:tl|tr|bl|br|l|r)(?!\w)|border-[lr](?!\w)` +
    String.raw`|float-(?:left|right)|origin-(?:(?:top|bottom)-)?(?:left|right)|bg-(?:left|right)|object-(?:left|right)` +
    String.raw`|slide-(?:in-from|out-to)-(?:left|right))`,
);
// Inline style objects: marginLeft, paddingRight, left: 0 and the like.
const STYLE = /\b(?:margin|padding)(?:Left|Right)\s*:|[{,]\s*(?:left|right)\s*:/;
// These need an RTL counterpart on the same line.
const PAIRED: [RegExp, RegExp][] = [
  [new RegExp(B + String.raw`space-x-`), /rtl:space-x-reverse/],
  [new RegExp(B + String.raw`divide-x(?![\w-]*-reverse)`), /rtl:divide-x-reverse/],
  [/(?:^|[\s"'`{(,])-translate-x-/, /rtl:-?translate-x-/],
];

// Classes gated on a physical side variant (data-[side=left]:left-0) are physical on purpose.
const SIDE_GATED = /\S*\[side=(?:left|right)\]\S*/g;

function isPhysical(raw: string) {
  const line = raw.replace(SIDE_GATED, '');
  return PHYSICAL.test(line) || STYLE.test(line) || PAIRED.some(([rule, pair]) => rule.test(line) && !pair.test(line));
}

export function findPhysicalLines(source: string): number[] {
  return source
    .split('\n')
    .flatMap((line, i) => (!line.includes('mizan-allow-physical') && isPhysical(line) ? [i + 1] : []));
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
