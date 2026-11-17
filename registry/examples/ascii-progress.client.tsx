"use client"

import { useState } from "react"

import { AsciiProgress } from "@/registry/ui/ascii/ascii-progress"
import { Button } from "@/registry/ui/button"

type ProgressStepperProps = { label: string; advance: string; reset: string }

export function ProgressStepper({ label, advance, reset }: ProgressStepperProps) {
  const [value, setValue] = useState(25)

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-col gap-1 text-muted-foreground">
        <span className="text-sm">{label}</span>
        <AsciiProgress value={value} width={20} />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={value >= 100}
          onClick={() => setValue((v) => Math.min(v + 25, 100))}
        >
          {advance}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setValue(0)}>
          {reset}
        </Button>
      </div>
    </div>
  )
}
