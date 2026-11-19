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
  block('hero', 9, 'Hero 09', 'Product hero with a pill eyebrow that holds a stat, CTAs, logo pills and a real dashboard overlapping a phone storefront that bleeds off the inline-end edge.'),
  block('hero', 10, 'Hero 10', 'Editorial hero with a very large headline in mixed weights, a lead image on a warm card that follows the image ratio, and an author, category and date row.'),
  block('hero', 11, 'Hero 11', 'Full-bleed photo hero with the text on a solid panel, two CTAs and a short facts row for tourism and real estate.'),
  block('hero', 12, 'Hero 12', 'Concept hero with one giant display word, a value line, two CTAs and a row of tilted cards that mirror in RTL.'),
  block('stats', 5, 'Stats 05', 'Numbers band with one lead number set much larger than the rest and a sentence of context under each number.'),
];
