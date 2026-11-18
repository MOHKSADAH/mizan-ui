"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { normalizeArabic } from "@/registry/lib/gulf/arabic-normalize"
import { caretAfter } from "@/registry/lib/gulf/caret"
import { isSaudiIbanFormat } from "@/registry/lib/gulf/validators"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/ui/input-group"

type GroupedInputLabels = {
  invalid: string
  copy: string
  copied: string
}

type GroupedInputProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "defaultValue" | "onChange" | "type" | "maxLength"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (raw: string, valid: boolean) => void
  clean: (text: string) => string
  validate: (raw: string) => boolean
  labels: GroupedInputLabels
}

const group = (raw: string) => raw.replace(/(.{4})(?=.)/g, "$1 ")

// Shared base of IbanInput and VatInput: the value is stored without spaces and shown in groups of 4, always LTR.
function GroupedInput({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  clean,
  validate,
  labels,
  className,
  id,
  onBlur,
  ...props
}: GroupedInputProps) {
  const [inner, setInner] = React.useState(defaultValue)
  const [touched, setTouched] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const value = valueProp ?? inner
  const autoId = React.useId()
  const messageId = `${id ?? autoId}-message`
  const invalid = touched && value !== "" && !validate(value)
  const caret = React.useRef<{ input: HTMLInputElement; at: number } | null>(null)

  React.useLayoutEffect(() => {
    caret.current?.input.setSelectionRange(caret.current.at, caret.current.at)
    caret.current = null
  })

  React.useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <div data-slot="grouped-input" className={cn("flex w-full flex-col gap-1.5", className)}>
      <InputGroup>
        <InputGroupInput
          id={id}
          dir="ltr"
          autoComplete="off"
          spellCheck={false}
          value={group(value)}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? messageId : undefined}
          className="tabular-nums rtl:text-end"
          onChange={(e) => {
            const next = clean(e.target.value)
            const input = e.target
            if (next !== value) caret.current = { input, at: caretAfter(clean, input.value, input.selectionStart ?? 0, group(next)) }
            setInner(next)
            onValueChange?.(next, validate(next))
          }}
          onBlur={(e) => {
            setTouched(true)
            onBlur?.(e)
          }}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={labels.copy}
            disabled={value === ""}
            onClick={() => {
              navigator.clipboard?.writeText(value).then(() => setCopied(true), () => {})
            }}
          >
            {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <span role="status" className="sr-only">
        {copied ? labels.copied : ""}
      </span>
      <p id={messageId} aria-live="polite" className="flex items-center gap-1.5 text-sm text-destructive empty:hidden">
        {invalid && (
          <>
            <WarningCircleIcon weight="fill" aria-hidden="true" className="size-4 shrink-0" />
            {labels.invalid}
          </>
        )}
      </p>
    </div>
  )
}

type IbanInputLabels = GroupedInputLabels

const ibanInputLabels: IbanInputLabels = {
  invalid: "Enter a valid Saudi IBAN: SA followed by 22 digits.",
  copy: "Copy IBAN",
  copied: "IBAN copied",
}

const ibanInputLabelsAr: IbanInputLabels = {
  invalid: "أدخل رقم آيبان سعودياً صحيحاً: SA يليها 22 رقماً.",
  copy: "نسخ الآيبان",
  copied: "تم نسخ الآيبان",
}

type IbanInputProps = Omit<GroupedInputProps, "clean" | "validate" | "labels"> & {
  labels?: Partial<IbanInputLabels>
}

// A passing value has a valid format and mod-97 check. It does not prove the account exists.
function IbanInput({ labels, ...props }: IbanInputProps) {
  return (
    <GroupedInput
      clean={(text) => normalizeArabic(text).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24)}
      validate={isSaudiIbanFormat}
      labels={{ ...ibanInputLabels, ...labels }}
      {...props}
    />
  )
}

export { IbanInput, GroupedInput, ibanInputLabels, ibanInputLabelsAr }
export type { IbanInputLabels, IbanInputProps, GroupedInputLabels, GroupedInputProps }
