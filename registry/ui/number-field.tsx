"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { MinusIcon, PlusIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { localeTag, type Digits, type Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"

type NumberFieldLabels = { increment: string; decrement: string }

const numberFieldLabels: NumberFieldLabels = { increment: "Increase", decrement: "Decrease" }

const numberFieldLabelsAr: NumberFieldLabels = { increment: "زيادة", decrement: "إنقاص" }

type NumberFieldProps = Omit<NumberFieldPrimitive.Root.Props, "locale" | "children"> & {
  lang?: Lang
  digits?: Digits
  labels?: Partial<NumberFieldLabels>
  placeholder?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
}

// Base UI parses Arabic-Indic and Persian digits typed or pasted into the input; `format` takes Intl options (currency, unit, percent).
function NumberField({
  lang = "en",
  digits = "latn",
  labels,
  placeholder,
  "aria-label": ariaLabel,
  "aria-invalid": invalid,
  className,
  ...props
}: NumberFieldProps) {
  const l = { ...(lang === "ar" ? numberFieldLabelsAr : numberFieldLabels), ...labels }
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      locale={localeTag({ lang, digits })}
      className={cn("w-full", className)}
      {...props}
    >
      <NumberFieldPrimitive.Group
        data-slot="number-field-group"
        className="flex h-8 w-full items-center rounded-lg border border-input transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-disabled:opacity-50 dark:bg-input/30"
      >
        <NumberFieldPrimitive.Decrement
          aria-label={l.decrement}
          render={<Button variant="ghost" size="icon-sm" className="shrink-0 rounded-none rounded-s-lg" />}
        >
          <MinusIcon aria-hidden="true" />
        </NumberFieldPrimitive.Decrement>
        <NumberFieldPrimitive.Input
          data-slot="number-field-input"
          dir="ltr"
          aria-label={ariaLabel}
          aria-invalid={invalid}
          placeholder={placeholder}
          className="h-full min-w-0 flex-1 bg-transparent px-2 text-center text-base tabular-nums outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm"
        />
        <NumberFieldPrimitive.Increment
          aria-label={l.increment}
          render={<Button variant="ghost" size="icon-sm" className="shrink-0 rounded-none rounded-e-lg" />}
        >
          <PlusIcon aria-hidden="true" />
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  )
}

export { NumberField, numberFieldLabels, numberFieldLabelsAr }
export type { NumberFieldLabels, NumberFieldProps }
