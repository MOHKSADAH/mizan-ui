import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentCost01, { demo, labelsAr } from './agent-cost-01';

test('agent-cost-01 shows the default model estimate and a credits bar without a warning', () => {
  const html = renderToString(<AgentCost01 {...demo.en} />);
  expect(html).toContain('96K');
  expect(html).toContain('1.70');
  expect(html).toContain('about 10 min');
  expect(html).toContain('30 of 40 credits');
  expect(html).not.toContain('Not enough credits');
  expect(html).not.toContain('disabled=""');
});

test('agent-cost-01 warns and disables Run when the estimate is over the credits', () => {
  const html = renderToString(<AgentCost01 {...demo.en} defaultModel="opus" />);
  expect(html).toContain('Not enough credits');
  expect(html).toContain('needs 12 more credits');
  expect(html).toContain('52 of 40 credits');
  expect(html).toContain('bg-warning');
  expect(html).toContain('disabled=""');
});

test('agent-cost-01 renders Arabic with Arabic plurals', () => {
  const html = renderToString(<AgentCost01 {...demo.ar} defaultModel="opus" />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('الرصيد لا يكفي');
  expect(labelsAr.over(2)).toContain('رصيدين');
  expect(labelsAr.minutes(2)).toBe('نحو دقيقتين');
});
