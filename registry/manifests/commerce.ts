import type { ManifestItem } from '../manifest';

const item = (name: string, description: string): ManifestItem => ({
  name,
  type: 'registry:ui',
  category: 'commerce',
  files: [`registry/ui/${name}.tsx`],
  description,
});

export const commerceItems: ManifestItem[] = [
  item('quantity-stepper', 'Minus, number and plus quantity control with min, max, remove at the minimum and live announcements.'),
  item('rating', 'Read-only star rating with partial fills that mirror in RTL, a spoken value and a review count.'),
  item('swatch-select', 'Color, size and image swatches as a radio group with a selected name and out-of-stock state.'),
  item('filter-chips', 'Removable active-filter chips with clear all, a live result count and a scrolling row.'),
  item('status-badge', 'Order status badge (pending to refunded) with an icon, text and a status token color.'),
  item('payment-method-select', 'Radio group of payment methods with icon slots, fee, disabled reason and a details panel.'),
  item('installments', 'A "4 payments of X" widget with a dated schedule, eligibility range and a provider slot.'),
  item('vat-summary', 'Order totals with subtotal, discount, shipping, VAT (rate, inclusive or exclusive) and total.'),
  item('coupon-input', 'Coupon code field with apply and remove, pending, success and error states and an applied-code chip.'),
  item('product-gallery', 'Product image gallery with Embla swipe, thumbnails, RTL direction and optional zoom dialog.'),
  item('stock-indicator', 'Stock status line: in stock, low stock with a plural count, and out of stock, with an icon and text.'),
  item('delivery-estimate', 'Arrival date in a given time zone, a city slot and a free shipping progress bar.'),
  item('order-stepper', 'Checkout steps in an ordered list with aria-current, completed checks and a compact mode.'),
];
