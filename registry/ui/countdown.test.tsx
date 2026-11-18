import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Countdown, countdownLabelsAr } from './countdown';

const to = new Date(Date.UTC(2030, 0, 1, 12, 0));

test('server render is the static target date, not a time that depends on the clock', () => {
  const en = renderToString(<Countdown to={to} />);
  expect(en).toContain('<time dateTime="2030-01-01T12:00:00.000Z">');
  expect(en).toContain('Jan 1, 2030');
  expect(renderToString(<Countdown to={to} />)).toBe(en);
});

test('renders in ar with Arabic labels', () => {
  const ar = renderToString(<Countdown to={to} lang="ar" labels={countdownLabelsAr} />);
  expect(ar).toContain('<time');
  expect(ar).not.toContain('Jan');
});
