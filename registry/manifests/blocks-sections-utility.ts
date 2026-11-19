import type { ManifestItem } from '../manifest';

export const sectionsUtilityBlocks: ManifestItem[] = [
  {
    name: 'calculator-01',
    type: 'registry:block',
    family: 'calculator',
    title: 'Calculator 01',
    description: 'Estimator with a slider, a number field and term buttons, beside a live result card with the monthly installment.',
    badge: 'new',
    files: ['registry/blocks/calculator/calculator-01.tsx'],
  },
  {
    name: 'comparison-01',
    type: 'registry:block',
    family: 'comparison',
    title: 'Comparison 01',
    description: 'Comparison table for plans or us versus others, with check and dash cells read as text and a sticky first column on mobile.',
    badge: 'new',
    files: ['registry/blocks/comparison/comparison-01.tsx'],
  },
  {
    name: 'app-download-01',
    type: 'registry:block',
    family: 'app-download',
    title: 'App download 01',
    description: 'App download strip: headline, App Store and Google Play text buttons, a rating line and a QR code.',
    badge: 'new',
    files: ['registry/blocks/app-download/app-download-01.tsx'],
  },
  {
    name: 'booking-01',
    type: 'registry:block',
    family: 'booking',
    title: 'Booking 01',
    description: 'Appointment booking for a clinic: service select, day and time slots, and a confirm card with the Gregorian and Hijri date.',
    badge: 'new',
    files: ['registry/blocks/booking/booking-01.tsx'],
  },
];
