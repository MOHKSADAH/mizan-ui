import type { ManifestItem } from '../manifest';

export const storefrontProductItems: ManifestItem[] = [
  {
    name: 'rating-summary',
    type: 'registry:ui',
    category: 'commerce',
    badge: 'new',
    files: ['registry/ui/rating-summary.tsx'],
    description: 'Average score, review total and a five-to-one star distribution with bars that fill from the inline start.',
  },
];
