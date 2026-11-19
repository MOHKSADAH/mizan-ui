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
  item('step-list', 'data-display', 'Vertical checklist of steps with a status icon, a title and a short value at the end side.'),
  item('segmented-bar', 'data-display', 'One bar split into parts, for a budget split by agent, with an optional text legend.'),
];
