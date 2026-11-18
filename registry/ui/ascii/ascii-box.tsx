import type { ReactNode } from "react"

import { cn } from "@/registry/lib/utils"

const BOX_STYLES = {
  single: "border border-border",
  double: "border-[3px] border-double border-border",
  rounded: "rounded-md border border-border",
  heavy: "border-2 border-border",
  ascii: "border border-dashed border-border",
}

const DIVIDER_CHARS = { single: "─", double: "═", ascii: "-" }

type AsciiBoxProps = {
  variant?: keyof typeof BOX_STYLES
  title?: string
  children: ReactNode
  className?: string
}

export function AsciiBox({ variant = "single", title, children, className }: AsciiBoxProps) {
  const Root = title ? "fieldset" : "div"

  return (
    <Root className={cn("w-fit max-w-full min-w-0 px-[1ch] py-[0.5ch] font-mono", BOX_STYLES[variant], className)}>
      {title && <legend className="px-[1ch]">{title}</legend>}
      {children}
    </Root>
  )
}

type AsciiDividerProps = {
  variant?: keyof typeof DIVIDER_CHARS
  label?: string
  className?: string
}

export function AsciiDivider({ variant = "single", label, className }: AsciiDividerProps) {
  const line = (
    <span aria-hidden="true" className="min-w-0 flex-1 overflow-hidden whitespace-nowrap">
      {DIVIDER_CHARS[variant].repeat(300)}
    </span>
  )

  return (
    <div
      role="separator"
      aria-label={label}
      className={cn("flex items-center gap-[1ch] font-mono text-muted-foreground", className)}
    >
      {line}
      {label && (
        <>
          <span>{label}</span>
          {line}
        </>
      )}
    </div>
  )
}
