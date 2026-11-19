"use client"

import * as React from "react"
import {
  CheckCircleIcon,
  SpinnerIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"

import { Badge } from "@/registry/ui/badge"
import { CodeBlock, CodeBlockContent } from "@/registry/ui/code-block"
import { CollapsibleContent } from "@/registry/ui/collapsible"
import {
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/ui/trace"

type ToolCallState = "input-streaming" | "running" | "done" | "error"

type ToolCallLabels = {
  states: Record<ToolCallState, string>
  input: string
  output: string
  error: string
}

const defaultLabels: ToolCallLabels = {
  states: {
    "input-streaming": "Preparing",
    running: "Running",
    done: "Done",
    error: "Failed",
  },
  input: "Input",
  output: "Output",
  error: "Error",
}

const toolCallLabelsAr: ToolCallLabels = {
  states: {
    "input-streaming": "يجهّز المدخلات",
    running: "قيد التنفيذ",
    done: "اكتمل",
    error: "فشل",
  },
  input: "المدخلات",
  output: "المخرجات",
  error: "الخطأ",
}

type ToolCallProps = Omit<React.ComponentProps<"div">, "children"> & {
  // The tool id, for example get_sales_report. It is code, so it stays left to right.
  name: string
  state?: ToolCallState
  // Objects print as indented JSON. While the input streams, pass the partial text.
  input?: unknown
  output?: unknown
  errorText?: string
  defaultOpen?: boolean
  labels?: Partial<ToolCallLabels>
}

const print = (value: unknown) =>
  typeof value === "string" ? value : JSON.stringify(value, null, 2)

function Part({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      {children}
    </div>
  )
}

function ToolCall({
  name,
  state = "done",
  input,
  output,
  errorText,
  defaultOpen,
  labels,
  className,
  ...props
}: ToolCallProps) {
  const t = {
    ...defaultLabels,
    ...labels,
    states: { ...defaultLabels.states, ...labels?.states },
  }
  const busy = state === "input-streaming" || state === "running"
  const hasBody = input !== undefined || output !== undefined || !!errorText

  return (
    <div
      data-slot="tool-call"
      data-state={state}
      className={cn(
        "min-w-0 rounded-xl border bg-card text-card-foreground data-[state=error]:border-destructive/30",
        className
      )}
      {...props}
    >
      <TraceCollapsible defaultOpen={defaultOpen}>
        <TraceCollapsibleTrigger className="w-full px-3 py-2">
          <TraceLine
            status={busy ? "running" : state === "error" ? "error" : undefined}
            className="w-full flex-1"
          >
            <TraceIcon>
              {busy ? (
                <SpinnerIcon className="animate-spin motion-reduce:animate-none" />
              ) : state === "error" ? (
                <WarningCircleIcon />
              ) : (
                <CheckCircleIcon />
              )}
            </TraceIcon>
            <TraceTitle dir="ltr" className="font-mono text-xs">
              {name}
            </TraceTitle>
            <Badge
              variant={state === "error" ? "destructive" : "secondary"}
              className="ms-auto"
            >
              {t.states[state]}
            </Badge>
          </TraceLine>
        </TraceCollapsibleTrigger>
        {hasBody && (
          <CollapsibleContent>
            <div className="flex flex-col gap-3 border-t p-3">
              {input !== undefined && (
                <Part title={t.input}>
                  <CodeBlock size="sm">
                    <CodeBlockContent>{print(input)}</CodeBlockContent>
                  </CodeBlock>
                </Part>
              )}
              {errorText ? (
                <Part title={t.error}>
                  <CodeBlock size="sm" variant="destructive">
                    <CodeBlockContent wrap>{errorText}</CodeBlockContent>
                  </CodeBlock>
                </Part>
              ) : (
                output !== undefined && (
                  <Part title={t.output}>
                    <CodeBlock size="sm">
                      <CodeBlockContent>{print(output)}</CodeBlockContent>
                    </CodeBlock>
                  </Part>
                )
              )}
            </div>
          </CollapsibleContent>
        )}
      </TraceCollapsible>
    </div>
  )
}

export {
  ToolCall,
  toolCallLabelsAr,
  type ToolCallLabels,
  type ToolCallProps,
  type ToolCallState,
}
