import type { Lang } from '@/registry/lib/format';

export type Bilingual = { en: string; ar: string };

export type ExampleProps = { lang: Lang };

// Each registry/examples/<name>.tsx exports `doc` plus one function per example, named in `doc.examples`.
// Keep the file a Server Component (no 'use client'): put hooks in a small client helper file next to it.
export type ExampleDoc = {
  description: Bilingual;
  usage?: string;
  accessibility: Bilingual[];
  examples: Record<string, Bilingual>;
};
