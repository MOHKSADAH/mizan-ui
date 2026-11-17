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
  {
    name: 'hero-01',
    type: 'registry:block',
    family: 'hero',
    title: 'Hero 01',
    description: 'Centered text hero with eyebrow, heading, lead and primary, secondary or WhatsApp buttons.',
    files: ['registry/blocks/hero/hero-01.tsx'],
  },
  {
    name: 'hero-02',
    type: 'registry:block',
    family: 'hero',
    title: 'Hero 02',
    description: 'Split hero with text at the start and a fixed-ratio image or slot at the end.',
    files: ['registry/blocks/hero/hero-02.tsx'],
  },
];
