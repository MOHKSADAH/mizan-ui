import * as React from "react"
import {
  BellRingingIcon,
  CheckCircleIcon,
  CircleDashedIcon,
  ClockIcon,
  SpinnerGapIcon,
  XCircleIcon,
} from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"

type RunState = "running" | "done" | "idle" | "needs-you" | "failed" | "queued"

type RunStatusLabels = Record<RunState, string>

const defaultLabels: RunStatusLabels = {
  running: "Running",
  done: "Done",
  idle: "Idle",
  "needs-you": "Needs you",
  failed: "Failed",
  queued: "Queued",
}

const runStatusLabelsAr: RunStatusLabels = {
  running: "قيد التشغيل",
  done: "اكتمل",
  idle: "خامل",
  "needs-you": "يحتاج إليك",
  failed: "فشل",
  queued: "في الانتظار",
}

const iconClass = "size-3.5 shrink-0"

// Only "needs you" asks for attention, so it is the only solid pill. The rest keep a calm pill and tint the icon.
const icons: Record<RunState, React.ReactNode> = {
  running: (
    <SpinnerGapIcon
      weight="bold"
      className={cn(iconClass, "text-info motion-safe:animate-spin motion-safe:rtl:[animation-direction:reverse]")}
    />
  ),
  done: <CheckCircleIcon weight="fill" className={cn(iconClass, "text-success")} />,
  idle: <CircleDashedIcon weight="bold" className={cn(iconClass, "text-muted-foreground")} />,
  "needs-you": <BellRingingIcon weight="fill" className={iconClass} />,
  failed: <XCircleIcon weight="fill" className={iconClass} />,
  queued: <ClockIcon weight="bold" className={cn(iconClass, "text-muted-foreground")} />,
}

function RunStatusIcon({ state, className, ...props }: Omit<React.ComponentProps<"span">, "children"> & { state: RunState }) {
  return (
    <span
      data-slot="run-status-icon"
      data-state={state}
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        state === "needs-you" && "text-warning",
        state === "failed" && "text-destructive",
        className
      )}
      {...props}
    >
      {icons[state]}
    </span>
  )
}

type RunStatusProps = Omit<React.ComponentProps<typeof Badge>, "children" | "variant"> & {
  state: RunState
  labels?: Partial<RunStatusLabels>
}

function RunStatus({ state, labels, className, ...props }: RunStatusProps) {
  const t = { ...defaultLabels, ...labels }
  return (
    <Badge
      data-slot="run-status"
      data-state={state}
      variant={state === "failed" ? "destructive" : "secondary"}
      className={cn(state === "needs-you" && "bg-warning text-warning-foreground", className)}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex">
        {icons[state]}
      </span>
      {t[state]}
    </Badge>
  )
}

export { RunStatus, RunStatusIcon, runStatusLabelsAr, defaultLabels as runStatusLabelsEn }
export type { RunState, RunStatusLabels }
