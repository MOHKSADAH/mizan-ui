import type { ManifestItem } from '../manifest';
import { appBlocks } from './blocks-app';
import { commerceBlocks } from './blocks-commerce';
import { marketingBlocks } from './blocks-marketing';

export const blockItems: ManifestItem[] = [...marketingBlocks, ...appBlocks, ...commerceBlocks];
