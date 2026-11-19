import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentSpend01, { demo } from './agent-spend-01';

test('agent-spend-01 shows the total, the budget and a legend split by agent', () => {
  const html = renderToString(<AgentSpend01 {...demo.en} />);
  expect(html).toContain('16.30');
  expect(html).toContain('25.00');
  expect(html).toContain('8.70');
  expect(html).toContain('Invoice agent');
  expect(html).toContain('6.60');
});

test('agent-spend-01 lists the steps largest first with a Step and Model toggle', () => {
  const html = renderToString(<AgentSpend01 {...demo.en} />);
  expect(html.indexOf('Match items to the catalog')).toBeLessThan(html.indexOf('Send the supplier statement'));
  expect(html).toContain('Step');
  expect(html).toContain('Model');
});

test('agent-spend-01 demo adds up: the steps stay inside the budget', () => {
  const total = demo.en.steps.reduce((sum, s) => sum + s.amount, 0);
  expect(total).toBeCloseTo(16.3, 10);
  expect(total).toBeLessThan(demo.en.budget);
});

test('agent-spend-01 renders Arabic', () => {
  const html = renderToString(<AgentSpend01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('الإنفاق اليوم');
  expect(html).toContain('وكيل الفواتير');
});
