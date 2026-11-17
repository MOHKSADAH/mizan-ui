import * as React from "react"
import { XIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { formatNumber, type Digits, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"

type CompareItem = {
  id: string
  name: string
  image?: string
}

type CompareTrayLabels = {
  region: string
  count: (n: string, max: string) => string
  needMore: (min: string) => string
  remove: (name: string) => string
  clear: string
  compare: string
}

const defaultLabels: CompareTrayLabels = {
  region: "Product comparison",
  count: (n, max) => `${n} of ${max} products`,
  needMore: (min) => `Add at least ${min} products to compare`,
  remove: (name) => `Remove ${name} from the comparison`,
  clear: "Clear all",
  compare: "Compare",
}

const compareTrayLabelsAr: CompareTrayLabels = {
  region: "مقارنة المنتجات",
  count: (n, max) => `${n} من ${max} منتجات`,
  needMore: (min) => `أضف ${min} منتجات على الأقل للمقارنة`,
  remove: (name) => `إزالة ${name} من المقارنة`,
  clear: "مسح الكل",
  compare: "قارن",
}

type CompareTrayProps = Omit<React.ComponentProps<"section">, "children"> & {
  items: CompareItem[]
  max?: number
  min?: number
  onRemove: (id: string) => void
  onClear: () => void
  onCompare: () => void
  lang?: Lang
  digits?: Digits
  labels?: Partial<CompareTrayLabels>
}

// Position it yourself, for example className="fixed inset-x-0 bottom-0 z-40".
function CompareTray({
  items,
  max = 4,
  min = 2,
  onRemove,
  onClear,
  onCompare,
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: CompareTrayProps) {
  const t = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const ready = items.length >= min

  return (
    <section
      data-slot="compare-tray"
      aria-label={t.region}
      className={cn("flex flex-wrap items-center gap-3 border border-border bg-card p-3 text-card-foreground", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-col text-sm">
        <p role="status" aria-live="polite" className="font-medium">
          {t.count(formatNumber(items.length, locale), formatNumber(max, locale))}
        </p>
        {!ready && <p className="text-xs text-muted-foreground">{t.needMore(formatNumber(min, locale))}</p>}
      </div>
      <ul className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-lg border border-border bg-background pe-1 ps-1 text-xs"
          >
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt="" className="size-10 rounded-md object-cover" />
            )}
            <span className="max-w-24 truncate">{item.name}</span>
            <button
              type="button"
              aria-label={t.remove(item.name)}
              onClick={() => onRemove(item.id)}
              className="inline-flex size-6 items-center justify-center rounded-full outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <XIcon aria-hidden="true" weight="bold" className="size-3" />
            </button>
          </li>
        ))}
        {Array.from({ length: Math.max(0, max - items.length) }, (_, i) => (
          <li key={`empty-${i}`} aria-hidden="true" className="h-12 w-12 shrink-0 rounded-lg border border-dashed border-border" />
        ))}
      </ul>
      <div className="flex items-center gap-2">
        {items.length > 0 && (
          <Button variant="ghost" onClick={onClear}>
            {t.clear}
          </Button>
        )}
        <Button disabled={!ready} onClick={onCompare}>
          {t.compare}
        </Button>
      </div>
    </section>
  )
}

export { CompareTray, compareTrayLabelsAr }
export type { CompareItem, CompareTrayLabels }
