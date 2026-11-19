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
  item('undo-button', 'feedback', 'Destructive button that turns into "Undo (5)" with a countdown and runs the action at 0. Escape undoes it, and a live region announces the start and the result.'),
];
