import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { SlideToConfirm, slideProgress, slideToConfirmLabelsAr } from './slide-to-confirm';

test('renders a handle button named by the track text, with a hint and a live region', () => {
  const html = renderToString(<SlideToConfirm />);
  expect(html).toContain('aria-label="Slide to confirm"');
  expect(html).toContain('aria-describedby=');
  expect(html).toContain('press Enter or Space');
  expect(html).toContain('role="status"');
  expect(html).toContain('data-status="idle"');
  expect(html).not.toContain('Confirm</button>');
});

test('renders in ar with the handle anchored on the inline start and a mirrored icon', () => {
  const html = renderToString(<SlideToConfirm labels={slideToConfirmLabelsAr} />);
  expect(html).toContain('aria-label="اسحب للتأكيد"');
  expect(html).toContain('inset-inline-start:calc((100% - 2.5rem) * 0)');
  expect(html).toContain('rtl:rotate-180');
});

test('fallbackButton adds a plain button, disabled marks the control', () => {
  const html = renderToString(<SlideToConfirm fallbackButton disabled labels={{ button: 'Pay now' }} />);
  expect(html).toContain('Pay now</button>');
  expect(html).toContain('disabled=""');
  expect(html).toContain('aria-disabled="true"');
});

test('slideProgress clamps and flips the drag direction in RTL', () => {
  expect(slideProgress(50, 200, false)).toBe(0.25);
  expect(slideProgress(-50, 200, false)).toBe(0);
  expect(slideProgress(500, 200, false)).toBe(1);
  expect(slideProgress(-50, 200, true)).toBe(0.25);
  expect(slideProgress(50, 200, true)).toBe(0);
  expect(slideProgress(10, 0, false)).toBe(0);
});
