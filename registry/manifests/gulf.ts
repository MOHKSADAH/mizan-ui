import type { Category, ManifestItem } from '../manifest';

const lib = (name: string, file: string, description: string): ManifestItem => ({
  name,
  type: 'registry:lib',
  files: [`registry/lib/gulf/${file}.ts`],
  description,
});

const ui = (name: string, category: Category, description: string): ManifestItem => ({
  name,
  type: 'registry:ui',
  category,
  files: [`registry/ui/${name}.tsx`],
  description,
});

export const gulfItems: ManifestItem[] = [
  lib('gulf-validators', 'validators', 'Format checks for Saudi national ID, VAT number, IBAN, mobile number and CR number.'),
  lib('arabic-normalize', 'arabic-normalize', 'Arabic text normalization and accent-insensitive matching for search.'),
  lib('zatca-qr', 'zatca-qr', 'ZATCA Phase 1 invoice QR payload (TLV, base64) encoder and decoder.'),
  lib('saudi-regions', 'saudi-regions', 'Saudi administrative regions with main cities, in Arabic and English.'),
  lib('hijri', 'hijri', 'Umm al-Qura Hijri date formatting and parts through Intl.'),
  ui('saudi-id-input', 'forms', 'A 10-digit national ID or Iqama field with Arabic-Indic digit input and a Luhn format check on blur.'),
  ui('phone-input', 'forms', 'A country combobox (GCC first, default +966) and a national number field with as-you-type formatting and E.164 output.'),
  ui('iban-input', 'forms', 'A Saudi IBAN field shown in groups of 4, always LTR, with a mod-97 format check and a copy button.'),
  ui('vat-input', 'forms', 'A Saudi VAT number field shown in groups of 4, always LTR, with a format check and a copy button.'),
  ui('region-city-select', 'forms', 'Two linked comboboxes for Saudi region and city, in Arabic or English, with Arabic-aware search.'),
  ui('saudi-address-form', 'forms', 'A composed Saudi address form: region and city, district, street, building, postal and additional numbers, and the national short address.'),
  ui('hijri-calendar', 'forms', 'A Hijri (Umm al-Qura) and Gregorian month grid with a calendar toggle, APG keyboard support and optional Fri and Sat weekend styling.'),
  ui('hijri-date-picker', 'forms', 'A date picker that shows the Hijri and Gregorian dates together in its trigger.'),
  ui('date-range-picker', 'forms', 'A range picker on the Calendar with presets, a nights count for bookings and an optional Hijri display.'),
  ui('slot-picker', 'forms', 'A day strip and morning, afternoon and evening time chips for bookings, with radiogroup semantics and Arabic AM and PM.'),
  ui('opening-hours', 'data-display', 'Weekly opening hours with an open-now status, split shifts, a Ramadan override and an editor.'),
];
