import type { ManifestItem } from '../manifest';
import { appBlocks } from './blocks-app';
import { commerceBlocks } from './blocks-commerce';
import { landingHeroBlocks } from './blocks-landing-heroes';
import { marketingBlocks } from './blocks-marketing';
import { marketingBlocks2a } from './blocks-marketing-2a';
import { storefrontProductBlocks } from './blocks-storefront-product';
import { storefrontBlocks } from './blocks-storefront';
import { landingFooterBlocks } from './blocks-landing-footers';

export const blockItems: ManifestItem[] = [
  ...marketingBlocks,
  ...marketingBlocks2a,
  ...appBlocks,
  ...commerceBlocks,
  ...storefrontBlocks,
  ...storefrontProductBlocks,
  ...landingHeroBlocks,
  ...landingFooterBlocks,
];
