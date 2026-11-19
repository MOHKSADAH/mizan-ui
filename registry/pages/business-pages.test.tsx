import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import SaasPage01, { demo as saas } from './saas-page/saas-page-01';

const ids = (html: string, list: string[]) => {
  for (const id of list) expect(html).toContain(`id="${id}"`);
};

test('saas-page-01 composes its sections and links the navbar to their ids', () => {
  const html = renderToString(<SaasPage01 {...saas.en} />);
  expect(html).toContain('<main id="main-content"');
  ids(html, ['how', 'features', 'pricing', 'faq', 'news', 'start']);
  for (const text of [
    'One platform, from your first product to thousands of orders',
    'Premium Yemeni coffee 250 g',
    'Three steps to your first order',
    'Abdullah Al-Harbi',
    'Three plans that grow with you',
    'Questions merchants ask before they start',
    'E-invoicing: phase two',
    'Try Basta on your store this week',
    'Commercial registration',
  ]) {
    expect(html).toContain(text);
  }
});

test('saas-page-01 renders Arabic page copy', () => {
  const html = renderToString(<SaasPage01 {...saas.ar} />);
  for (const text of [
    'منصة واحدة، من أول منتج إلى آلاف الطلبات',
    'ثلاث خطوات إلى أول طلب',
    'ثلاث باقات، وتنمو معك',
    'ما الجديد في بسطة',
    'جرّب بسطة على متجرك هذا الأسبوع',
  ]) {
    expect(html).toContain(text);
  }
});

