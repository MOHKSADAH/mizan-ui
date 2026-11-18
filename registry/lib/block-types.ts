import type { Lang } from '@/registry/lib/format';

export type { Lang };

export type Action = { label: string; href: string; external?: boolean };
export type Media = { src: string; alt: string; width: number; height: number };
export type Currency = 'SAR' | 'AED' | 'KWD' | 'QAR' | 'BHD' | 'OMR';
export type Money = { amount: number; currency: Currency };
// rate is a prop (0.15 in KSA), never hard-coded.
export type Vat = { rate: number; included: boolean };
// Built on Intl.PluralRules (Arabic has 6 forms).
export type Plural = (n: number) => string;
export type BlockBase = { id?: string; headingLevel?: 2 | 3; className?: string };
