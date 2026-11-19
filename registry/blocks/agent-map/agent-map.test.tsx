import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import AgentMap01, { demo } from './agent-map-01';

test('agent-map-01 draws one line per link and mirrors them in rtl', () => {
  const html = renderToString(<AgentMap01 {...demo.en} />);
  // 4 lines from the orchestrator, then one per agent tool: 2 + 2 + 2 + 1.
  expect(html.match(/<path d="M0 /g)).toHaveLength(4 + 7);
  expect(html).toContain('rtl:-scale-x-100');
  expect(html).toContain('Back-office lead');
});

test('agent-map-01 shows a review action only on the agent that needs you', () => {
  const html = renderToString(<AgentMap01 {...demo.en} />);
  expect(html.match(/href="#review-stock"/g)).toHaveLength(1);
  expect(html).toContain('Waiting for your review');
});

test('agent-map-01 renders Arabic', () => {
  const html = renderToString(<AgentMap01 {...demo.ar} />);
  expect(html).toContain('dir="rtl"');
  expect(html).toContain('خريطة الوكلاء');
  expect(html).toContain('بانتظار مراجعتك');
  expect(html).toContain('Claude Sonnet');
});
