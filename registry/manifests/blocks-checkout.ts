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

export const checkoutBlocks: ManifestItem[] = [
  block('checkout', '01', 'Checkout 01', 'One-page checkout form: phone-first contact, Saudi address, shipping dates, payment with card details, collapsible sections on mobile.'),
  block('checkout', '02', 'Checkout 02', 'Multi-step checkout with a stepper: contact, address, shipping, payment and a review step with back and next.'),
  block('checkout', '03', 'Checkout 03', 'Express checkout panel: Apple Pay, mada and STC Pay text buttons, an "or pay another way" divider and a compact form.'),
  block('order-tracking', '01', 'Order Tracking 01', 'Shipment timeline with courier, copyable tracking number, delivery estimate and a help link.'),
  block('order-history', '01', 'Order History 01', 'Past orders with status badge, total, reorder and invoice actions, and a status filter.'),
];
