"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { ListDashesIcon, RowsIcon, SquaresFourIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { SegmentedControl } from "@/registry/ui/segmented-control"

type ViewMode = "list" | "grid" | "compact"

type ViewSwitcherLabels = {
  // Names the group of buttons.
  group: string
  list: string
  grid: string
  compact: string
}

const defaultLabels: ViewSwitcherLabels = {
  group: "Layout",
  list: "List",
  grid: "Grid",
  compact: "Compact",
}

const viewSwitcherLabelsAr: ViewSwitcherLabels = {
  group: "طريقة العرض",
  list: "قائمة",
  grid: "شبكة",
  compact: "مضغوط",
}

const icons = {
  list: RowsIcon,
  grid: SquaresFourIcon,
  compact: ListDashesIcon,
} satisfies Record<ViewMode, React.ElementType>

type ViewSwitcherProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: ViewMode
  defaultValue?: ViewMode
  onValueChange?: (value: ViewMode) => void
  // Which layouts to offer, in order.
  views?: ViewMode[]
  labels?: Partial<ViewSwitcherLabels>
}

const allViews: ViewMode[] = ["list", "grid", "compact"]

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Runs the state change inside a view transition where the browser has one, so the items glide to their new place.
// Without support, or under reduced motion, the change is instant.
function withViewTransition(update: () => void) {
  if (!("startViewTransition" in document) || prefersReducedMotion()) return update()
  document.startViewTransition(() => flushSync(update))
}

function ViewSwitcher({
  value,
  defaultValue = "list",
  onValueChange,
  views = allViews,
  labels,
  className,
  ...props
}: ViewSwitcherProps) {
  const t = { ...defaultLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue)
  const current = value ?? inner
  // SegmentedControl re-measures when `options` changes, so keep the array stable between renders.
  const options = React.useMemo(
    () =>
      views.map((view) => {
        const Icon = icons[view]
        return {
          value: view,
          label: (
            <>
              <Icon aria-hidden="true" className="size-4" />
              <span className="sr-only">{view === "list" ? t.list : view === "grid" ? t.grid : t.compact}</span>
            </>
          ),
        }
      }),
    [views, t.list, t.grid, t.compact]
  )
  return (
    <SegmentedControl
      data-slot="view-switcher"
      aria-label={t.group}
      value={current}
      onValueChange={(next) =>
        withViewTransition(() => {
          setInner(next as ViewMode)
          onValueChange?.(next as ViewMode)
        })
      }
      className={className}
      options={options}
      {...props}
    />
  )
}

// Layout classes per view. Put them on your own list when ViewItems does not fit.
const viewClasses: Record<ViewMode, string> = {
  list: "grid gap-3",
  grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  compact: "grid gap-1",
}

type ViewItemsProps<T> = Omit<React.ComponentProps<"ul">, "children"> & {
  view: ViewMode
  items: readonly T[]
  getKey: (item: T) => string
  // Render one item for the current view: a row for list, a card for grid, a dense line for compact.
  children: (item: T, view: ViewMode) => React.ReactNode
}

// Renders the items in the layout of `view`. Every item carries a view-transition-name, so a switch inside ViewSwitcher animates.
function ViewItems<T>({ view, items, getKey, children, className, ...props }: ViewItemsProps<T>) {
  const scope = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  return (
    <ul data-slot="view-items" data-view={view} className={cn(viewClasses[view], className)} {...props}>
      {items.map((item) => {
        const key = getKey(item)
        return (
          <li key={key} style={{ viewTransitionName: `vs-${scope}-${key.replace(/[^a-zA-Z0-9_-]/g, "")}` }}>
            {children(item, view)}
          </li>
        )
      })}
    </ul>
  )
}

export { ViewSwitcher, ViewItems, viewClasses, viewSwitcherLabelsAr }
export type { ViewItemsProps, ViewMode, ViewSwitcherLabels, ViewSwitcherProps }
