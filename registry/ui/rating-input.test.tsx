import { describe, expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { RatingInput, ratingInputLabelsAr } from './rating-input';

describe('rating-input', () => {
  test('renders a radiogroup with one radio per star plus a none radio', () => {
    for (const lang of ['en', 'ar'] as const) {
      const html = renderToString(<RatingInput lang={lang} labels={lang === 'ar' ? ratingInputLabelsAr : undefined} defaultValue={3} aria-label="Rating" />);
      expect(html).toContain('role="radiogroup"');
      expect(html.match(/type="radio"/g)).toHaveLength(6);
      expect(html).toContain(lang === 'ar' ? 'aria-label="3 من 5"' : 'aria-label="3 out of 5"');
      expect(html.match(/checked/g)).toHaveLength(1);
    }
  });

  test('half stars add a radio per half and format 4.5 with the labels', () => {
    const html = renderToString(<RatingInput lang="ar" labels={ratingInputLabelsAr} half defaultValue={4.5} showValue aria-label="التقييم" />);
    expect(html.match(/type="radio"/g)).toHaveLength(11);
    expect(html).toContain('aria-label="4.5 من 5"');
    expect(html).toContain('width:50%');
  });

  test('labels prop overrides the text and max is respected', () => {
    const html = renderToString(<RatingInput max={3} labels={{ value: '{value}/{max} stars' }} aria-label="r" />);
    expect(html).toContain('aria-label="2/3 stars"');
    expect(html.match(/type="radio"/g)).toHaveLength(4);
  });
});
