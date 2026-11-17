"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

type CopyButtonLabels = {
  copy: string
  copied: string
  failed: string
}

const defaultLabels: CopyButtonLabels = {
  copy: "Copy",
  copied: "Copied",
  failed: "Copy failed. The text is selected: press Ctrl+C to copy it.",
}

const copyButtonLabelsAr: CopyButtonLabels = {
  copy: "نسخ",
  copied: "تم النسخ",
  failed: "تعذر النسخ. النص محدد: اضغط Ctrl+C لنسخه.",
}

type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "value"> & {
  value: string
  onCopy?: (value: string) => void
  // Milliseconds the "Copied" state stays.
  timeout?: number
  labels?: Partial<CopyButtonLabels>
}

function CopyButton({ value, onCopy, timeout = 2000, labels, children, className, ...props }: CopyButtonProps) {
  const l = { ...defaultLabels, ...labels }
  const [state, setState] = React.useState<"idle" | "copied" | "failed">("idle")
  const input = React.useRef<HTMLInputElement>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  React.useEffect(() => {
    if (state !== "failed") return
    input.current?.focus()
    input.current?.select()
  }, [state])

  async function copy() {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(value)
      setState("copied")
      onCopy?.(value)
      timer.current = setTimeout(() => setState("idle"), timeout)
    } catch {
      setState("failed")
    }
  }

  const Icon = state === "copied" ? CheckIcon : CopyIcon
  return (
    <span data-slot="copy-button" className="inline-flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" className={cn(className)} onClick={copy} {...props}>
        <Icon aria-hidden="true" data-icon="inline-start" />
        {children ?? (state === "copied" ? l.copied : l.copy)}
      </Button>
      {state === "failed" && (
        <Input
          ref={input}
          readOnly
          dir="ltr"
          value={value}
          aria-label={l.copy}
          className="w-48"
          onBlur={() => setState("idle")}
        />
      )}
      <span role="status" className="sr-only">
        {state === "copied" ? l.copied : state === "failed" ? l.failed : ""}
      </span>
    </span>
  )
}

export { CopyButton, copyButtonLabelsAr }
export type { CopyButtonLabels }
