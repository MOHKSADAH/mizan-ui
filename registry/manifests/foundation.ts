import type { ManifestItem } from '../manifest';

export const foundationItems: ManifestItem[] = [
  {
    name: 'block-types',
    type: 'registry:lib',
    title: 'Block types',
    description: 'Shared types for blocks: Action, Media, Money, Vat, Plural and BlockBase.',
    files: ['registry/lib/block-types.ts'],
  },
  {
    name: 'container',
    type: 'registry:ui',
    category: 'layout',
    description: 'Centered page container with four max widths and responsive inline padding.',
    files: ['registry/ui/container.tsx'],
  },
];
