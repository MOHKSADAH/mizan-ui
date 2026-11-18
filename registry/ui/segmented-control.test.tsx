import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { DirectionProvider } from '@/registry/ui/direction';
import { SegmentedControl } from './segmented-control';

const options = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

describe('segmented-control', () => {
  test('renders every option and presses the default value in en and ar', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(
        <DirectionProvider direction={lang === 'ar' ? 'rtl' : 'ltr'}>
          <SegmentedControl options={options} defaultValue="week" aria-label="Range" />
        </DirectionProvider>,
      );
      expect(html).toContain('data-slot="segmented-control"');
      for (const o of options) expect(html).toContain(o.label);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      expect(html).toContain('motion-reduce:aria-pressed:bg-background');
    }
  });

  test('first option is pressed when there is no value', () => {
    const html = renderToString(<SegmentedControl options={options} aria-label="Range" />);
    expect(html.indexOf('aria-pressed="true"')).toBeLessThan(html.indexOf('Week'));
  });
});
