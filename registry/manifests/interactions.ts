import type { ManifestItem } from '../manifest';

export const interactionItems: ManifestItem[] = [
  {
    name: 'view-switcher',
    type: 'registry:ui',
    category: 'navigation',
    badge: 'new',
    description: 'A list, grid and compact toggle on the segmented control, with ViewItems to render items per layout and a view transition between them.',
    files: ['registry/ui/view-switcher.tsx'],
  },
  {
    name: 'corner-video',
    type: 'registry:ui',
    category: 'data-display',
    badge: 'new',
    description: 'A floating video card docked at the bottom inline end: muted, with play, mute, close and an expand dialog, and a placeholder without a src.',
    files: ['registry/ui/corner-video.tsx'],
  },
];
