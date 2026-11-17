"use client"

import * as React from "react"
import { NumberField } from "@base-ui/react/number-field"
import { MinusIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { localeTag, type Digits, type Lang } from "@/registry/lib/format"

type QuantityStepperLabels = {
  decrease: string
  increase: string
  remove: string
  quantity: string
  announce: (n: number) => string
}

const defaultLabels: QuantityStepperLabels = {
  decrease: "Decrease quantity",
  increase: "Increase quantity",
  remove: "Remove item",
  quantity: "Quantity",
  announce: (n) => `Quantity ${n}`,
}

const quantityStepperLabelsAr: QuantityStepperLabels = {
  decrease: "إنقاص الكمية",
  increase: "زيادة الكمية",
  remove: "إزالة المنتج",
  quantity: "الكمية",
  announce: (n) => `الكمية ${n}`,
}

type QuantityStepperProps = Omit<
  NumberField.Root.Props,
  "onValueChange" | "value" | "defaultValue" | "locale" | "format"
> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  // Pressing decrease at `min` calls this instead of going below it.
  onRemove?: () => void
  lang?: Lang
  digits?: Digits
  labels?: Partial<QuantityStepperLabels>
}

const stepButton =
  "inline-flex size-8 shrink-0 items-center justify-center outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"

function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max,
  onValueChange,
  onRemove,
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: QuantityStepperProps) {
  const t = { ...defaultLabels, ...labels }
  const [current, setCurrent] = React.useState(defaultValue)
  const [announcement, setAnnouncement] = React.useState("")
  const shown = value ?? current
  const removing = onRemove !== undefined && shown <= min

  return (
    <NumberField.Root
      data-slot="quantity-stepper"
      value={shown}
      min={onRemove ? min - 1 : min}
      max={max}
      locale={localeTag({ lang, digits })}
      onValueChange={(next) => {
        if (next === null) return
        if (onRemove && next < min) return onRemove()
        setCurrent(next)
        setAnnouncement(t.announce(next))
        onValueChange?.(next)
      }}
      className={cn("inline-flex", className)}
      {...props}
    >
      <NumberField.Group className="inline-flex h-8 items-center rounded-lg border border-input dark:bg-input/30">
        <NumberField.Decrement
          aria-label={removing ? t.remove : t.decrease}
          className={cn(stepButton, "rounded-s-lg")}
        >
          {removing ? <TrashIcon className="size-4" /> : <MinusIcon className="size-4" />}
        </NumberField.Decrement>
        <NumberField.Input
          aria-label={t.quantity}
          className="h-full w-10 min-w-0 bg-transparent text-center text-sm tabular-nums outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <NumberField.Increment aria-label={t.increase} className={cn(stepButton, "rounded-e-lg")}>
          <PlusIcon className="size-4" />
        </NumberField.Increment>
      </NumberField.Group>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </NumberField.Root>
  )
}

export { QuantityStepper, quantityStepperLabelsAr }
export type { QuantityStepperLabels }
