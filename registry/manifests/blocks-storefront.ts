import type { ManifestItem } from '../manifest';

const block = (family: string, n: string, title: string, description: string): ManifestItem => ({
  name: `${family}-${n}`,
  type: 'registry:block',
  family,
  title,
  description,
  files: [`registry/blocks/${family}/${family}-${n}.tsx`],
});

export const storefrontBlocks: ManifestItem[] = [
  block('product-grid', '01', 'Product Grid 01', 'Product grid with a filter sidebar (category, price, size, color, availability) that becomes a sheet on mobile, sort, count and pagination.'),
  block('product-grid', '02', 'Product Grid 02', 'Product grid with a category pill toolbar, price, sale and stock filters, active filter chips and a result count.'),
  block('product-grid', '03', 'Product Grid 03', 'Product rail with swipe and arrow controls for a best sellers or new arrivals section.'),
  block('category-grid', '01', 'Category Grid 01', 'Image tiles with the category name and item count.'),
  block('category-grid', '02', 'Category Grid 02', 'Icon pill strip of categories for a store home, scrolling on mobile.'),
  block('wishlist', '01', 'Wishlist 01', 'Saved products with move to cart, remove, a live announcement and an empty state.'),
];
