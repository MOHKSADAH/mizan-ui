import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentRoster01, { demo, labelsAr } from './agent-roster-01';

test('agent-roster-01 shows each agent with role, model, task, status and cost, and the total', () => {
  const html = renderToString(<AgentRoster01 {...demo.en} />);
  expect(html).toContain('Invoice agent');
  expect(html).toContain('Claude Sonnet');
  expect(html).toContain('Create 38 invoices for the Riyadh supplier');
  expect(html).toContain('Needs you');
  expect(html).toContain('Idle');
  expect(html).toContain('No task right now');
  expect(html).toContain('16.30');
  expect(html).toContain('5 agents');
});

test('agent-roster-01 renders Arabic', () => {
  const html = renderToString(<AgentRoster01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('فريق الوكلاء');
  expect(html).toContain('يحتاج إليك');
  expect(html).toContain('5 وكلاء');
  expect(labelsAr.agents(2)).toBe('وكيلان');
});
