import type { ManifestItem } from '../manifest';

export const interactionItems: ManifestItem[] = [
  {
    name: 'slide-to-confirm',
    type: 'registry:ui',
    category: 'forms',
    badge: 'new',
    description: 'A handle you drag toward the inline end to confirm a payment or an order, with keyboard steps and an optional plain button.',
    files: ['registry/ui/slide-to-confirm.tsx'],
  },
  {
    name: 'view-switcher',
    type: 'registry:ui',
    category: 'navigation',
    badge: 'new',
    description: 'A list, grid and compact toggle on the segmented control, with ViewItems to render items per layout and a view transition between them.',
    files: ['registry/ui/view-switcher.tsx'],
  },
  {
    name: 'action-dock',
    type: 'registry:ui',
    category: 'navigation',
    badge: 'new',
    description: 'A phone bottom dock on the bottom nav where one item opens a tray (search) or an action list (New) right above it.',
    files: ['registry/ui/action-dock.tsx'],
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
