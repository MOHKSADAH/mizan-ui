"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import {
  MASK_PRESETS,
  applyMask,
  backspaceOverLiteral,
  caretAfter,
  slotsBefore,
  type MaskPreset,
} from "@/registry/lib/mask"
import { Input } from "@/registry/ui/input"

type InputMaskProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue" | "onChange" | "type"> & {
  preset?: MaskPreset
  mask?: string
  value?: string
  defaultValue?: string
  onValueChange?: (raw: string, formatted: string) => void
}

// Digits, IBANs and phone numbers read left to right, so the field is an LTR island in Arabic pages.
function InputMask({
  preset,
  mask,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: InputMaskProps) {
  const pattern = mask ?? MASK_PRESETS[preset ?? "phone"]
  const [inner, setInner] = React.useState(() => applyMask(defaultValue ?? "", pattern).formatted)
  const text = value === undefined ? inner : applyMask(value, pattern).formatted

  return (
    <Input
      {...props}
      type="text"
      dir="ltr"
      inputMode={/[AaX*]/.test(pattern) ? "text" : "numeric"}
      data-slot="input-mask"
      className={cn("text-start tabular-nums", className)}
      value={text}
      onChange={(e) => {
        const el = e.currentTarget
        const at = el.selectionStart ?? el.value.length
        const deleting = (e.nativeEvent as InputEvent).inputType === "deleteContentBackward"
        const back = deleting ? backspaceOverLiteral(el.value, at, pattern, text) : null
        const next = back ?? applyMask(el.value, pattern)
        const caret = back ? back.caret : caretAfter(pattern, next.formatted, slotsBefore(el.value, at, pattern))
        // Writing the value here keeps React from resetting it, which would move the caret to the end when nothing changed.
        el.value = next.formatted
        el.setSelectionRange(caret, caret)
        if (value === undefined) setInner(next.formatted)
        onValueChange?.(next.raw, next.formatted)
      }}
    />
  )
}

export { InputMask }
export type { InputMaskProps }
