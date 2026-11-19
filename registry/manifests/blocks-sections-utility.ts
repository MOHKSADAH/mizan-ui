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
];
