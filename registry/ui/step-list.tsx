import * as React from "react"

import { cn } from "@/registry/lib/utils"
import {
  RunStatusIcon,
  runStatusLabelsEn,
  type RunState,
  type RunStatusLabels,
} from "@/registry/ui/run-status"

type Step = {
  id: string
  title: React.ReactNode
  status: RunState
  // A short value at the end side, for example a count or a time.
  meta?: React.ReactNode
}

type StepListProps = Omit<React.ComponentProps<"ol">, "children"> & {
  steps: Step[]
  labels?: Partial<RunStatusLabels>
}

// A vertical checklist: one status icon per step, joined by a line. The status is also read as text.
function StepList({ steps, labels, className, ...props }: StepListProps) {
  const t = { ...runStatusLabelsEn, ...labels }
  return (
    <ol data-slot="step-list" className={cn("flex flex-col", className)} {...props}>
      {steps.map((step, index) => (
        <li key={step.id} data-slot="step-list-item" data-state={step.status} className="flex items-stretch gap-3">
          <span className="flex flex-col items-center pt-0.5">
            <RunStatusIcon state={step.status} className="[&_svg]:size-4" />
            {index < steps.length - 1 && <span aria-hidden="true" className="my-1 w-px flex-1 bg-border" />}
          </span>
          <div className="flex min-w-0 flex-1 items-start justify-between gap-3 pb-3 text-sm in-[li:last-child]:pb-0">
            <span
              className={cn(
                "min-w-0 text-start",
                (step.status === "running" || step.status === "needs-you") && "font-medium",
                step.status === "queued" && "text-muted-foreground"
              )}
            >
              <span className="sr-only">{`${t[step.status]}: `}</span>
              {step.title}
            </span>
            {step.meta !== undefined && (
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                <bdi dir="ltr">{step.meta}</bdi>
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

export { StepList }
export type { Step, StepListProps }
