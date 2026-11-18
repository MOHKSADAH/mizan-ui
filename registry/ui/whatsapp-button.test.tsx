import { expect, test } from 'bun:test';
import { renderToString } from 'react-dom/server';
import { WhatsAppButton, whatsappButtonLabelsAr } from '@/registry/ui/whatsapp-button';

test('renders the link in English', () => {
  const html = renderToString(<WhatsAppButton phone="+966 50 123 4567" message="Hi there" />);
  expect(html).toContain('href="https://wa.me/966501234567?text=Hi%20there"');
  expect(html).toContain('target="_blank"');
  expect(html).toContain('rel="noopener"');
  expect(html).toContain('aria-label="Chat on WhatsApp (opens WhatsApp)"');
  expect(html).toContain('>Chat on WhatsApp<');
});

test('renders Arabic labels', () => {
  const html = renderToString(<WhatsAppButton phone="966501234567" labels={whatsappButtonLabelsAr} />);
  expect(html).toContain('تواصل عبر واتساب (يفتح واتساب)');
});

test('icon and floating variants show no text and floating uses the offset variable', () => {
  const icon = renderToString(<WhatsAppButton phone="966501234567" variant="icon" />);
  expect(icon).not.toContain('>Chat on WhatsApp<');
  const floating = renderToString(<WhatsAppButton phone="966501234567" floating />);
  expect(floating).toContain('fixed end-4');
  expect(floating).toContain('var(--mizan-float-offset,0px)');
  expect(floating).not.toContain('>Chat on WhatsApp<');
});
