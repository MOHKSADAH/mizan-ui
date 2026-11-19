import { expect, test } from 'bun:test';
import { directionFonts, directions } from './directions';
import tokens from './themes/tokens.json';

const loaded = await Bun.file('lib/fonts.ts').text();
const css = await Bun.file('app/directions.css').text();

test('every direction uses an existing theme', () => {
  expect(directions.filter((d) => !(d.theme in tokens))).toEqual([]);
});

test('every direction font is loaded by lib/fonts.ts', () => {
  const used = new Set(directions.flatMap((d) => [d.display.latin, d.display.arabic, d.body.latin, d.body.arabic, d.code]));
  for (const id of used) {
    expect(directionFonts[id]).toBeDefined();
    expect(loaded).toContain(`variable: '${directionFonts[id].variable}'`);
  }
});

test('app/directions.css has a rule for every direction', () => {
  for (const d of directions) expect(css).toContain(`[data-font='${d.id}']`);
});
