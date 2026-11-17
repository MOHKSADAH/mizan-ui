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
  item('rating', 'Read-only star rating with partial fills that mirror in RTL, a spoken value and a review count.'),
  item('swatch-select', 'Color, size and image swatches as a radio group with a selected name and out-of-stock state.'),
];
