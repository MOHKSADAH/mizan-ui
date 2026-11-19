import type { ManifestItem } from '../manifest';

const block = (family: string, n: number, title: string, description: string): ManifestItem => ({
  name: `${family}-${String(n).padStart(2, '0')}`,
  type: 'registry:block',
  family,
  badge: 'new',
  title,
  description,
  files: [`registry/blocks/${family}/${family}-${String(n).padStart(2, '0')}.tsx`],
});

export const landingHeroBlocks: ManifestItem[] = [
  block('hero', 9, 'Hero 09', 'Product hero with CTAs, brand pills and a dashboard and storefront preview composed from registry components in one card.'),
  block('hero', 10, 'Hero 10', 'Editorial hero split: title, description, CTA and an author, category and date row beside an image box with a placeholder.'),
  block('hero', 11, 'Hero 11', 'Image-first hero: a wide image box with a placeholder, then the title, CTAs and a short facts row on the page background.'),
  block('hero', 12, 'Hero 12', 'Studio hero with the name as the page heading, a value line, two CTAs and a row of four concept cards with letter labels.'),
  block('stats', 5, 'Stats 05', 'Numbers band with a lead number one step larger than the rest, hairline dividers and a sentence of context under each number.'),
  block('logo-cloud', 5, 'Logo cloud 05', 'Bordered grid of brand names set as text marks in one weight, under one sentence of social proof.'),
];
