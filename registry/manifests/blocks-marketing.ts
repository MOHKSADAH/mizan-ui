import type { ManifestItem } from '../manifest';

export const marketingBlocks: ManifestItem[] = [
  {
    name: 'navbar-01',
    type: 'registry:block',
    family: 'navbar',
    title: 'Navbar 01',
    description: 'Single-bar navbar with centered links, language menu, call to action and a start-side mobile sheet.',
    files: ['registry/blocks/navbar/navbar-01.tsx'],
  },
  {
    name: 'navbar-04',
    type: 'registry:block',
    family: 'navbar',
    title: 'Navbar 04',
    description: 'Navbar with a contact utility bar (phone, WhatsApp, language) above a single main bar and mobile sheet.',
    files: ['registry/blocks/navbar/navbar-04.tsx'],
  },
];
