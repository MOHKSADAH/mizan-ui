import type { Category, ManifestItem } from '../manifest';

const item = (name: string, category: Category, description: string): ManifestItem => ({
  name,
  type: 'registry:ui',
  category,
  badge: 'new',
  files: [`registry/ui/${name}.tsx`],
  description,
});

export const aiItems: ManifestItem[] = [
  item('prompt-input', 'forms', 'Chat input with an auto-direction textarea, an attachment strip, tool and model slots, and a send button that turns into stop.'),
];
