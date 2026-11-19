"use client"

import * as React from "react"
import { CheckIcon, WarningIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Spinner } from "@/registry/ui/spinner"

type AsyncButtonState = "idle" | "pending" | "done" | "error"

type AsyncButtonLabels = {
  pending: string
  done: string
  error: string
}

const defaultLabels: AsyncButtonLabels = {
  pending: "Saving...",
  done: "Saved",
  error: "Failed. Retry",
}

const asyncButtonLabelsAr: AsyncButtonLabels = {
  pending: "جارٍ الحفظ...",
  done: "تم الحفظ",
  error: "تعذّر الحفظ. أعد المحاولة",
}

type AsyncButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "children" | "disabled"> & {
  // The idle label.
  children: React.ReactNode
  // Runs on click. A rejected promise shows the error state.
  onAction: () => Promise<unknown> | void
  // Milliseconds the done state stays before the label returns to idle.
  resetAfter?: number
  disabled?: boolean
  labels?: Partial<AsyncButtonLabels>
}

// All four labels share one grid cell, so the button keeps the width of the longest and never jumps.
function AsyncButton({
  children,
  onAction,
  resetAfter = 2000,
  disabled,
  labels,
  variant,
  className,
  ...props
}: AsyncButtonProps) {
  const t = { ...defaultLabels, ...labels }
  const [state, setState] = React.useState<AsyncButtonState>("idle")
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined)
  const alive = React.useRef(true)
  React.useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
      clearTimeout(timer.current)
    }
  }, [])

  async function run() {
    if (state === "pending") return
    clearTimeout(timer.current)
    setState("pending")
    try {
      await onAction()
      if (!alive.current) return
      setState("done")
      timer.current = setTimeout(() => setState("idle"), resetAfter)
    } catch {
      if (alive.current) setState("error")
    }
  }

  const content: Record<AsyncButtonState, React.ReactNode> = {
    idle: children,
    pending: (
      <>
        <Spinner aria-hidden="true" role="presentation" className="motion-reduce:animate-none" />
        {t.pending}
      </>
    ),
    done: (
      <>
        <CheckIcon aria-hidden="true" weight="bold" />
        {t.done}
      </>
    ),
    error: (
      <>
        <WarningIcon aria-hidden="true" />
        {t.error}
      </>
    ),
  }

  return (
    <span data-slot="async-button" data-state={state} className="inline-flex">
      <Button
        type="button"
        variant={state === "error" ? "destructive" : variant}
        disabled={disabled}
        aria-disabled={state === "pending" || undefined}
        className={cn("grid", className)}
        onClick={run}
        {...props}
      >
        {(Object.keys(content) as AsyncButtonState[]).map((key) => (
          <span
            key={key}
            aria-hidden={key !== state}
            className={cn("col-start-1 row-start-1 flex items-center justify-center gap-1.5", key !== state && "invisible")}
          >
            {content[key]}
          </span>
        ))}
      </Button>
      <span role="status" className="sr-only">
        {state === "idle" ? "" : t[state]}
      </span>
    </span>
  )
}

export { AsyncButton, asyncButtonLabelsAr }
export type { AsyncButtonLabels, AsyncButtonState }
