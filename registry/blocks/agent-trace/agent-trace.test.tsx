import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentTrace01, { demo } from './agent-trace-01';

test('agent-trace-01 header is derived from the spans', () => {
  const html = renderToString(<AgentTrace01 {...demo.en} />);
  expect(html).toContain('1 m 12 s');
  expect(html).toContain('$0.42');
  expect(html).toContain('48.2K');
  expect(html).toContain('Tool calls');
});

test('agent-trace-01 bars start at the inline-start side and nest by depth', () => {
  const html = renderToString(<AgentTrace01 {...demo.en} />);
  expect(html).toContain('inset-inline-start:0%');
  expect(html).toContain('padding-inline-start:28px');
  expect(html).not.toContain('padding-left');
  expect(html).not.toContain('margin-left');
});

test('agent-trace-01 opens the selected step in the detail panel', () => {
  const html = renderToString(<AgentTrace01 {...demo.en} />);
  expect(html).toContain('aria-pressed="true"');
  expect(html).toContain('retry_after_s');
  expect(html).toContain('Failed');
});

test('agent-trace-01 renders Arabic', () => {
  const html = renderToString(<AgentTrace01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('تتبّع التشغيل');
  expect(html).toContain('1 د 12 ث');
});
