import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ContextMeter, contextMeterLabelsAr } from './context-meter';

test('the trigger shows the percent used and is named with it', () => {
  const html = renderToString(<ContextMeter used={133900} max={200000} />);
  expect(html).toContain('aria-label="Context window, ');
  expect(html).toContain('67%');
  expect(html).toContain('stroke-primary');
});

test('a nearly full window turns the ring to the destructive color', () => {
  expect(renderToString(<ContextMeter used={190000} max={200000} />)).toContain('stroke-destructive');
});

test('a zero max never divides by zero', () => {
  const html = renderToString(<ContextMeter used={0} max={0} />);
  expect(html).toContain('0%');
});

test('Arabic labels', () => {
  const html = renderToString(<ContextMeter used={50000} max={200000} lang="ar" labels={contextMeterLabelsAr} />);
  expect(html).toContain('نافذة السياق');
  expect(contextMeterLabelsAr.description('50,000', '200,000')).toBe('50,000 من 200,000 رمز مستخدم');
});
