import type { ManifestItem } from '../manifest';
import { appBlocks } from './blocks-app';
import { commerceBlocks } from './blocks-commerce';
import { marketingBlocks } from './blocks-marketing';
import { marketingBlocks2a } from './blocks-marketing-2a';

export const blockItems: ManifestItem[] = [...marketingBlocks, ...marketingBlocks2a, ...appBlocks, ...commerceBlocks];
