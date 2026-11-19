import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { CornerVideo, cornerVideoLabelsAr } from './corner-video';

test('without a src it shows the placeholder, with close and expand only', () => {
  const html = renderToString(<CornerVideo title="Store tour" />);
  expect(html).not.toContain('<video');
  expect(html).toContain('aria-label="Store tour"');
  expect(html).toContain('aria-label="Expand video"');
  expect(html).toContain('aria-label="Close video"');
  expect(html).not.toContain('Play video');
  expect(html).toContain('bg-muted');
  expect(html).toContain('end-[max(1rem');
});

test('with a src it renders a muted looping video with play and mute buttons', () => {
  const html = renderToString(<CornerVideo title="Store tour" src="https://example.com/tour.mp4" poster="https://example.com/tour.jpg" />);
  expect(html).toContain('<video');
  expect(html).toMatch(/<video[^>]*muted/);
  expect(html).toContain('loop');
  expect(html).toContain('poster="https://example.com/tour.jpg"');
  expect(html).toContain('aria-label="Pause video"');
  expect(html).toContain('aria-label="Unmute"');
});

test('without a src a poster image replaces the placeholder', () => {
  const html = renderToString(<CornerVideo title="Store tour" poster="https://example.com/tour.jpg" />);
  expect(html).toContain('<img src="https://example.com/tour.jpg"');
});

test('renders in ar and renders nothing when closed', () => {
  const html = renderToString(<CornerVideo title="جولة في المتجر" src="https://example.com/t.mp4" labels={cornerVideoLabelsAr} />);
  expect(html).toContain('aria-label="تكبير الفيديو"');
  expect(html).toContain('aria-label="تشغيل الصوت"');
  expect(renderToString(<CornerVideo title="x" open={false} />)).toBe('');
});
