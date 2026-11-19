import type { ManifestItem } from '../manifest';

export const interactionBlocks: ManifestItem[] = [
  {
    name: 'feature-accordion-01',
    type: 'registry:block',
    family: 'feature-accordion',
    title: 'Feature accordion 01',
    description: 'Numbered accordion of features beside one large media slot that follows the open item.',
    badge: 'new',
    files: ['registry/blocks/feature-accordion/feature-accordion-01.tsx'],
  },
  {
    name: 'case-stack-01',
    type: 'registry:block',
    family: 'case-stack',
    title: 'Case stack 01',
    description: 'Case studies as cards that stack with CSS position: sticky, each with a stat pair; a plain list on phones and with reduced motion.',
    badge: 'new',
    files: ['registry/blocks/case-stack/case-stack-01.tsx'],
  },
];
