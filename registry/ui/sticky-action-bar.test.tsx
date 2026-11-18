import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { StickyActionBar, stickyActionBarLabelsAr } from './sticky-action-bar';

test('renders in en and ar as a labelled region with safe-area padding, mobile only', () => {
  const en = renderToString(<StickyActionBar price="SAR 489" action={<button>Add to cart</button>} />);
  expect(en).toContain('aria-label="Actions"');
  expect(en).toContain('env(safe-area-inset-bottom)');
  expect(en).toContain('md:hidden');
  expect(en).toContain('Add to cart');
  const ar = renderToString(<StickyActionBar labels={stickyActionBarLabelsAr} action={<button>أضف</button>} />);
  expect(ar).toContain('aria-label="الإجراءات"');
});
