import * as React from "react"
import { XIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { plural, type Digits, type Lang, type Locale } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"

type FilterChip = { id: string; label: string }

type FilterChipsLabels = {
  group: string
  remove: (label: string) => string
  clearAll: string
  results: (n: number, locale?: Locale) => string
}

const defaultLabels: FilterChipsLabels = {
  group: "Active filters",
  remove: (label) => `Remove filter: ${label}`,
  clearAll: "Clear all",
  results: (n, locale = { lang: "en" }) => plural(n, { one: "{n} result", other: "{n} results" }, locale),
}

const filterChipsLabelsAr: FilterChipsLabels = {
  group: "الفلاتر المفعّلة",
  remove: (label) => `إزالة الفلتر: ${label}`,
  clearAll: "مسح الكل",
  results: (n, locale = { lang: "ar" }) =>
    plural(
      n,
      { zero: "لا توجد نتائج", one: "نتيجة واحدة", two: "نتيجتان", few: "{n} نتائج", many: "{n} نتيجة", other: "{n} نتيجة" },
      locale
    ),
}

type FilterChipsProps = Omit<React.ComponentProps<"div">, "children"> & {
  filters: FilterChip[]
  onRemove: (id: string) => void
  onClearAll: () => void
  resultCount?: number
  lang?: Lang
  digits?: Digits
  labels?: Partial<FilterChipsLabels>
}

// The chip row scrolls with a hard clip at the edge (no fade, per the no-gradient rule).
function FilterChips({
  filters,
  onRemove,
  onClearAll,
  resultCount,
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: FilterChipsProps) {
  const t = { ...defaultLabels, ...labels }

  return (
    <div data-slot="filter-chips" className={cn("flex min-w-0 flex-col gap-2", className)} {...props}>
      {filters.length > 0 && (
        <div className="flex items-center gap-2">
          <ul
            aria-label={t.group}
            tabIndex={0}
            className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto rounded-lg py-1 outline-none [scrollbar-width:none] focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-scrollbar]:hidden"
          >
            {filters.map((filter) => (
              <li
                key={filter.id}
                className="inline-flex h-7 shrink-0 items-center gap-0.5 rounded-full border border-border bg-secondary ps-2.5 pe-0.5 text-xs font-medium text-secondary-foreground"
              >
                {filter.label}
                <button
                  type="button"
                  aria-label={t.remove(filter.label)}
                  onClick={() => onRemove(filter.id)}
                  className="inline-flex size-6 items-center justify-center rounded-full outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <XIcon aria-hidden="true" weight="bold" className="size-3" />
                </button>
              </li>
            ))}
          </ul>
          <Button variant="ghost" size="sm" onClick={onClearAll} className="shrink-0">
            {t.clearAll}
          </Button>
        </div>
      )}
      {resultCount !== undefined && (
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          {t.results(resultCount, { lang, digits })}
        </p>
      )}
    </div>
  )
}

export { FilterChips, filterChipsLabelsAr }
export type { FilterChip, FilterChipsLabels }
