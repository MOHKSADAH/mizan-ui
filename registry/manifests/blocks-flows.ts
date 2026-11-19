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
];
