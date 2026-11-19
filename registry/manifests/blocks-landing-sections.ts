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
];
