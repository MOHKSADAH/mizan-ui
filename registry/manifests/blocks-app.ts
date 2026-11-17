import type { ManifestItem } from '../manifest';

export const appBlocks: ManifestItem[] = [
  {
    name: 'app-shell-01',
    type: 'registry:block',
    family: 'app-shell',
    title: 'App shell 01',
    description: 'Admin shell with a sidebar, header, breadcrumbs and a user menu.',
    files: ['registry/blocks/app-shell/app-shell-01.tsx'],
  },
  {
    name: 'app-shell-02',
    type: 'registry:block',
    family: 'app-shell',
    title: 'App shell 02',
    description: 'Admin shell whose sidebar collapses to an icon rail with tooltips.',
    files: ['registry/blocks/app-shell/app-shell-02.tsx'],
  },
  {
    name: 'dashboard-01',
    type: 'registry:block',
    family: 'dashboard',
    title: 'Dashboard 01',
    description: 'Sales dashboard with KPI cards, an area chart with a comparison line, a bar chart and recent orders.',
    files: ['registry/blocks/dashboard/dashboard-01.tsx'],
  },
];
