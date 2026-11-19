import type { ManifestItem } from '../manifest';

export const storefrontItems: ManifestItem[] = [
  {
    name: 'product-card',
    type: 'registry:ui',
    category: 'commerce',
    files: ['registry/ui/product-card.tsx'],
    description: 'Composable product card: media with badges and action slot, title link, vendor, price with compare-at, swatches, vertical or list.',
  },
];
