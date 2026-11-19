import type { ManifestItem } from '../manifest';

export const landingSectionBlocks: ManifestItem[] = [
  {
    name: 'editorial-01',
    type: 'registry:block',
    family: 'editorial',
    title: 'Editorial 01',
    description: 'One large lead story with image, title and a meta line (colored author, program, date), beside a list of smaller rows.',
    badge: 'new',
    files: ['registry/blocks/editorial/editorial-01.tsx'],
  },
  {
    name: 'editorial-02',
    type: 'registry:block',
    family: 'editorial',
    title: 'Editorial 02',
    description: 'Numbered editorial list with large numerals, a title and a one-line summary on each row.',
    badge: 'new',
    files: ['registry/blocks/editorial/editorial-02.tsx'],
  },
  {
    name: 'feature-switcher-01',
    type: 'registry:block',
    family: 'feature-switcher',
    title: 'Feature switcher 01',
    description: 'Numbered feature rows on one side; the selected row swaps one large media panel on the other side (tabs pattern).',
    badge: 'new',
    files: ['registry/blocks/feature-switcher/feature-switcher-01.tsx'],
  },
  {
    name: 'feature-switcher-02',
    type: 'registry:block',
    family: 'feature-switcher',
    title: 'Feature switcher 02',
    description: 'Horizontal tabs above a wide media panel with a caption, for product tours.',
    badge: 'new',
    files: ['registry/blocks/feature-switcher/feature-switcher-02.tsx'],
  },
];
