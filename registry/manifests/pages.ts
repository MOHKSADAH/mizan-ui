import type { ManifestItem } from '../manifest';
import { agentPages } from './pages-agents';
import { aiChatPages } from './blocks-ai-chat';

export const pageItems: ManifestItem[] = [
  {
    name: 'home-page-01',
    type: 'registry:block',
    family: 'home-page',
    kind: 'page',
    badge: 'new',
    title: 'Home page 01',
    description: 'Business home page: contact navbar, split hero with a live product panel, stat band, bento, steps, quote, one plan, FAQ, call card and legal footer.',
    files: ['registry/pages/home-page/home-page-01.tsx'],
  },
  ...agentPages,
  ...aiChatPages,
];
