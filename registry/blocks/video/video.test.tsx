import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import Video01, { demo as demo01 } from './video-01';

test('video-01 renders a labelled play button, a poster placeholder and the captions note in English', () => {
  const html = renderToString(<Video01 {...demo01.en} id="vid" />);
  expect(html).toContain('aria-labelledby="vid-heading"');
  expect(html).toContain('aria-label="Play video: Rafid product tour"');
  expect(html).toContain('aspect-video');
  expect(html).toContain('Arabic and English captions');
  // The player mounts only after the dialog opens.
  expect(html).not.toContain('<video');
});

test('video-01 renders in Arabic and uses a poster photo when given', () => {
  const poster = { src: '/poster.jpg', alt: 'لقطة من الفيديو', width: 1280, height: 720 };
  const html = renderToString(<Video01 {...demo01.ar} poster={poster} />);
  expect(html).toContain('aria-label="تشغيل الفيديو: جولة في منتج رافد"');
  expect(html).toContain('src="/poster.jpg"');
  expect(html).toContain('الترجمة العربية والإنجليزية');
  expect(renderToString(<Video01 {...demo01.ar} captionsNote={undefined} />)).not.toContain('الترجمة');
});
