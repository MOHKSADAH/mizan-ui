import type { ManifestItem } from '../manifest';
import { aiChatBlocks } from './blocks-ai-chat';
import { appBlocks } from './blocks-app';
import { checkoutBlocks } from './blocks-checkout';
import { commerceBlocks } from './blocks-commerce';
import { landingSectionBlocks } from './blocks-landing-sections';
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
  ...checkoutBlocks,
  ...aiChatBlocks,
  ...landingSectionBlocks,
  ...landingHeroBlocks,
  ...landingFooterBlocks,
];
