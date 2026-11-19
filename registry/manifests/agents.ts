import type { ManifestItem } from '../manifest';

const item = (name: string, category: 'data-display' | 'feedback', description: string): ManifestItem => ({
  name,
  type: 'registry:ui',
  category,
  badge: 'new',
  files: [`registry/ui/${name}.tsx`],
  description,
});

export const agentItems: ManifestItem[] = [
  item('run-status', 'feedback', 'State pill for an agent run: running, done, idle, queued, failed or needs you, with an icon and text.'),
];
