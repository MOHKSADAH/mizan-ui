import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { TagsInput, addTags, splitTags, tagsInputLabelsAr } from './tags-input';

describe('tags-input', () => {
  test('splitTags splits on commas, Arabic punctuation and newlines', () => {
    expect(splitTags('a, b،c;d؛e\nf\r\n,, ')).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  test('addTags dedupes with case and Arabic spelling folding', () => {
    expect(addTags(['Riyadh'], ['riyadh', 'Jeddah']).next).toEqual(['Riyadh', 'Jeddah']);
    expect(addTags(['مدرسة'], ['مدرسه', 'أحمد', 'احمد']).next).toEqual(['مدرسة', 'أحمد']);
    expect(addTags([], ['a', 'a']).rejected).toEqual([{ tag: 'a', reason: 'duplicate' }]);
  });

  test('addTags stops at max', () => {
    const r = addTags(['a'], ['b', 'c'], 2);
    expect(r.next).toEqual(['a', 'b']);
    expect(r.rejected).toEqual([{ tag: 'c', reason: 'max' }]);
  });

  test('Arabic max label uses the plural forms', () => {
    expect([1, 2, 3, 11].map(tagsInputLabelsAr.max)).toEqual([
      'يمكنك إضافة وسم واحد كحد أقصى',
      'يمكنك إضافة وسمين كحد أقصى',
      'يمكنك إضافة 3 وسوم كحد أقصى',
      'يمكنك إضافة 11 وسمًا كحد أقصى',
    ]);
  });

  test('renders in en and ar', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(<TagsInput labels={lang === 'ar' ? tagsInputLabelsAr : undefined} defaultValue={['الرياض', 'Jeddah']} placeholder="…" aria-label="Tags" />);
      expect(html).toContain('data-slot="tags-input"');
      expect(html).toContain('الرياض');
    }
  });
});
