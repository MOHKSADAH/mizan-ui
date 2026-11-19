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

export const landingFooterBlocks: ManifestItem[] = [
  block('footer', '05', 'Footer 05', 'Gulf company footer: link columns, support phone and WhatsApp, country selector, app store buttons, and a legal row with CR number, VAT number and licence.'),
  block('footer', '06', 'Footer 06', 'Wordmark footer: one centered link row and a brand wordmark that fits the full width, scaled by font size only.'),
  block('footer', '07', 'Footer 07', 'Call-to-action band joined on top of a compact sitemap and legal row.'),
  block('cta', '05', 'CTA 05', 'Split call to action: a short headline, a benefit list and a phone mock built from registry components.'),
  block('cta', '06', 'CTA 06', 'Minimal display call to action: one large headline with weight contrast and one button on a tinted surface.'),
  block('newsletter', '01', 'Newsletter 01', 'Newsletter signup with an email field, a consent line and a list of the last three issues.'),
];
