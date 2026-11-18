import brands from '@/lib/brands.json';
import { cn } from '@/registry/lib/utils';

export type BrandSlug = (typeof brands)[number]['slug'];
const bySlug = Object.fromEntries(brands.map((b) => [b.slug, b]));

// Proprietary marks (mada, Tabby, Tamara, STC Pay) are not shipped in this public repo: they render as text slots.
const TEXT_SLOTS: Record<string, string> = { mada: 'mada', tabby: 'Tabby', tamara: 'Tamara', stcpay: 'STC Pay' };

export function BrandMark({ slug, className }: { slug: string; className?: string }) {
  const b = bySlug[slug];
  if (!b)
    return (
      <span lang="en" className={cn('text-xs font-semibold text-neutral-900', className)}>
        {TEXT_SLOTS[slug] ?? slug}
      </span>
    );
  return (
    <svg
      viewBox={b.viewBox}
      aria-hidden="true"
      className={cn('h-4 w-auto', className)}
      fill={b.needsOriginalColors ? undefined : (b.color ?? 'currentColor')}
      dangerouslySetInnerHTML={{ __html: b.svg }}
    />
  );
}

// Payment marks sit in a white chip in light and dark mode, as card networks require.
export function BrandChip({ slug, className }: { slug: string; className?: string }) {
  return (
    <span
      className={cn('inline-flex h-7 min-w-11 items-center justify-center rounded-md border bg-white px-2', className)}
      aria-hidden="true"
    >
      <BrandMark slug={slug} />
    </span>
  );
}

export const brandList = brands;
