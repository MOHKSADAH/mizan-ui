import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { FileUpload, fileKey, fileUploadLabelsAr, matchesAccept, validateFiles } from './file-upload';

const file = (name: string, size = 10, type = '') => new File([new Uint8Array(size)], name, { type });

describe('file-upload', () => {
  test('matchesAccept handles extensions, wildcards and exact types', () => {
    expect(matchesAccept(file('a.PDF'), '.pdf')).toBe(true);
    expect(matchesAccept(file('a.png', 1, 'image/png'), 'image/*')).toBe(true);
    expect(matchesAccept(file('a.txt', 1, 'text/plain'), 'image/*,.pdf')).toBe(false);
    expect(matchesAccept(file('a.txt'), undefined)).toBe(true);
  });

  test('validateFiles rejects by type, size and count, and skips duplicates', () => {
    const a = file('a.png', 5, 'image/png');
    const big = file('big.png', 500, 'image/png');
    const doc = file('d.txt', 5, 'text/plain');
    const b = file('b.png', 6, 'image/png');
    const r = validateFiles([a, big, doc, b, a], [], { accept: 'image/*', maxSize: 100, maxFiles: 1 });
    expect(r.accepted).toEqual([a]);
    expect(r.rejected.map((x) => [x.file.name, x.reason])).toEqual([
      ['big.png', 'size'],
      ['d.txt', 'type'],
      ['b.png', 'count'],
    ]);
    expect(fileKey(a)).toContain('a.png:5');
  });

  test('single mode replaces the current file', () => {
    const a = file('a.png');
    const b = file('b.png');
    expect(validateFiles([b], [a], { multiple: false }).next).toEqual([b]);
    expect(validateFiles([b], [a], { multiple: true }).next).toEqual([a, b]);
  });

  test('renders in en and ar', () => {
    const f = file('تقرير.pdf', 2048);
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(
        <FileUpload labels={lang === 'ar' ? fileUploadLabelsAr : undefined} accept=".pdf" maxSize={1024 * 1024} maxFiles={2} defaultValue={[f]} progress={{ [fileKey(f)]: 40 }} />,
      );
      expect(html).toContain('data-slot="file-upload"');
      expect(html).toContain('تقرير.pdf');
      expect(html).toContain(lang === 'ar' ? 'حتى ملفين' : 'Up to 2 files');
    }
  });

  test('Arabic count labels use all plural forms', () => {
    expect([1, 2, 3, 11, 100].map(fileUploadLabelsAr.maxFiles)).toEqual(['حتى ملف واحد', 'حتى ملفين', 'حتى 3 ملفات', 'حتى 11 ملفًا', 'حتى 100 ملف']);
  });
});
