"use client"

import * as React from "react"
import { WarningCircleIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { normalizeArabic } from "@/registry/lib/gulf/arabic-normalize"
import { isSaudiIdFormat } from "@/registry/lib/gulf/validators"
import { Input } from "@/registry/ui/input"

type SaudiIdInputLabels = {
  invalid: string
  citizen: string
  resident: string
}

const saudiIdInputLabels: SaudiIdInputLabels = {
  invalid: "Enter a valid 10-digit national ID or Iqama number.",
  citizen: "Starts with 1: Saudi national ID.",
  resident: "Starts with 2: resident Iqama.",
}

const saudiIdInputLabelsAr: SaudiIdInputLabels = {
  invalid: "أدخل رقم هوية وطنية أو إقامة صحيحاً من 10 أرقام.",
  citizen: "يبدأ بالرقم 1: هوية وطنية.",
  resident: "يبدأ بالرقم 2: إقامة.",
}

type SaudiIdInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "defaultValue" | "onChange" | "type"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (digits: string, valid: boolean) => void
  showHint?: boolean
  labels?: Partial<SaudiIdInputLabels>
}

// Accepts Arabic-Indic digits and stores Latin digits. A passing value is well-formed, not proof the ID exists.
function SaudiIdInput({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  showHint,
  labels,
  className,
  id,
  onBlur,
  ...props
}: SaudiIdInputProps) {
  const text = { ...saudiIdInputLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue)
  const [touched, setTouched] = React.useState(false)
  const value = valueProp ?? inner
  const autoId = React.useId()
  const messageId = `${id ?? autoId}-message`
  const invalid = touched && value !== "" && !isSaudiIdFormat(value)
  const hint = showHint && !invalid ? { 1: text.citizen, 2: text.resident }[value[0] as "1" | "2"] : undefined

  return (
    <div data-slot="saudi-id-input" className={cn("flex w-full flex-col gap-1.5", className)}>
      <Input
        id={id}
        dir="ltr"
        inputMode="numeric"
        autoComplete="off"
        maxLength={20}
        value={value}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid || hint ? messageId : undefined}
        className="tracking-wider tabular-nums rtl:text-end"
        onChange={(e) => {
          const digits = normalizeArabic(e.target.value).replace(/\D/g, "").slice(0, 10)
          setInner(digits)
          onValueChange?.(digits, isSaudiIdFormat(digits))
        }}
        onBlur={(e) => {
          setTouched(true)
          onBlur?.(e)
        }}
        {...props}
      />
      <p
        id={messageId}
        aria-live="polite"
        className={cn("flex items-center gap-1.5 text-sm", invalid ? "text-destructive" : "text-muted-foreground")}
      >
        {invalid && <WarningCircleIcon weight="fill" aria-hidden="true" className="size-4 shrink-0" />}
        {invalid ? text.invalid : hint}
      </p>
    </div>
  )
}

export { SaudiIdInput, saudiIdInputLabels, saudiIdInputLabelsAr }
export type { SaudiIdInputLabels, SaudiIdInputProps }
