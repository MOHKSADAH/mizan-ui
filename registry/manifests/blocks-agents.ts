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

export const agentBlocks: ManifestItem[] = [
  block('agent-plan', 'Agent plan 01', 'A task the agent is working on: source apps, a checklist of steps with status and a value each, an estimate and a Stop button.'),
];
