import type { ManifestItem } from '../manifest';

export const sectionsIndustryBlocks: ManifestItem[] = [
  {
    name: 'project-grid-01',
    type: 'registry:block',
    family: 'project-grid',
    title: 'Project grid 01',
    description: 'Real-estate or portfolio project cards with an image slot, status badge, project name, type, city and unit count.',
    badge: 'new',
    files: ['registry/blocks/project-grid/project-grid-01.tsx'],
  },
  {
    name: 'project-grid-02',
    type: 'registry:block',
    family: 'project-grid',
    title: 'Project grid 02',
    description: 'Project cards with a city filter and a type filter, a live result count and an empty state.',
    badge: 'new',
    files: ['registry/blocks/project-grid/project-grid-02.tsx'],
  },
];
