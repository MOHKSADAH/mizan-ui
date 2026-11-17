import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { MultiSelect, groupOptions, type MultiSelectOption } from './multi-select';

const options: MultiSelectOption[] = [
  { value: 'ruh', label: 'الرياض', group: 'Central' },
  { value: 'jed', label: 'Jeddah', group: 'Western' },
  { value: 'dmm', label: 'الدمام', group: 'Central' },
];

describe('multi-select', () => {
  test('groupOptions keeps first-seen group order and option order', () => {
    expect(groupOptions(options).map((g) => [g.value, g.items.map((o) => o.value)])).toEqual([
      ['Central', ['ruh', 'dmm']],
      ['Western', ['jed']],
    ]);
    expect(groupOptions([{ value: 'a', label: 'A' }])[0].value).toBe('');
  });

  test('renders selected chips in en and ar, grouped or flat', () => {
    for (const lang of ['en', 'ar'] as const) {
      for (const list of [options, options.map(({ group: _g, ...o }) => o)]) {
        const html = renderToString(<MultiSelect lang={lang} options={list} defaultValue={['ruh', 'jed']} aria-label="Cities" />);
        expect(html).toContain('data-slot="multi-select"');
        expect(html).toContain('الرياض');
        expect(html).toContain('Jeddah');
      }
    }
  });
});
