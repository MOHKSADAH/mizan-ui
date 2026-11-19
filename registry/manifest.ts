import { agentItems } from './manifests/agents';
import { aiItems } from './manifests/ai';
import { asciiItems } from './manifests/ascii';
import { blockItems } from './manifests/blocks';
import { commerceItems } from './manifests/commerce';
import { displayItems } from './manifests/display';
import { foundationItems } from './manifests/foundation';
import { gulfItems } from './manifests/gulf';
import { inputsItems } from './manifests/inputs';
import { interactionItems } from './manifests/interactions';
import { pageItems } from './manifests/pages';
import { storefrontProductItems } from './manifests/storefront-product';
import { storefrontItems } from './manifests/storefront';

export type Category = 'forms' | 'data-display' | 'overlays' | 'navigation' | 'feedback' | 'layout' | 'commerce' | 'ascii';

export type ItemType = 'registry:ui' | 'registry:lib' | 'registry:hook' | 'registry:block';

export type ManifestItem = {
  name: string;
  type: ItemType;
  files: string[];
  category?: Category;
  // Blocks only: the family (navbar, hero, ...) the numbered variant belongs to.
  family?: string;
  // Pages only: a full page composed of section blocks. Docs group pages apart from sections.
  kind?: 'page';
  // Marks a new or changed item in the docs nav. Docs only: it never reaches registry.json.
  badge?: 'new' | 'updated';
  title?: string;
  description?: string;
};

const ui: Record<Category, string[]> = {
  forms: [
    'button', 'button-group', 'calendar', 'checkbox', 'combobox', 'field', 'input', 'input-group', 'input-otp',
    'label', 'questionnaire', 'radio-group', 'select', 'slider', 'switch', 'textarea', 'toggle', 'toggle-group',
  ],
  'data-display': [
    'attachment', 'avatar', 'badge', 'bubble', 'card', 'carousel', 'chart', 'code-block', 'item', 'kbd', 'marker',
    'message', 'message-scroller', 'table', 'trace',
  ],
  overlays: [
    'alert-dialog', 'command', 'context-menu', 'dialog', 'drawer', 'dropdown-menu', 'hover-card', 'popover', 'sheet',
    'tooltip',
  ],
  navigation: ['breadcrumb', 'menubar', 'navigation-menu', 'pagination', 'sidebar', 'tabs'],
  feedback: ['alert', 'empty', 'progress', 'skeleton', 'sonner', 'spinner', 'toast'],
  layout: ['accordion', 'aspect-ratio', 'collapsible', 'direction', 'resizable', 'scroll-area', 'separator'],
  commerce: ['price'],
  ascii: [],
};

export const categories = Object.keys(ui) as Category[];

// Extra items live in their own lists so parallel work does not edit the same file.
export const uiItems: ManifestItem[] = [
  ...categories.flatMap((category) =>
    ui[category].map((name) => ({ name, type: 'registry:ui' as const, category, files: [`registry/ui/${name}.tsx`] })),
  ),
  ...foundationItems,
  ...gulfItems,
  ...displayItems,
  ...commerceItems,
  ...asciiItems,
  ...inputsItems,
  ...storefrontProductItems,
  ...storefrontItems,
  ...agentItems,
  ...aiItems,
  ...interactionItems,
];

export const manifest: ManifestItem[] = [
  { name: 'utils', type: 'registry:lib', files: ['registry/lib/utils.ts'] },
  { name: 'format', type: 'registry:lib', files: ['registry/lib/format.ts'] },
  { name: 'use-mobile', type: 'registry:hook', files: ['registry/hooks/use-mobile.ts'] },
  ...uiItems,
  ...blockItems,
  ...pageItems,
];
