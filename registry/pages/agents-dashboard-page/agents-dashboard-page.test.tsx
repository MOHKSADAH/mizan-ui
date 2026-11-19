import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentsDashboardPage01, { demo } from './agents-dashboard-page-01';

test('agents-dashboard-page-01 composes the app shell with all eight agent sections', () => {
  const html = renderToString(<AgentsDashboardPage01 {...demo.en} />);
  for (const text of [
    'Al-Nokhba Agents',
    'Live runs',
    'Agent map',
    'Agent roster',
    'Spend today',
    'Run trace',
    'MCP servers',
    'Estimate before you run',
    'Issue the October invoices for the Riyadh supplier',
  ]) {
    expect(html).toContain(text);
  }
  expect(html).toContain('<h1');
});

test('agents-dashboard-page-01 renders Arabic with an rtl shell and sections', () => {
  const html = renderToString(<AgentsDashboardPage01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('وكلاؤك اليوم');
  expect(html).toContain('خريطة الوكلاء');
  expect(html).toContain('التشغيلات الحالية');
});
