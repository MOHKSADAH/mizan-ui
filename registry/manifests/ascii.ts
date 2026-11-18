import type { ManifestItem } from '../manifest';

const ui = (name: string, title: string, description: string, file = name): ManifestItem => ({
  name,
  type: 'registry:ui',
  category: 'ascii',
  title,
  description,
  files: [`registry/ui/ascii/${file}.tsx`],
});

export const asciiItems: ManifestItem[] = [
  {
    name: 'ascii',
    type: 'registry:lib',
    title: 'ASCII helpers',
    description: 'Pure helpers for the ASCII pack: spinner frames, text bars, sparklines and terminal typing.',
    files: ['registry/lib/ascii.ts'],
  },
  ui('ascii-text', 'ASCII Text', 'Large figlet banner text with a screen reader label.'),
  ui('ascii-spinner', 'ASCII Spinner', 'Character-frame loading spinner that respects reduced motion.'),
  ui('ascii-progress', 'ASCII Progress', 'Text progress bar with a progressbar role and percentage.'),
  ui('ascii-box', 'ASCII Box', 'Box-drawing frame and divider (AsciiBox and AsciiDivider).'),
  ui('ascii-chart', 'ASCII Chart', 'Block-character bar chart and sparkline with a text alternative.'),
  ui('terminal', 'Terminal', 'Terminal window with optional typing effect and a copy-commands button.'),
];
