import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { SignaturePad, signaturePadLabelsAr } from './signature-pad';

describe('signature-pad', () => {
  test('renders the canvas, mode toggle, undo and clear in en and ar', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(<SignaturePad labels={lang === 'ar' ? signaturePadLabelsAr : undefined} name="signature" />);
      expect(html).toContain('<canvas');
      expect(html).toContain('role="img"');
      expect(html).toContain('aria-pressed="true"');
      expect(html).toContain(lang === 'ar' ? 'تراجع' : 'Undo');
      expect(html).toContain(lang === 'ar' ? 'كتابة' : 'Type');
      expect(html).toContain('name="signature"');
    }
  });

  test('ink defaults to currentColor', () => {
    expect(renderToString(<SignaturePad />)).toContain('text-foreground');
  });
});
