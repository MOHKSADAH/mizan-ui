import type { ManifestItem } from '../manifest';

const item = (name: string, description: string): ManifestItem => ({
  name,
  type: 'registry:ui',
  category: 'commerce',
  files: [`registry/ui/${name}.tsx`],
  description,
});

export const commerceItems: ManifestItem[] = [
  item('quantity-stepper', 'Minus, number and plus quantity control with min, max, remove at the minimum and live announcements.'),
];
