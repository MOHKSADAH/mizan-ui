import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Timeline, TimelineItem, timelineLabelsAr } from './timeline';

const date = new Date(Date.UTC(2026, 10, 17, 12));

test('renders an ordered list with status text, token dots and a machine-readable date in en', () => {
  const html = renderToString(
    <Timeline>
      <TimelineItem status="success" date={date} title="Order placed">
        Payment received
      </TimelineItem>
      <TimelineItem status="warning" title="Delayed" />
    </Timeline>,
  );
  expect(html).toContain('<ol');
  expect(html.match(/<li/g)).toHaveLength(2);
  expect(html).toContain('Completed');
  expect(html).toContain('Needs attention');
  expect(html).toContain('bg-success');
  expect(html).toContain('bg-warning');
  expect(html).toContain('<time dateTime="2026-11-17T12:00:00.000Z"');
  expect(html).toContain('Nov 17, 2026');
});

test('renders in ar, horizontal, with Arabic digits and labels', () => {
  const html = renderToString(
    <Timeline orientation="horizontal" lang="ar" digits="arab" labels={timelineLabelsAr}>
      <TimelineItem status="info" date={date} title="تم الشحن" />
    </Timeline>,
  );
  expect(html).toContain('data-orientation="horizontal"');
  expect(html).toContain('قيد التنفيذ');
  expect(html).toMatch(/[٠-٩]/);
});
