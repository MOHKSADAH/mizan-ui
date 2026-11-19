import type { ManifestItem } from '../manifest';

export const agentPages: ManifestItem[] = [
  {
    name: 'agents-dashboard-page-01',
    type: 'registry:block',
    family: 'agents-dashboard-page',
    kind: 'page',
    badge: 'new',
    title: 'Agents dashboard page 01',
    description: 'AI agents dashboard in the app shell: live runs, the running plan, agent map, roster, spend, trace, MCP tools and a cost estimate.',
    files: ['registry/pages/agents-dashboard-page/agents-dashboard-page-01.tsx'],
  },
];
