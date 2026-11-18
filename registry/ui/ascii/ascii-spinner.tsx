"use client"

import { useEffect, useState } from "react"

import { SPINNER_FRAMES, type SpinnerVariant } from "@/registry/lib/ascii"
import { cn } from "@/registry/lib/utils"

type AsciiSpinnerProps = {
  variant?: SpinnerVariant
  intervalMs?: number
  label: string
  className?: string
}

export function AsciiSpinner({ variant = "braille", intervalMs = 80, label, className }: AsciiSpinnerProps) {
  const [tick, setTick] = useState(0)
  const frames = SPINNER_FRAMES[variant]

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setTick((t) => t + 1), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return (
    <span role="status" className={cn("inline-flex font-mono", className)}>
      <span aria-hidden="true" dir="ltr" className="whitespace-pre">
        {frames[tick % frames.length]}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  )
}
