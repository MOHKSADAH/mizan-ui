"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"

type StickyActionBarLabels = { region: string }

const defaultLabels: StickyActionBarLabels = { region: "Actions" }
const stickyActionBarLabelsAr: StickyActionBarLabels = { region: "الإجراءات" }

type StickyActionBarProps = Omit<React.ComponentProps<"div">, "children"> & {
  // Usually a Price. Sits at the inline start.
  price?: React.ReactNode
  // Usually a Button. Sits at the inline end.
  action: React.ReactNode
  labels?: Partial<StickyActionBarLabels>
}

// Sets --sticky-bar-height on the document so floating buttons and the page end can clear the bar.
function StickyActionBar({ price, action, labels, className, ...props }: StickyActionBarProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const root = document.documentElement
    const observer = new ResizeObserver(() =>
      root.style.setProperty("--sticky-bar-height", `${el.offsetHeight}px`)
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      root.style.removeProperty("--sticky-bar-height")
    }
  }, [])
  return (
    <div
      ref={ref}
      data-slot="sticky-action-bar"
      role="region"
      aria-label={{ ...defaultLabels, ...labels }.region}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t bg-card px-4 pt-3 pb-[max(--spacing(3),env(safe-area-inset-bottom))] text-card-foreground md:hidden",
        className
      )}
      {...props}
    >
      {price && <div className="min-w-0 font-medium">{price}</div>}
      <div className="ms-auto shrink-0">{action}</div>
    </div>
  )
}

export { StickyActionBar, stickyActionBarLabelsAr }
export type { StickyActionBarLabels }
