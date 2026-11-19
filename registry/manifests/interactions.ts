import type { ManifestItem } from '../manifest';

export const interactionItems: ManifestItem[] = [
  {
    name: 'slide-to-confirm',
    type: 'registry:ui',
    category: 'forms',
    badge: 'new',
    description: 'A handle you drag toward the inline end to confirm a payment or an order, with keyboard steps and an optional plain button.',
    files: ['registry/ui/slide-to-confirm.tsx'],
  },
];
