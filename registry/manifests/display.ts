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
  { name: 'comparison-slider', type: 'registry:ui', category: 'data-display', files: ['registry/ui/comparison-slider.tsx'] },
  { name: 'marquee', type: 'registry:ui', category: 'layout', files: ['registry/ui/marquee.tsx'] },
  { name: 'use-scrollspy', type: 'registry:hook', files: ['registry/hooks/use-scrollspy.ts'] },
  { name: 'toc', type: 'registry:ui', category: 'navigation', files: ['registry/ui/toc.tsx'] },
  { name: 'cookie-consent', type: 'registry:ui', category: 'feedback', files: ['registry/ui/cookie-consent.tsx'] },
  { name: 'mega-menu', type: 'registry:ui', category: 'navigation', files: ['registry/ui/mega-menu.tsx'] },
  { name: 'avatar-group', type: 'registry:ui', category: 'data-display', files: ['registry/ui/avatar-group.tsx'] },
  { name: 'timeline', type: 'registry:ui', category: 'data-display', files: ['registry/ui/timeline.tsx'] },
];
