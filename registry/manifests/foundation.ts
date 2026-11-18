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
  {
    name: 'section',
    type: 'registry:ui',
    category: 'layout',
    description: 'Page section with vertical rhythm, and SectionHeader with eyebrow, heading, description and actions.',
    files: ['registry/ui/section.tsx'],
  },
  {
    name: 'whatsapp',
    type: 'registry:lib',
    title: 'WhatsApp URL',
    description: 'whatsappUrl(): builds a wa.me link from a phone number and a prefilled message.',
    files: ['registry/lib/whatsapp.ts'],
  },
  {
    name: 'whatsapp-button',
    type: 'registry:ui',
    category: 'commerce',
    title: 'WhatsApp Button',
    description: 'Link button that opens WhatsApp with a prefilled message, with a floating variant.',
    files: ['registry/ui/whatsapp-button.tsx'],
  },
];
