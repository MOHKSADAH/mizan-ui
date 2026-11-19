import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentTools01, { demo, labelsAr } from './agent-tools-01';

test('agent-tools-01 lists servers with tool counts, a switch each and an expanded first server', () => {
  const html = renderToString(<AgentTools01 {...demo.en} />);
  expect(html.match(/role="switch"/g)).toHaveLength(5);
  expect(html).toContain('5 tools');
  expect(html).toContain('2 of 5 on');
  expect(html).toContain('list_orders');
  expect(html).toContain('Read-only');
  expect(html).toContain('Writes');
});

test('agent-tools-01 shows sign-in and retry for servers that are not connected and turns their switch off', () => {
  const html = renderToString(<AgentTools01 {...demo.en} />);
  expect(html).toContain('Needs sign-in');
  expect(html).toContain('Sign in');
  expect(html).toContain('Timed out');
  expect(html).toContain('Retry');
  expect(html.match(/data-disabled/g)?.length).toBeGreaterThanOrEqual(2);
});

test('agent-tools-01 renders Arabic with Arabic plurals', () => {
  const html = renderToString(<AgentTools01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('خوادم MCP');
  expect(html).toContain('5 أدوات');
  expect(labelsAr.tools(2)).toBe('أداتان');
});
