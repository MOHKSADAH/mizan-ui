import type { ManifestItem } from '../manifest';

export const displayItems: ManifestItem[] = [
  { name: 'sparkline', type: 'registry:lib', files: ['registry/lib/sparkline.ts'] },
  { name: 'stat-card', type: 'registry:ui', category: 'data-display', files: ['registry/ui/stat-card.tsx'] },
  { name: 'qr-code', type: 'registry:ui', category: 'data-display', files: ['registry/ui/qr-code.tsx'] },
  { name: 'copy-button', type: 'registry:ui', category: 'forms', files: ['registry/ui/copy-button.tsx'] },
  { name: 'share-button', type: 'registry:ui', category: 'forms', files: ['registry/ui/share-button.tsx'] },
  { name: 'announcement-bar', type: 'registry:ui', category: 'feedback', files: ['registry/ui/announcement-bar.tsx'] },
  { name: 'countdown-parts', type: 'registry:lib', files: ['registry/lib/countdown-parts.ts'] },
  { name: 'countdown', type: 'registry:ui', category: 'data-display', files: ['registry/ui/countdown.tsx'] },
  { name: 'sticky-action-bar', type: 'registry:ui', category: 'commerce', files: ['registry/ui/sticky-action-bar.tsx'] },
  { name: 'bottom-nav', type: 'registry:ui', category: 'navigation', files: ['registry/ui/bottom-nav.tsx'] },
  { name: 'image-lightbox', type: 'registry:ui', category: 'overlays', files: ['registry/ui/image-lightbox.tsx'] },
];
