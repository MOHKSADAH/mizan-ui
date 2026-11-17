import type { ManifestItem } from '../manifest';

export const inputsItems: ManifestItem[] = [
  { name: 'file-upload', type: 'registry:ui', category: 'forms', files: ['registry/ui/file-upload.tsx'] },
  { name: 'normalize-text', type: 'registry:lib', files: ['registry/lib/normalize-text.ts'] },
  { name: 'tags-input', type: 'registry:ui', category: 'forms', files: ['registry/ui/tags-input.tsx'] },
  { name: 'multi-select', type: 'registry:ui', category: 'forms', files: ['registry/ui/multi-select.tsx'] },
  { name: 'number-field', type: 'registry:ui', category: 'forms', files: ['registry/ui/number-field.tsx'] },
];
