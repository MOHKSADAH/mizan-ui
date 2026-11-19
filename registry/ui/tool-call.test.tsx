import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ToolCall, toolCallLabelsAr } from './tool-call';

test('a done tool call shows its name, state and a collapsed body', () => {
  const html = renderToString(<ToolCall name="get_sales_report" input={{ period: 'last_7_days' }} output={{ total: 48320 }} />);
  expect(html).toContain('get_sales_report');
  expect(html).toContain('Done');
  expect(html).toContain('dir="ltr"');
  expect(html).toContain('aria-expanded="false"');
});

test('input and output print as indented JSON in left to right code blocks', () => {
  const html = renderToString(<ToolCall name="x" defaultOpen input={{ period: 'last_7_days' }} output={{ total: 48320 }} />);
  expect(html).toContain('&quot;period&quot;: &quot;last_7_days&quot;');
  expect(html).toContain('&quot;total&quot;: 48320');
  expect(html).toContain('Input');
  expect(html).toContain('Output');
});

test('running and input-streaming states shimmer, error shows the message instead of the output', () => {
  expect(renderToString(<ToolCall name="x" state="running" />)).toContain('data-status="running"');
  expect(renderToString(<ToolCall name="x" state="input-streaming" labels={toolCallLabelsAr} />)).toContain('يجهّز المدخلات');
  const error = renderToString(<ToolCall name="x" state="error" defaultOpen errorText="403" output={{ a: 1 }} />);
  expect(error).toContain('Failed');
  expect(error).toContain('403');
  expect(error).not.toContain('Output');
});

test('Arabic labels', () => {
  const html = renderToString(<ToolCall name="x" defaultOpen input="{}" output="ok" labels={toolCallLabelsAr} />);
  expect(html).toContain('اكتمل');
  expect(html).toContain('المدخلات');
  expect(html).toContain('المخرجات');
});
