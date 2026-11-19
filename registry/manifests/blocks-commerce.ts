import type { ManifestItem } from '../manifest';

const block = (family: string, n: number, title: string, description: string): ManifestItem => ({
  name: `${family}-0${n}`,
  type: 'registry:block',
  family,
  title,
  description,
  files: [`registry/blocks/${family}/${family}-0${n}.tsx`],
});

export const commerceBlocks: ManifestItem[] = [
  block('cart', 1, 'Cart 01', 'Cart page with line items, quantity steppers, a coupon field, a VAT summary and a checkout button.'),
  block('cart', 2, 'Cart 02', 'Slide-over cart in a Sheet with a free shipping progress bar and a pinned total and checkout footer.'),
  block('cart', 3, 'Cart 03', 'Mini cart popover for a navbar with the first lines, an "and n more" count, a subtotal and two actions.'),
];
