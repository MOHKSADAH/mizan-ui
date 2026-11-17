import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { InlineEdit } from './inline-edit';

describe('inline-edit', () => {
  test('renders the value as a button with an edit hint in en and ar', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(<InlineEdit lang={lang} defaultValue="مطعم النخيل" aria-label="Name" />);
      expect(html).toContain('<button');
      expect(html).toContain('مطعم النخيل');
      expect(html).toContain(lang === 'ar' ? 'تعديل' : 'Edit');
      expect(html).toContain('role="status"');
    }
  });

  test('empty value shows the placeholder, then the empty label', () => {
    expect(renderToString(<InlineEdit placeholder="Add a title" />)).toContain('Add a title');
    expect(renderToString(<InlineEdit lang="ar" />)).toContain('غير محدد');
  });
});
