import { cn } from '@/registry/lib/utils';

// Wide content scrolls here, not the page. A focusable named region lets keyboard users scroll it.
export function ScrollRegion({ label, className, ...props }: { label: string } & React.ComponentProps<'div'>) {
  return (
    <div
      role="region"
      tabIndex={0}
      aria-label={label}
      className={cn('relative overflow-x-auto rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50', className)}
      {...props}
    />
  );
}
