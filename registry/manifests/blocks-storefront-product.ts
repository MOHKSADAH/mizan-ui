import type { ManifestItem } from '../manifest';

const block = (family: string, n: string, title: string, description: string): ManifestItem => ({
  name: `${family}-${n}`,
  type: 'registry:block',
  family,
  badge: 'new',
  title,
  description,
  files: [`registry/blocks/${family}/${family}-${n}.tsx`],
});

export const storefrontProductBlocks: ManifestItem[] = [
  block('product-detail', '01', 'Product Detail 01', 'Classic product page: gallery beside a buy box with price, installments, variants, quantity, delivery estimate and an accordion.'),
  block('product-detail', '02', 'Product Detail 02', 'Editorial product page: a full-width image grid, a sticky buy box and a specifications table.'),
  block('product-detail', '03', 'Product Detail 03', 'Compact product page for quick buying on a phone, with a sticky add to cart bar.'),
  block('product-reviews', '01', 'Product Reviews 01', 'Rating summary and a review list with verified badge, photos, helpful votes, sort and pagination.'),
  block('product-reviews', '02', 'Product Reviews 02', 'Compact highlights: one lead review and two smaller review cards for a product page.'),
  block('quick-view', '01', 'Quick View 01', 'Product quick view in a dialog on desktop and a bottom drawer on a phone, with gallery, variants and add to cart.'),
];
