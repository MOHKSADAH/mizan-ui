import { describe, expect, test } from 'bun:test';
import aa from './themes/aa.json';
import tokens from './themes/tokens.json';
import { aaFailures, tokenReader } from './contrast';

const REQUIRED = [
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground', 'primary',
  'primary-foreground', 'secondary', 'secondary-foreground', 'muted', 'muted-foreground', 'accent',
  'accent-foreground', 'destructive', 'border', 'input', 'ring', 'chart-1', 'chart-2', 'chart-3', 'chart-4',
  'chart-5', 'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground', 'sidebar-accent',
  'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring',
];

const themes = Object.entries(tokens) as [string, { light: Record<string, string>; dark: Record<string, string> }][];
const allowlist = aa as Record<string, { light: string[]; dark: string[] }>;

test('there are 71 themes and each has an allowlist entry', () => {
  expect(themes).toHaveLength(71);
  expect(Object.keys(allowlist).sort()).toEqual(themes.map(([id]) => id).sort());
});

describe.each(themes)('%s', (id, theme) => {
  for (const mode of ['light', 'dark'] as const) {
    test(`${mode}: every required token exists`, () => {
      expect(REQUIRED.filter((k) => !theme[mode][k])).toEqual([]);
    });

    test(`${mode}: AA failures match ${id.startsWith('mizan-') ? 'none' : 'aa.json'}`, () => {
      const failures = aaFailures(tokenReader(theme[mode], mode));
      expect(failures).toEqual(id.startsWith('mizan-') ? [] : allowlist[id][mode]);
    });
  }
});
