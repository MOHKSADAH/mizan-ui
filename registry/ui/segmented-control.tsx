"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { DirectionProvider } from "@/registry/ui/direction"

type SegmentedOption = { value: string; label: React.ReactNode; disabled?: boolean }

type SegmentedControlProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  options: SegmentedOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  lang?: Lang
}

// Single choice. The sliding indicator is hidden under prefers-reduced-motion and the pressed item gets its own background instead.
function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
  lang = "en",
  className,
  ...props
}: SegmentedControlProps) {
  const [inner, setInner] = React.useState(defaultValue ?? options[0]?.value)
  const current = value ?? inner
  const root = React.useRef<HTMLDivElement>(null)
  const [box, setBox] = React.useState<{ start: number; width: number } | null>(null)

  React.useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const measure = () => {
      const item = el.querySelector<HTMLElement>("[aria-pressed=true]")
      if (!item) return setBox(null)
      const outer = el.getBoundingClientRect()
      const inside = item.getBoundingClientRect()
      const rtl = getComputedStyle(el).direction === "rtl"
      setBox({ start: rtl ? outer.right - inside.right : inside.left - outer.left, width: inside.width })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [current, options, lang])

  return (
    <DirectionProvider direction={lang === "ar" ? "rtl" : "ltr"}>
      <ToggleGroupPrimitive
        ref={root}
        data-slot="segmented-control"
        value={[current ?? ""]}
        disabled={disabled}
        onValueChange={(next) => {
          const v = next[0]
          if (v === undefined) return
          if (value === undefined) setInner(v)
          onValueChange?.(v)
        }}
        className={cn("relative inline-flex w-fit rounded-lg bg-muted p-0.5", className)}
        {...props}
      >
        {box && (
          <span
            aria-hidden="true"
            style={{ insetInlineStart: box.start, width: box.width }}
            className="absolute inset-y-0.5 rounded-md bg-background shadow-xs motion-safe:transition-[inset-inline-start,width] motion-reduce:hidden"
          />
        )}
        {options.map((o) => (
          <TogglePrimitive
            key={o.value}
            value={o.value}
            disabled={o.disabled}
            className="relative z-10 inline-flex h-7 min-w-8 items-center justify-center gap-1 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-pressed:text-foreground motion-reduce:aria-pressed:bg-background"
          >
            {o.label}
          </TogglePrimitive>
        ))}
      </ToggleGroupPrimitive>
    </DirectionProvider>
  )
}

export { SegmentedControl }
export type { SegmentedControlProps, SegmentedOption }
