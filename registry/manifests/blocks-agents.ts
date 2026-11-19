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
  block('agent-map', 'Agent map 01', 'An orchestrator on the start side, sub-agents in the middle and tools on the end side, joined by SVG lines that mirror in RTL. One agent waits for review.'),
  block('agent-trace', 'Agent trace 01', 'A run header (duration, cost, tokens, tool calls, agents) over a waterfall of nested steps on a time axis, with a selected-step panel.'),
  block('agent-tools', 'Agent tools 01', 'Connected MCP servers with tool counts, on and off switches, expandable tool lists tagged read-only or writes, and sign-in and retry states.'),
  block('agent-runs', 'Agent runs 01', 'Live run list with All, Mine and Needs you filters, a status icon, elapsed time and an Open state per run.'),
  block('agent-spend', 'Agent spend 01', 'A total and budget bar split by agent, then per-step or per-model spend bars with a Step and Model toggle.'),
  block('agent-roster', 'Agent roster 01', 'A team of agents with role, model, current task, status pill and cost each, and the total spent today.'),
];
