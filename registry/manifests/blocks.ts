import type { ManifestItem } from '../manifest';
import { agentBlocks } from './blocks-agents';
import { aiChatBlocks } from './blocks-ai-chat';
import { appBlocks } from './blocks-app';
import { checkoutBlocks } from './blocks-checkout';
import { commerceBlocks } from './blocks-commerce';
import { landingHeroBlocks } from './blocks-landing-heroes';
import { landingSectionBlocks } from './blocks-landing-sections';
import { marketingBlocks } from './blocks-marketing';
import { marketingBlocks2a } from './blocks-marketing-2a';
import { sectionsIndustryBlocks } from './blocks-sections-industry';
import { storefrontProductBlocks } from './blocks-storefront-product';
import { storefrontBlocks } from './blocks-storefront';
import { landingFooterBlocks } from './blocks-landing-footers';
import { sectionsUtilityBlocks } from './blocks-sections-utility';

export const blockItems: ManifestItem[] = [
  ...marketingBlocks,
  ...marketingBlocks2a,
  ...appBlocks,
  ...commerceBlocks,
  ...storefrontBlocks,
  ...storefrontProductBlocks,
  ...landingHeroBlocks,
  ...landingSectionBlocks,
  ...landingFooterBlocks,
  ...agentBlocks,
  ...aiChatBlocks,
  ...checkoutBlocks,
  ...sectionsIndustryBlocks,
  ...sectionsUtilityBlocks,
];
