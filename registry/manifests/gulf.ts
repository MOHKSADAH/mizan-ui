import type { ManifestItem } from '../manifest';

const lib = (name: string, file: string, description: string): ManifestItem => ({
  name,
  type: 'registry:lib',
  files: [`registry/lib/gulf/${file}.ts`],
  description,
});

export const gulfItems: ManifestItem[] = [
  lib('gulf-validators', 'validators', 'Format checks for Saudi national ID, VAT number, IBAN, mobile number and CR number.'),
  lib('arabic-normalize', 'arabic-normalize', 'Arabic text normalization and accent-insensitive matching for search.'),
  lib('zatca-qr', 'zatca-qr', 'ZATCA Phase 1 invoice QR payload (TLV, base64) encoder and decoder.'),
  lib('saudi-regions', 'saudi-regions', 'Saudi administrative regions with main cities, in Arabic and English.'),
  lib('hijri', 'hijri', 'Umm al-Qura Hijri date formatting and parts through Intl.'),
];
