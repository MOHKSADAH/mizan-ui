import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { AnnouncementBar, announcementBarLabelsAr } from './announcement-bar';

test('renders in en and ar with a labelled region and a dismiss button', () => {
  const en = renderToString(
    <AnnouncementBar action={<a href="https://example.com/sale">Shop now</a>} countdown={<span>2d</span>}>
      Free shipping this week
    </AnnouncementBar>,
  );
  expect(en).toContain('role="region"');
  expect(en).toContain('aria-label="Dismiss announcement"');
  expect(en).toContain('Shop now');
  const ar = renderToString(<AnnouncementBar labels={announcementBarLabelsAr}>شحن مجاني</AnnouncementBar>);
  expect(ar).toContain('aria-label="إغلاق الإعلان"');
});

test('a stored dismissal renders nothing and dismissible=false has no button', () => {
  expect(renderToString(<AnnouncementBar dismissed>Hi</AnnouncementBar>)).toBe('');
  expect(renderToString(<AnnouncementBar dismissible={false}>Hi</AnnouncementBar>)).not.toContain('<button');
});
