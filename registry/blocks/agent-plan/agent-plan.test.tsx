import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentPlan01, { demo, labelsAr } from './agent-plan-01';

test('agent-plan-01 shows the sources, the steps with a value each, the estimate and a Stop button', () => {
  const html = renderToString(<AgentPlan01 {...demo.en} />);
  expect(html).toContain('ZATCA Fatoora');
  expect(html).toContain('<ol');
  expect(html).toContain('Create the e-invoices');
  expect(html).toContain('18 / 38');
  expect(html).toContain('2 of 5 steps');
  expect(html).toContain('10 min');
  expect(html).toContain('30 credits');
  expect(html).toContain('Stop');
});

test('agent-plan-01 renders Arabic with an rtl root and Arabic plurals', () => {
  const html = renderToString(<AgentPlan01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('إصدار فواتير أكتوبر لمورّد الرياض');
  expect(html).toContain('2 من 5 خطوات');
  expect(html).toContain('إيقاف');
  expect(labelsAr.credits(2)).toBe('رصيدان');
  expect(labelsAr.minutes(10)).toBe('10 دقائق');
});
