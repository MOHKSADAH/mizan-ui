"use client"

import * as React from "react"
import { CheckCircleIcon, TagIcon, WarningCircleIcon, XIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"

type CouponStatus = "idle" | "pending" | "success" | "error"

type CouponInputLabels = {
  input: string
  apply: string
  remove: (code: string) => string
  pending: string
  success: string
  error: string
}

const defaultLabels: CouponInputLabels = {
  input: "Coupon code",
  apply: "Apply",
  remove: (code) => `Remove coupon ${code}`,
  pending: "Checking the code",
  success: "Coupon applied",
  error: "This code is not valid",
}

const couponInputLabelsAr: CouponInputLabels = {
  input: "رمز القسيمة",
  apply: "تطبيق",
  remove: (code) => `إزالة القسيمة ${code}`,
  pending: "جارٍ التحقق من الرمز",
  success: "تم تطبيق القسيمة",
  error: "هذا الرمز غير صالح",
}

type CouponInputProps = Omit<React.ComponentProps<"form">, "onSubmit" | "children"> & {
  status?: CouponStatus
  // The code the cart has accepted. While set, the input is replaced by a chip.
  appliedCode?: string
  // Replaces the default status text, for example "This code expired on 1 December".
  message?: string
  onApply: (code: string) => void
  onRemove: () => void
  labels?: Partial<CouponInputLabels>
}

function CouponInput({
  status = "idle",
  appliedCode,
  message,
  onApply,
  onRemove,
  labels,
  className,
  ...props
}: CouponInputProps) {
  const t = { ...defaultLabels, ...labels }
  const messageId = React.useId()
  const [code, setCode] = React.useState("")
  const pending = status === "pending"
  const text = message ?? (status === "pending" ? t.pending : status === "success" ? t.success : status === "error" ? t.error : "")

  return (
    <form
      data-slot="coupon-input"
      className={cn("flex flex-col gap-2", className)}
      onSubmit={(event) => {
        event.preventDefault()
        const trimmed = code.trim()
        if (trimmed && !pending) onApply(trimmed)
      }}
      {...props}
    >
      {appliedCode ? (
        <span className="inline-flex h-8 w-fit items-center gap-1.5 rounded-full border border-border bg-secondary ps-3 pe-1 text-sm font-medium text-secondary-foreground">
          <TagIcon aria-hidden="true" className="size-4 rtl:-scale-x-100" />
          <bdi dir="ltr">{appliedCode}</bdi>
          <button
            type="button"
            aria-label={t.remove(appliedCode)}
            onClick={onRemove}
            className="inline-flex size-6 items-center justify-center rounded-full outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <XIcon aria-hidden="true" weight="bold" className="size-3" />
          </button>
        </span>
      ) : (
        <div className="flex gap-2">
          <Input
            dir="ltr"
            autoComplete="off"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            aria-label={t.input}
            placeholder={t.input}
            aria-invalid={status === "error" || undefined}
            aria-describedby={messageId}
            aria-busy={pending || undefined}
            readOnly={pending}
            className="flex-1 text-start"
          />
          <Button type="submit" variant="outline" disabled={pending || !code.trim()}>
            {pending && <Spinner aria-hidden="true" role="none" className="motion-reduce:animate-none" />}
            {t.apply}
          </Button>
        </div>
      )}
      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={cn(
          "flex min-h-5 items-center gap-1.5 text-sm",
          status === "error" ? "text-destructive" : status === "success" ? "text-success" : "text-muted-foreground"
        )}
      >
        {text && status === "success" && <CheckCircleIcon aria-hidden="true" weight="fill" className="size-4 shrink-0" />}
        {text && status === "error" && <WarningCircleIcon aria-hidden="true" weight="fill" className="size-4 shrink-0" />}
        {text}
      </p>
    </form>
  )
}

export { CouponInput, couponInputLabelsAr }
export type { CouponInputLabels, CouponStatus }
