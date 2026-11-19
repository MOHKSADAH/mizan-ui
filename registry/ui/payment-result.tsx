import * as React from "react"
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { Spinner } from "@/registry/ui/spinner"

type PaymentResultStatus = "processing" | "success" | "failed"

const tones: Record<PaymentResultStatus, string> = {
  processing: "bg-muted text-muted-foreground",
  success: "bg-success/10 text-success",
  failed: "bg-destructive/10 text-destructive",
}

type PaymentResultProps = Omit<React.ComponentProps<"div">, "title" | "children"> & {
  status: PaymentResultStatus
  title: React.ReactNode
  description?: React.ReactNode
  // Failed only: why the payment did not go through, for example "The bank declined the card".
  reason?: React.ReactNode
  // Buttons or links. For a failed payment, a retry and a choose-another-method action.
  actions?: React.ReactNode
  headingLevel?: 2 | 3 | 4
}

// The state of a payment after the customer pays or returns from a provider redirect (BNPL, Apple Pay, STC Pay).
// It holds no text of its own: every string comes from your props.
function PaymentResult({
  status,
  title,
  description,
  reason,
  actions,
  headingLevel = 2,
  className,
  ...props
}: PaymentResultProps) {
  const Heading = `h${headingLevel}` as const
  return (
    <div
      data-slot="payment-result"
      data-status={status}
      role={status === "failed" ? "alert" : "status"}
      aria-busy={status === "processing" || undefined}
      className={cn("flex w-full max-w-md flex-col items-center gap-3 text-center", className)}
      {...props}
    >
      <span className={cn("flex size-12 items-center justify-center rounded-full [&_svg]:size-6", tones[status])}>
        {status === "processing" && <Spinner aria-hidden="true" role={undefined} className="motion-reduce:animate-none" />}
        {status === "success" && <CheckCircleIcon aria-hidden="true" weight="fill" />}
        {status === "failed" && <XCircleIcon aria-hidden="true" weight="fill" />}
      </span>
      <div className="flex flex-col gap-1">
        <Heading className="text-lg font-semibold text-balance">{title}</Heading>
        {description && <p className="text-sm text-muted-foreground text-balance">{description}</p>}
      </div>
      {status === "failed" && reason && <p className="rounded-lg bg-muted px-3 py-2 text-sm">{reason}</p>}
      {actions && <div className="flex flex-wrap items-center justify-center gap-2 pt-1">{actions}</div>}
    </div>
  )
}

export { PaymentResult }
export type { PaymentResultProps, PaymentResultStatus }
