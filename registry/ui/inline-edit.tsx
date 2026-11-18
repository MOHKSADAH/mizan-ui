"use client"

import * as React from "react"
import { PencilSimpleIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { Input } from "@/registry/ui/input"

type InlineEditLabels = { edit: string; empty: string; saved: string; cancelled: string }

const inlineEditLabels: InlineEditLabels = {
  edit: "Edit",
  empty: "Not set",
  saved: "Saved",
  cancelled: "Changes discarded",
}

const inlineEditLabelsAr: InlineEditLabels = {
  edit: "تعديل",
  empty: "غير محدد",
  saved: "تم الحفظ",
  cancelled: "تم تجاهل التغييرات",
}

type InlineEditProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  labels?: Partial<InlineEditLabels>
  "aria-label"?: string
}

// Click or Enter starts editing. Enter or leaving the field saves, Escape discards.
function InlineEdit({
  value,
  defaultValue = "",
  onValueChange,
  placeholder,
  disabled,
  labels,
  className,
  "aria-label": ariaLabel,
  ...props
}: InlineEditProps) {
  const l = { ...inlineEditLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue)
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const [status, setStatus] = React.useState("")
  const button = React.useRef<HTMLButtonElement>(null)
  const input = React.useRef<HTMLInputElement>(null)
  const closing = React.useRef(false)
  const refocus = React.useRef(false)
  const text = value ?? inner

  React.useEffect(() => {
    if (editing) input.current?.select()
    else if (refocus.current) button.current?.focus()
    refocus.current = false
  }, [editing])

  const finish = (save: boolean, viaKeyboard: boolean) => {
    if (closing.current) return
    closing.current = true
    refocus.current = viaKeyboard
    if (save && draft !== text) {
      if (value === undefined) setInner(draft)
      onValueChange?.(draft)
      setStatus(l.saved)
    } else setStatus(save ? "" : l.cancelled)
    setEditing(false)
  }

  return (
    <div data-slot="inline-edit" className={cn("w-full", className)} {...props}>
      {editing ? (
        <Input
          ref={input}
          dir="auto"
          autoFocus
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return
            if (e.key === "Enter") {
              e.preventDefault()
              finish(true, true)
            } else if (e.key === "Escape") {
              e.preventDefault()
              finish(false, true)
            }
          }}
          onBlur={() => finish(true, false)}
        />
      ) : (
        <button
          ref={button}
          type="button"
          disabled={disabled}
          onClick={() => {
            closing.current = false
            setDraft(text)
            setStatus("")
            setEditing(true)
          }}
          className="-mx-1.5 inline-flex min-h-6 max-w-full items-center gap-1.5 rounded-md px-1.5 py-0.5 text-start text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
        >
          <bdi dir="auto" className={cn("truncate", !text && "text-muted-foreground")}>
            {text || placeholder || l.empty}
          </bdi>
          <PencilSimpleIcon aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="sr-only">
            {ariaLabel ? `${ariaLabel}: ` : ""}
            {l.edit}
          </span>
        </button>
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {status}
      </span>
    </div>
  )
}

export { InlineEdit, inlineEditLabels, inlineEditLabelsAr }
export type { InlineEditLabels, InlineEditProps }
