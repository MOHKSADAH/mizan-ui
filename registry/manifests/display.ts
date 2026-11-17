import type { ManifestItem } from '../manifest';

export const displayItems: ManifestItem[] = [
  { name: 'sparkline', type: 'registry:lib', files: ['registry/lib/sparkline.ts'] },
  { name: 'stat-card', type: 'registry:ui', category: 'data-display', files: ['registry/ui/stat-card.tsx'] },
  { name: 'qr-code', type: 'registry:ui', category: 'data-display', files: ['registry/ui/qr-code.tsx'] },
  { name: 'copy-button', type: 'registry:ui', category: 'forms', files: ['registry/ui/copy-button.tsx'] },
  { name: 'share-button', type: 'registry:ui', category: 'forms', files: ['registry/ui/share-button.tsx'] },
];
