import * as React from "react"
import { CheckIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { formatNumber, type Digits, type Lang } from "@/registry/lib/format"

type OrderStep = { id: string; label: string }

type OrderStepperLabels = { completed: string }

const defaultLabels: OrderStepperLabels = { completed: "Completed" }
const orderStepperLabelsAr: OrderStepperLabels = { completed: "مكتملة" }

type OrderStepperProps = Omit<React.ComponentProps<"ol">, "children"> & {
  steps: OrderStep[]
  // The id of the current step. Steps before it are completed.
  current: string
  // Show only the current label at every width. By default this happens below the sm breakpoint.
  compact?: boolean
  lang?: Lang
  digits?: Digits
  labels?: Partial<OrderStepperLabels>
}

function OrderStepper({
  steps,
  current,
  compact,
  lang = "en",
  digits,
  labels,
  className,
  ...props
}: OrderStepperProps) {
  const t = { ...defaultLabels, ...labels }
  const currentIndex = steps.findIndex((step) => step.id === current)

  return (
    <ol data-slot="order-stepper" className={cn("flex items-center text-sm", className)} {...props}>
      {steps.map((step, index) => {
        const done = index < currentIndex
        const active = index === currentIndex
        return (
          <li
            key={step.id}
            aria-current={active ? "step" : undefined}
            className={cn(
              "flex items-center gap-2 after:mx-2 after:h-px after:min-w-4 after:flex-1 after:bg-border last:after:hidden",
              done && "after:bg-primary",
              index < steps.length - 1 && "flex-1"
            )}
          >
            <span
              className={cn(
                "inline-flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary bg-background text-foreground ring-2 ring-primary",
                !done && !active && "border-border text-muted-foreground"
              )}
            >
              {done ? <CheckIcon aria-hidden="true" weight="bold" className="size-3.5" /> : formatNumber(index + 1, { lang, digits })}
            </span>
            <span
              className={cn(
                "whitespace-nowrap",
                active ? "font-medium" : "text-muted-foreground",
                !active && (compact ? "sr-only" : "sr-only sm:not-sr-only")
              )}
            >
              {step.label}
              {done && <span className="sr-only">, {t.completed}</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export { OrderStepper, orderStepperLabelsAr }
export type { OrderStep, OrderStepperLabels }
