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
  block('footer', '06', 'Footer 06', 'Wordmark footer: a centered brand wordmark at hero scale, one link row and a legal line.'),
  block('footer', '07', 'Footer 07', 'Bordered card call-to-action band above a compact sitemap and legal row.'),
  block('cta', '05', 'CTA 05', 'Split call to action: a short headline, a benefit list and an app screen mock built from registry components in a card.'),
  block('cta', '06', 'CTA 06', 'Minimal call to action: one headline and one button in a bordered card.'),
  block('newsletter', '01', 'Newsletter 01', 'Newsletter signup with an email field, a consent line and a list of the last three issues.'),
];
