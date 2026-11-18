import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { ComparisonSlider, comparisonSliderLabelsAr } from './comparison-slider';

const before = { src: 'https://example.com/before.jpg', alt: 'Room before', caption: 'Before' };
const after = { src: 'https://example.com/after.jpg', alt: 'Room after', caption: 'After' };

test('renders a slider role with value text in en', () => {
  const html = renderToString(<ComparisonSlider before={before} after={after} defaultValue={30} />);
  expect(html).toContain('role="slider"');
  expect(html).toContain('aria-valuenow="30"');
  expect(html).toContain('aria-valuetext="30% before image"');
  expect(html).toContain('alt="Room before"');
});

test('renders in ar with Arabic digits and anchors on the inline start', () => {
  const html = renderToString(
    <ComparisonSlider lang="ar" digits="arab" before={before} after={after} labels={comparisonSliderLabelsAr} />,
  );
  expect(html).toContain('٥٠% من صورة قبل');
  expect(html).toContain('inset-inline-start:50%');
});

test('a controlled value wins over defaultValue and is clamped', () => {
  expect(renderToString(<ComparisonSlider before={before} after={after} value={70} defaultValue={20} />)).toContain('aria-valuenow="70"');
  expect(renderToString(<ComparisonSlider before={before} after={after} value={140} />)).toContain('aria-valuenow="100"');
});
