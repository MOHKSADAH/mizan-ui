import type { ManifestItem } from '../manifest';

export const inputsItems: ManifestItem[] = [
  { name: 'file-upload', type: 'registry:ui', category: 'forms', files: ['registry/ui/file-upload.tsx'] },
  { name: 'tags-input', type: 'registry:ui', category: 'forms', files: ['registry/ui/tags-input.tsx'] },
  { name: 'multi-select', type: 'registry:ui', category: 'forms', files: ['registry/ui/multi-select.tsx'] },
  { name: 'number-field', type: 'registry:ui', category: 'forms', files: ['registry/ui/number-field.tsx'] },
  { name: 'time-picker', type: 'registry:ui', category: 'forms', files: ['registry/ui/time-picker.tsx'] },
  { name: 'password-input', type: 'registry:ui', category: 'forms', files: ['registry/ui/password-input.tsx'] },
  { name: 'mask', type: 'registry:lib', files: ['registry/lib/mask.ts'] },
  { name: 'input-mask', type: 'registry:ui', category: 'forms', files: ['registry/ui/input-mask.tsx'] },
  { name: 'color', type: 'registry:lib', files: ['registry/lib/color.ts'] },
  { name: 'color-picker', type: 'registry:ui', category: 'forms', files: ['registry/ui/color-picker.tsx'] },
  { name: 'signature-pad', type: 'registry:ui', category: 'forms', files: ['registry/ui/signature-pad.tsx'] },
  { name: 'inline-edit', type: 'registry:ui', category: 'forms', files: ['registry/ui/inline-edit.tsx'] },
  { name: 'rating-input', type: 'registry:ui', category: 'forms', files: ['registry/ui/rating-input.tsx'] },
  { name: 'segmented-control', type: 'registry:ui', category: 'forms', files: ['registry/ui/segmented-control.tsx'] },
];
