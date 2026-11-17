"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import type { Digits, Lang } from "@/registry/lib/format"
import { Price } from "@/registry/ui/price"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

type PaymentMethodId = "card" | "mada" | "apple-pay" | "stc-pay" | "tabby" | "tamara" | "cod" | (string & {})

type PaymentMethod = {
  id: PaymentMethodId
  label: string
  // Your own logo or icon. Mizan ships no payment logos, they are trademarks.
  icon?: React.ReactNode
  description?: string
  // Extra amount charged for this method, for example a cash on delivery fee.
  fee?: number
  // When set the method is disabled and the reason is shown, for example a minimum order amount.
  disabledReason?: string
  // Shown under the method while it is selected, for example a card form or installment terms.
  details?: React.ReactNode
  // Set false to hide a method, for example Apple Pay on a device without it.
  available?: boolean
}

type PaymentMethodSelectLabels = { fee: string }

const defaultLabels: PaymentMethodSelectLabels = { fee: "Fee" }
const paymentMethodSelectLabelsAr: PaymentMethodSelectLabels = { fee: "رسوم" }

type PaymentMethodSelectProps = Omit<
  React.ComponentProps<typeof RadioGroup>,
  "value" | "defaultValue" | "onValueChange" | "children"
> & {
  label: string
  methods: PaymentMethod[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  currency?: string
  lang?: Lang
  digits?: Digits
  labels?: Partial<PaymentMethodSelectLabels>
}

function PaymentMethodSelect({
  label,
  methods,
  value,
  defaultValue,
  onValueChange,
  currency = "SAR",
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: PaymentMethodSelectProps) {
  const t = { ...defaultLabels, ...labels }
  const id = React.useId()
  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const current = value ?? internal

  return (
    <RadioGroup
      data-slot="payment-method-select"
      aria-label={label}
      value={current}
      onValueChange={(next) => {
        setInternal(next as string)
        onValueChange?.(next as string)
      }}
      className={cn("gap-3", className)}
      {...props}
    >
      {methods
        .filter((method) => method.available !== false)
        .map((method) => {
          const disabled = method.disabledReason !== undefined
          const selected = current === method.id
          const base = `${id}-${method.id}`
          const describedBy = [
            method.description && `${base}-description`,
            method.fee !== undefined && `${base}-fee`,
            disabled && `${base}-reason`,
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <div
              key={method.id}
              data-selected={selected || undefined}
              className={cn(
                "rounded-lg border border-border bg-card text-card-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
                selected && "border-foreground ring-1 ring-foreground",
                disabled && "opacity-60"
              )}
            >
              <label className={cn("flex items-center gap-3 p-3", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
                <RadioGroupItem
                  value={method.id}
                  disabled={disabled}
                  aria-labelledby={`${base}-label`}
                  aria-describedby={describedBy || undefined}
                  className="focus-visible:ring-0"
                />
                {method.icon && (
                  <span aria-hidden="true" className="flex h-8 min-w-10 shrink-0 items-center justify-center">
                    {method.icon}
                  </span>
                )}
                <span className="flex min-w-0 flex-1 flex-col">
                  <span id={`${base}-label`} className="text-sm font-medium">
                    {method.label}
                  </span>
                  {method.description && (
                    <span id={`${base}-description`} className="text-xs text-muted-foreground">
                      {method.description}
                    </span>
                  )}
                  {disabled && (
                    <span id={`${base}-reason`} className="text-xs text-muted-foreground">
                      {method.disabledReason}
                    </span>
                  )}
                </span>
                {method.fee !== undefined && (
                  <span id={`${base}-fee`} className="flex shrink-0 gap-1 text-xs text-muted-foreground">
                    {t.fee}
                    <Price amount={method.fee} currency={currency} lang={lang} digits={digits} decimals />
                  </span>
                )}
              </label>
              {selected && method.details && <div className="border-t border-border p-3 text-sm">{method.details}</div>}
            </div>
          )
        })}
    </RadioGroup>
  )
}

export { PaymentMethodSelect, paymentMethodSelectLabelsAr }
export type { PaymentMethod, PaymentMethodId, PaymentMethodSelectLabels }
