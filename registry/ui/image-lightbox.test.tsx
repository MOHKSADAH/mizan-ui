import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ImageLightbox, imageLightboxLabelsAr } from './image-lightbox';

const images = [
  { src: 'https://example.com/a.jpg', alt: 'Front view' },
  { src: 'https://example.com/b.jpg', alt: 'Side view', thumb: 'https://example.com/b-small.jpg' },
];

test('renders thumbnail buttons with alt text, closed, in en and ar', () => {
  const en = renderToString(<ImageLightbox images={images} zoom />);
  expect(en.match(/aria-haspopup="dialog"/g)).toHaveLength(2);
  expect(en).toContain('alt="Front view"');
  expect(en).toContain('b-small.jpg');
  expect(en).not.toContain('role="dialog"');
  const ar = renderToString(
    <ImageLightbox lang="ar" images={[{ src: 'https://example.com/a.jpg', alt: 'منظر أمامي' }]} labels={imageLightboxLabelsAr} />,
  );
  expect(ar).toContain('alt="منظر أمامي"');
});
