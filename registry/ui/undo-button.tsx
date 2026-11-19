"use client"

import * as React from "react"
import { ArrowCounterClockwiseIcon, CheckIcon, TrashIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { formatNumber, plural, type Digits, type Lang, type PluralForms } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"

type UndoButtonLabels = {
  // The armed label. {n} is the seconds left.
  undo: string
  // Spoken when the countdown starts. {n} is the seconds.
  counting: PluralForms
  done: string
  cancelled: string
}

const defaultLabels: UndoButtonLabels = {
  undo: "Undo ({n})",
  counting: {
    one: "Deleting in {n} second. Press to undo.",
    other: "Deleting in {n} seconds. Press to undo.",
  },
  done: "Deleted",
  cancelled: "Deletion cancelled",
}

const undoButtonLabelsAr: UndoButtonLabels = {
  undo: "تراجع ({n})",
  counting: {
    zero: "سيتم الحذف الآن. اضغط للتراجع.",
    one: "سيتم الحذف بعد ثانية. اضغط للتراجع.",
    two: "سيتم الحذف بعد ثانيتين. اضغط للتراجع.",
    few: "سيتم الحذف بعد {n} ثوان. اضغط للتراجع.",
    many: "سيتم الحذف بعد {n} ثانية. اضغط للتراجع.",
    other: "سيتم الحذف بعد {n} ثانية. اضغط للتراجع.",
  },
  done: "تم الحذف",
  cancelled: "أُلغي الحذف",
}

type UndoButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "children" | "variant"> & {
  // The idle label, such as "Delete account".
  children: React.ReactNode
  // Runs when the countdown reaches 0.
  onConfirm: () => void
  onUndo?: () => void
  // Seconds the action waits before it runs.
  seconds?: number
  lang?: Lang
  digits?: Digits
  labels?: Partial<UndoButtonLabels>
}

function UndoButton({
  children,
  onConfirm,
  onUndo,
  seconds = 5,
  lang = "en",
  digits,
  labels,
  disabled,
  className,
  ...props
}: UndoButtonProps) {
  const t = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const [state, setState] = React.useState<"idle" | "counting" | "done" | "cancelled">("idle")
  const [left, setLeft] = React.useState(seconds)
  const bar = React.useRef<HTMLSpanElement>(null)
  const confirm = React.useEffectEvent(onConfirm)

  React.useEffect(() => {
    if (state !== "counting") return
    const tick = setInterval(() => setLeft((n) => Math.max(n - 1, 0)), 1000)
    const fire = setTimeout(() => {
      setState("done")
      confirm()
    }, seconds * 1000)
    // The bar only repeats the number: it stays hidden under reduced motion.
    const run = bar.current?.animate([{ width: "100%" }, { width: "0%" }], {
      duration: seconds * 1000,
      easing: "linear",
      fill: "forwards",
    })
    return () => {
      clearInterval(tick)
      clearTimeout(fire)
      run?.cancel()
    }
  }, [state, seconds])

  function arm() {
    setLeft(seconds)
    setState("counting")
  }

  function undo() {
    setState("cancelled")
    onUndo?.()
  }

  const counting = state === "counting"
  const done = state === "done"
  const stages: { key: string; node: React.ReactNode }[] = [
    {
      key: "idle",
      node: (
        <>
          <TrashIcon aria-hidden="true" />
          {children}
        </>
      ),
    },
    {
      key: "counting",
      node: (
        <>
          <ArrowCounterClockwiseIcon aria-hidden="true" className="rtl:-scale-x-100" />
          <bdi className="tabular-nums">{t.undo.replace("{n}", formatNumber(left, locale))}</bdi>
        </>
      ),
    },
    {
      key: "done",
      node: (
        <>
          <CheckIcon aria-hidden="true" weight="bold" />
          {t.done}
        </>
      ),
    },
  ]
  const shown = done ? "done" : counting ? "counting" : "idle"

  return (
    <span data-slot="undo-button" data-state={state} className="inline-flex">
      <Button
        type="button"
        variant={counting || done ? "outline" : "destructive"}
        disabled={done || disabled}
        onClick={counting ? undo : arm}
        onKeyDown={(event) => {
          if (counting && event.key === "Escape") undo()
        }}
        className={cn("relative grid overflow-hidden", counting && "border-destructive/40 text-destructive hover:text-destructive", className)}
        {...props}
      >
        {stages.map((stage) => (
          <span
            key={stage.key}
            aria-hidden={stage.key !== shown}
            className={cn("col-start-1 row-start-1 flex items-center justify-center gap-1.5", stage.key !== shown && "invisible")}
          >
            {stage.node}
          </span>
        ))}
        {counting && (
          <span
            ref={bar}
            aria-hidden="true"
            className="absolute start-0 bottom-0 h-0.5 w-full bg-destructive motion-reduce:hidden"
          />
        )}
      </Button>
      <span role="status" className="sr-only">
        {counting
          ? plural(seconds, t.counting, locale)
          : done
            ? t.done
            : state === "cancelled"
              ? t.cancelled
              : ""}
      </span>
    </span>
  )
}

export { UndoButton, undoButtonLabelsAr }
export type { UndoButtonLabels }
