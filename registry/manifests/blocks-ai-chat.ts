import type { ManifestItem } from '../manifest';

const block = (family: string, title: string, description: string): ManifestItem => ({
  name: `${family}-01`,
  type: 'registry:block',
  family,
  badge: 'new',
  title,
  description,
  files: [`registry/blocks/${family}/${family}-01.tsx`],
});

export const aiChatBlocks: ManifestItem[] = [
  block('chat-welcome', 'Chat welcome 01', 'Empty chat with a greeting, the prompt input in the middle and prompt chips that fill it.'),
  block('conversation-list', 'Conversation list 01', 'Chat history grouped by date, with search, a new chat button, inline rename and delete with a confirm.'),
  block('chat-thread', 'Chat thread 01', 'A full thread: user message, reasoning, tool call, answer with citations, list and code block, sources and message actions.'),
];

export const aiChatPages: ManifestItem[] = [
  {
    name: 'chat-page-01',
    type: 'registry:block',
    family: 'chat-page',
    kind: 'page',
    badge: 'new',
    title: 'Chat page 01',
    description: 'Assistant chat page: chat history on the start side, a thread in a scroller and the prompt input with a context meter and a model picker.',
    files: ['registry/pages/chat-page/chat-page-01.tsx'],
  },
];
