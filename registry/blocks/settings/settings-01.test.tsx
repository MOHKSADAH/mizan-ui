import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { Settings01, demo } from '@/registry/blocks/settings/settings-01';

test('renders English with the profile form', () => {
  const html = renderToString(<Settings01 {...demo.en} />);
  expect(html).toContain('Settings');
  expect(html).toContain('Full name');
  expect(html).toContain('Sara Al-Otaibi');
  expect(html).toContain('data-orientation="vertical"');
  expect(html).toContain('Save changes');
  expect(html).toContain('dir="ltr"');
});

test('renders Arabic', () => {
  const html = renderToString(<Settings01 {...demo.ar} />);
  expect(html).toContain('الإعدادات');
  expect(html).toContain('الاسم الكامل');
  expect(html).toContain('سارة العتيبي');
  expect(html).toContain('dir="rtl"');
});

test('keeps every tab form mounted so edits survive a tab switch', () => {
  const html = renderToString(<Settings01 {...demo.en} />);
  expect(html.match(/<form/g)).toHaveLength(4);
});

test('off switches submit "off" so a save can turn them off', () => {
  const html = renderToString(<Settings01 {...demo.en} />);
  expect(html).toContain('<input type="hidden" name="notifyMarketing" value="off"/>');
  expect(html).toContain('<input type="hidden" name="twoFactor" value="off"/>');
});
