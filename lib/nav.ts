import { categories, manifest, uiItems, type Category } from '@/registry/manifest';
import type { Lang } from '@/lib/strings';

export const localePath = (lang: Lang, path: string) => (lang === 'en' ? path : `/ar${path === '/' ? '' : path}`);
export const stripLocale = (pathname: string) => pathname.replace(/^\/ar(?=\/|$)/, '') || '/';

export type TopNavKey = 'docs' | 'components' | 'blocks' | 'charts' | 'themes' | 'icons' | 'changelog';
export const topNav: { key: TopNavKey; href: string; match: string; dot?: boolean }[] = [
  { key: 'docs', href: '/docs', match: '/docs' },
  { key: 'components', href: '/docs/components/button', match: '/docs/components' },
  { key: 'blocks', href: '/blocks', match: '/blocks' },
  { key: 'charts', href: '/charts', match: '/charts' },
  { key: 'themes', href: '/themes', match: '/themes' },
  { key: 'icons', href: '/icons', match: '/icons' },
  { key: 'changelog', href: '/changelog', match: '/changelog', dot: true },
];

export type Badge = 'new' | 'updated';
export type NavItem = { title: string; href: string; badge?: Badge };
export type NavGroup = { key: string; items: NavItem[]; children?: { key: Category; items: NavItem[] }[] };

const BADGES: Record<string, Badge> = { price: 'new', sonner: 'updated', chart: 'updated', sidebar: 'updated' };

const ACRONYMS: Record<string, string> = { otp: 'OTP' };
export const componentTitle = (name: string) =>
  name.split('-').map((w) => ACRONYMS[w] ?? w[0].toUpperCase() + w.slice(1)).join(' ');

const componentLinks = (category: Category) =>
  uiItems
    .filter((i) => i.category === category)
    .map((i) => ({ title: i.title ?? componentTitle(i.name), href: `/docs/components/${i.name}`, badge: BADGES[i.name] }));

// Block families in first-seen order, with their variant counts.
export const blockItems = manifest.filter((i) => i.type === 'registry:block' && i.family);
export const blockFamilies = [...new Set(blockItems.map((b) => b.family!))].map((family) => ({
  family,
  items: blockItems.filter((b) => b.family === family),
}));

export function sidebarNav(pages: Record<string, string>): NavGroup[] {
  return [
    {
      key: 'start',
      items: [
        { title: pages.introduction, href: '/docs' },
        { title: pages.installation, href: '/docs/installation' },
        { title: pages.typography, href: '/typography' },
        { title: pages.tokens, href: '/tokens' },
        { title: pages.changelog, href: '/changelog', badge: 'new' },
      ],
    },
    {
      key: 'components',
      items: [],
      children: categories
        .filter((key) => key !== 'ascii')
        .map((key) => ({ key, items: componentLinks(key) }))
        .filter((g) => g.items.length),
    },
    {
      key: 'blocks',
      items: [
        { title: pages.blocks, href: '/blocks' },
        ...blockFamilies.map((f) => ({ title: `${componentTitle(f.family)} (${f.items.length})`, href: `/blocks/${f.family}` })),
      ],
    },
    { key: 'ascii', items: componentLinks('ascii') },
    { key: 'charts', items: [{ title: pages.charts, href: '/charts' }] },
    { key: 'themes', items: [{ title: pages.themes, href: '/themes' }] },
    { key: 'icons', items: [{ title: pages.icons, href: '/icons' }] },
  ];
}
