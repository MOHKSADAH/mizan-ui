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
  item('reasoning', 'data-display', 'Collapsible "thinking" line with a shimmer while running, a duration when done and paragraphs that follow their own direction.'),
  item('tool-call', 'data-display', 'Tool call card with the tool name, input and output as code, and the states input-streaming, running, done and error.'),
  item('sources', 'data-display', 'Collapsed list of source cards and numbered inline citations that open a hover card.'),
  item('message-actions', 'data-display', 'Copy, regenerate, like and dislike buttons and a 1/3 pager for regenerated responses.'),
  item('suggestions', 'data-display', 'Prompt chips that put their text in the input, in a wrapping or a scrolling row.'),
  item('model-picker', 'forms', 'Searchable model list in a popover with the provider, the context size and the price per million tokens on each row.'),
  item('context-meter', 'feedback', 'Ring with the percent of the context window used and a popover with tokens and cost per row.'),
];
