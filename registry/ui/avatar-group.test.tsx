import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { AvatarStack, avatarStackLabelsAr } from './avatar-group';

const people = ['Sara Ali', 'Omar Khan', 'Lina Hassan', 'Yusuf Nasser', 'Huda Salem', 'Faisal Qahtani'].map((name) => ({ name }));

test('shows max avatars, a +N counter and a group label with the total in en', () => {
  const html = renderToString(<AvatarStack people={people} max={3} />);
  expect(html).toContain('aria-label="6 people"');
  expect(html).toContain('+3');
  expect(html).toContain('and 3 more');
  expect(html).toContain('>SA<');
  expect(html).not.toContain('Yusuf');
});

test('renders in ar with Arabic plural forms, digits and the logical overlap class', () => {
  const html = renderToString(
    <AvatarStack lang="ar" digits="arab" people={people} max={4} labels={avatarStackLabelsAr} />,
  );
  expect(html).toContain('aria-label="٦ أشخاص"');
  expect(html).toContain('وشخصان آخران');
  expect(html).toContain('-space-x-2');
  expect(html).not.toContain('rtl:space-x-reverse');
});

test('no counter when everyone fits', () => {
  expect(renderToString(<AvatarStack people={people.slice(0, 2)} />)).not.toContain('+');
});
