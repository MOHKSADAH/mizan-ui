"use client"

import * as React from "react"
import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"

import { cn } from "@/registry/lib/utils"

type SwatchOption = {
  value: string
  label: string
  // Any CSS color from your product data.
  color?: string
  // Image URL for texture or pattern swatches.
  image?: string
  outOfStock?: boolean
}

type SwatchSelectLabels = {
  outOfStock: string
  outOfStockLegend: string
}

const defaultLabels: SwatchSelectLabels = {
  outOfStock: "Out of stock",
  outOfStockLegend: "Crossed-out options are out of stock",
}

const swatchSelectLabelsAr: SwatchSelectLabels = {
  outOfStock: "غير متوفر",
  outOfStockLegend: "الخيارات المشطوبة غير متوفرة",
}

type SwatchSelectProps = Omit<RadioGroup.Props, "value" | "defaultValue" | "onValueChange" | "children"> & {
  label: string
  options: SwatchOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  labels?: Partial<SwatchSelectLabels>
}

function SwatchSelect({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  labels,
  className,
  ...props
}: SwatchSelectProps) {
  const t = { ...defaultLabels, ...labels }
  const labelId = React.useId()
  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const current = value ?? internal
  const selected = options.find((o) => o.value === current)

  return (
    <div data-slot="swatch-select" className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-1.5 text-sm">
        <span id={labelId} className="font-medium">
          {label}
        </span>
        {selected && <span className="text-muted-foreground">{selected.label}</span>}
      </div>
      <RadioGroup
        aria-labelledby={labelId}
        value={current}
        onValueChange={(next) => {
          setInternal(next as string)
          onValueChange?.(next as string)
        }}
        className="flex flex-wrap gap-2"
        {...props}
      >
        {options.map((option) => {
          const swatch = option.color !== undefined || option.image !== undefined
          return (
            <Radio.Root
              key={option.value}
              value={option.value}
              disabled={option.outOfStock}
              aria-label={option.outOfStock ? `${option.label}, ${t.outOfStock}` : option.label}
              className={cn(
                "relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-border text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-checked:border-foreground data-disabled:cursor-not-allowed data-disabled:opacity-60",
                // The selected mark is an outline, so the focus ring (a box shadow) still shows on the checked swatch.
                swatch
                  ? "size-8 rounded-full data-checked:outline-2 data-checked:outline-offset-2 data-checked:outline-solid data-checked:outline-foreground"
                  : "h-8 min-w-8 rounded-lg px-2.5 data-checked:bg-primary data-checked:text-primary-foreground",
                option.outOfStock && !swatch && "line-through"
              )}
            >
              {swatch ? (
                <span
                  aria-hidden="true"
                  className="size-full bg-cover bg-center"
                  style={{
                    backgroundColor: option.color,
                    backgroundImage: option.image ? `url("${option.image}")` : undefined,
                  }}
                />
              ) : (
                option.label
              )}
              {option.outOfStock && swatch && (
                <span aria-hidden="true" className="absolute inset-y-0 start-1/2 w-px rotate-45 bg-foreground" />
              )}
            </Radio.Root>
          )
        })}
      </RadioGroup>
      {options.some((o) => o.outOfStock) && <p className="text-xs text-muted-foreground">{t.outOfStockLegend}</p>}
    </div>
  )
}

export { SwatchSelect, swatchSelectLabelsAr }
export type { SwatchOption, SwatchSelectLabels }
