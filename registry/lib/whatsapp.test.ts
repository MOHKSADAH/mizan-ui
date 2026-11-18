import { expect, test } from 'bun:test';
import { whatsappUrl } from '@/registry/lib/whatsapp';

test('keeps digits only', () => {
  expect(whatsappUrl('+966 50 123 4567')).toBe('https://wa.me/966501234567');
  expect(whatsappUrl('(966) 50-123-4567')).toBe('https://wa.me/966501234567');
});

test('drops the 00 international prefix', () => {
  expect(whatsappUrl('00966501234567')).toBe('https://wa.me/966501234567');
});

test('encodes the message', () => {
  expect(whatsappUrl('966501234567', 'Hi & bye? 100%')).toBe('https://wa.me/966501234567?text=Hi%20%26%20bye%3F%20100%25');
  expect(whatsappUrl('966501234567', 'مرحبا')).toBe(`https://wa.me/966501234567?text=${encodeURIComponent('مرحبا')}`);
});

test('omits text for an empty message', () => {
  expect(whatsappUrl('966501234567', '')).toBe('https://wa.me/966501234567');
});
