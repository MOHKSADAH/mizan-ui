"use client"

import * as React from "react"
import { CaretDoubleRightIcon, CheckIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"

type SlideToConfirmLabels = {
  // Text on the track. It also names the handle for screen readers.
  track: string
  // Read after the handle's name: how to confirm without a pointer.
  hint: string
  pending: string
  done: string
  // Text of the plain button shown with `fallbackButton`.
  button: string
}

const defaultLabels: SlideToConfirmLabels = {
  track: "Slide to confirm",
  hint: "Drag the handle to the end, or press Enter or Space.",
  pending: "Confirming",
  done: "Confirmed",
  button: "Confirm",
}

const slideToConfirmLabelsAr: SlideToConfirmLabels = {
  track: "اسحب للتأكيد",
  hint: "اسحب المقبض إلى النهاية، أو اضغط Enter أو Space.",
  pending: "جارٍ التأكيد",
  done: "تم التأكيد",
  button: "تأكيد",
}

// Share of the travel covered by one arrow key press.
const KEY_STEP = 0.25

// Handle position as a share of the travel. `rtl` flips the drag direction: confirm is always toward the inline end.
function slideProgress(dx: number, travel: number, rtl: boolean) {
  if (travel <= 0) return 0
  return Math.min(1, Math.max(0, (rtl ? -dx : dx) / travel))
}

type SlideToConfirmProps = Omit<React.ComponentProps<"div">, "children"> & {
  // A returned promise keeps the control pending until it settles. A rejection resets the handle.
  onConfirm?: () => void | Promise<unknown>
  // Share of the travel the handle must pass before release confirms.
  threshold?: number
  disabled?: boolean
  // Also show a plain button, for people who cannot drag.
  fallbackButton?: boolean
  labels?: Partial<SlideToConfirmLabels>
}

// Drag the handle to the inline end. Enter or Space on the focused handle confirms, the arrow keys move it.
// A pointer tap without a drag does nothing, so the control still guards against accidental taps.
function SlideToConfirm({
  onConfirm,
  threshold = 0.9,
  disabled,
  fallbackButton,
  labels,
  className,
  ...props
}: SlideToConfirmProps) {
  const t = { ...defaultLabels, ...labels }
  const hintId = React.useId()
  const rail = React.useRef<HTMLDivElement>(null)
  const handle = React.useRef<HTMLButtonElement>(null)
  const drag = React.useRef<{ startX: number; travel: number; rtl: boolean } | null>(null)
  const [progress, setProgress] = React.useState(0)
  const [dragging, setDragging] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "pending" | "done">("idle")
  const locked = disabled || status !== "idle"

  async function confirm() {
    if (locked) return
    setProgress(1)
    setStatus("pending")
    try {
      await onConfirm?.()
      setStatus("done")
    } catch {
      setProgress(0)
      setStatus("idle")
    }
  }

  const isRtl = () => (rail.current ? getComputedStyle(rail.current).direction === "rtl" : false)
  const travel = () => (rail.current && handle.current ? rail.current.clientWidth - handle.current.offsetWidth : 0)

  function onKeyDown(event: React.KeyboardEvent) {
    if (locked) return
    const toward = isRtl() ? "ArrowLeft" : "ArrowRight"
    const away = isRtl() ? "ArrowRight" : "ArrowLeft"
    if (event.key === toward) {
      const next = progress + KEY_STEP
      if (next >= 1) void confirm()
      else setProgress(next)
    } else if (event.key === away) setProgress(Math.max(0, progress - KEY_STEP))
    else if (event.key === "Home") setProgress(0)
    else if (event.key === "End") void confirm()
    else return
    event.preventDefault()
  }

  const done = status === "done"
  const ease = !dragging && "motion-safe:transition-[inset-inline-start,width] motion-safe:duration-200"
  return (
    <div data-slot="slide-to-confirm" data-status={status} className={cn("flex flex-col gap-2", className)} {...props}>
      <div
        className={cn(
          "relative flex h-12 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium ring-1 ring-border ring-inset select-none",
          disabled && "opacity-50"
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none truncate px-12 text-muted-foreground"
          style={{ opacity: done ? 1 : 1 - Math.min(1, progress * 1.6) }}
        >
          {done ? t.done : t.track}
        </span>
        <div ref={rail} className="absolute inset-1">
          <div
            aria-hidden="true"
            className={cn("absolute inset-y-0 start-0 rounded-full bg-primary/15", ease)}
            style={{ width: `calc(2.5rem + (100% - 2.5rem) * ${progress})` }}
          />
          <button
            ref={handle}
            type="button"
            aria-label={t.track}
            aria-describedby={hintId}
            aria-disabled={locked || undefined}
            aria-busy={status === "pending" || undefined}
            onKeyDown={onKeyDown}
            onClick={(event) => {
              // detail is 0 for Enter, Space and assistive technology; a pointer tap has detail >= 1.
              if (event.detail === 0) void confirm()
            }}
            onPointerDown={(event) => {
              if (locked) return
              event.currentTarget.setPointerCapture(event.pointerId)
              drag.current = { startX: event.clientX, travel: travel(), rtl: isRtl() }
              setDragging(true)
            }}
            onPointerMove={(event) => {
              const d = drag.current
              if (d) setProgress(slideProgress(event.clientX - d.startX, d.travel, d.rtl))
            }}
            onPointerUp={() => {
              if (!drag.current) return
              drag.current = null
              setDragging(false)
              if (progress >= threshold) void confirm()
              else setProgress(0)
            }}
            onPointerCancel={() => {
              drag.current = null
              setDragging(false)
              setProgress(0)
            }}
            className={cn(
              "absolute inset-y-0 grid size-10 touch-none place-items-center rounded-full bg-primary text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:cursor-default",
              !locked && "cursor-grab active:cursor-grabbing",
              ease
            )}
            style={{ insetInlineStart: `calc((100% - 2.5rem) * ${progress})` }}
          >
            {done ? (
              <CheckIcon aria-hidden="true" weight="bold" className="size-5" />
            ) : (
              <CaretDoubleRightIcon aria-hidden="true" weight="bold" className="size-5 rtl:rotate-180" />
            )}
          </button>
        </div>
      </div>
      <span id={hintId} className="sr-only">
        {t.hint}
      </span>
      <span role="status" className="sr-only">
        {status === "pending" ? t.pending : done ? t.done : ""}
      </span>
      {fallbackButton && (
        <Button type="button" variant="outline" disabled={locked} onClick={() => void confirm()}>
          {t.button}
        </Button>
      )}
    </div>
  )
}

export { SlideToConfirm, slideToConfirmLabelsAr, slideProgress }
export type { SlideToConfirmLabels, SlideToConfirmProps }
