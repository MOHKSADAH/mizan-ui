import { aaFailures, tokenReader } from '../lib/contrast';

type Tokens = Record<string, string>;

// Writes the AA failures of every theme and mode: the allowlist that lib/themes.test.ts compares against.
const themes = (await Bun.file('lib/themes/tokens.json').json()) as Record<string, { light: Tokens; dark: Tokens }>;
const out = Object.fromEntries(
  Object.entries(themes).map(([id, t]) => [
    id,
    { light: aaFailures(tokenReader(t.light, 'light')), dark: aaFailures(tokenReader(t.dark, 'dark')) },
  ]),
);
await Bun.write('lib/themes/aa.json', JSON.stringify(out, null, 1) + '\n');
const failing = Object.values(out).filter((t) => t.light.length || t.dark.length).length;
console.log(`aa: ${failing} of ${Object.keys(out).length} themes have failures`);
