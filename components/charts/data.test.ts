import { expect, test } from 'bun:test';
import { metrics, payments, topProducts, CHANNELS, ORDERS, DAYS, WEEKS, type Range } from './data';

test('revenue reads up 5 to 15 percent in every range', () => {
  for (const r of [7, 30, 90] as Range[]) {
    const { cur, prev } = metrics(r);
    const d = cur.rev / prev.rev - 1;
    expect(d).toBeGreaterThanOrEqual(0.05);
    expect(d).toBeLessThanOrEqual(0.15);
  }
});

test('funnel, payments and channels match orders', () => {
  const { cur, steps } = metrics(30);
  expect(steps[4]).toBe(cur.orders);
  expect(payments(cur.orders).reduce((s, p) => s + p.count, 0)).toBe(cur.orders);
  expect(topProducts(cur.rev)[0].revenue).toBeGreaterThan(topProducts(cur.rev)[1].revenue);
  const last = CHANNELS[WEEKS - 1];
  const s = DAYS - 7;
  expect(last.web + last.app + last.social).toBe(ORDERS.slice(s, s + 7).reduce((a, b) => a + b, 0));
});
