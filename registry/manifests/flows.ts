import type { Category, ManifestItem } from '../manifest';

const item = (name: string, category: Category, description: string): ManifestItem => ({
  name,
  type: 'registry:ui',
  category,
  badge: 'new',
  files: [`registry/ui/${name}.tsx`],
  description,
});

export const flowItems: ManifestItem[] = [
  item('form-wizard', 'forms', 'Multi-step form card with a numbered or dotted step header, a body that follows the step height, per-step validation, a back and next footer and a completion state. Steps slide from the end side and mirror in RTL.'),
];
