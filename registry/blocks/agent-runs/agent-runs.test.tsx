import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentRuns01, { demo } from './agent-runs-01';

test('agent-runs-01 shows the filters with counts and every run with its elapsed time', () => {
  const html = renderToString(<AgentRuns01 {...demo.en} />);
  expect(html).toContain('All');
  expect(html).toContain('Mine');
  expect(html).toContain('Needs you');
  expect(html.match(/>Open</g)).toHaveLength(5);
  expect(html).toContain('4 m 12 s');
  expect(html).toContain('1 h 5 m');
});

test('agent-runs-01 marks the open run and disables its button', () => {
  const html = renderToString(<AgentRuns01 {...demo.en} />);
  expect(html).toContain('aria-current="true"');
  expect(html).toContain('Open now');
});

test('agent-runs-01 renders Arabic', () => {
  const html = renderToString(<AgentRuns01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('التشغيلات الحالية');
  expect(html).toContain('تحتاج إليك');
  expect(html).toContain('4 د 12 ث');
});
