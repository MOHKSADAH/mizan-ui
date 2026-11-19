import type { ManifestItem } from '../manifest';

export const flowBlocks: ManifestItem[] = [
  {
    name: 'pricing-06',
    type: 'registry:block',
    family: 'pricing',
    badge: 'new',
    title: 'Pricing 06',
    description: 'A plan picker card: monthly and yearly toggle, plans as radio rows that expand their features, a seats stepper and a SAR total with VAT.',
    files: ['registry/blocks/pricing/pricing-06.tsx'],
  },
  {
    name: 'feature-carousel-01',
    type: 'registry:block',
    family: 'feature-carousel',
    badge: 'new',
    title: 'Feature carousel 01',
    description: 'Feature chips on the start side and one media slot on the end side that follows the selected chip. Autoplay pauses on hover, focus and reduced motion.',
    files: ['registry/blocks/feature-carousel/feature-carousel-01.tsx'],
  },
];
