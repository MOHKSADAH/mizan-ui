import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ColorPicker, colorPickerLabelsAr } from './color-picker';

describe('color-picker', () => {
  test('renders area, hue, field and swatches in en and ar', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(<ColorPicker labels={lang === 'ar' ? colorPickerLabelsAr : undefined} defaultValue="#ff0000" swatches={['#ff0000', '#00ff00']} />);
      expect(html.match(/role="slider"/g)).toHaveLength(2);
      expect(html).toContain('value="#ff0000"');
      expect(html).toContain(lang === 'ar' ? 'التشبع 100%، السطوع 100%' : 'Saturation 100%, brightness 100%');
      expect(html).toContain('aria-pressed="true"');
      expect(html).toContain('aria-pressed="false"');
    }
  });

  test('oklch format shows an oklch string and a controlled value wins', () => {
    const html = renderToString(<ColorPicker format="oklch" value="#ffffff" />);
    expect(html).toContain('value="oklch(1 0 0)"');
  });
});
