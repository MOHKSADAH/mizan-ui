"use client"

import * as React from "react"
import { BrainIcon, SpinnerIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { plural } from "@/registry/lib/format"

import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/ui/trace"

type ReasoningLabels = {
  thinking: string
  thought: string
  thoughtFor: (seconds: number) => string
}

const defaultLabels: ReasoningLabels = {
  thinking: "Thinking",
  thought: "Thought",
  thoughtFor: (seconds) =>
    plural(
      seconds,
      { one: "Thought for {n} second", other: "Thought for {n} seconds" },
      { lang: "en" }
    ),
}

const reasoningLabelsAr: ReasoningLabels = {
  thinking: "يفكّر",
  thought: "فكّر",
  thoughtFor: (seconds) =>
    plural(
      seconds,
      {
        one: "فكّر لمدة ثانية واحدة",
        two: "فكّر لمدة ثانيتين",
        few: "فكّر لمدة {n} ثوانٍ",
        many: "فكّر لمدة {n} ثانية",
        other: "فكّر لمدة {n} ثانية",
      },
      { lang: "ar" }
    ),
}

type ReasoningProps = Omit<
  React.ComponentProps<"div">,
  "children" | "onChange"
> & {
  // "running" opens the panel and shimmers the title. When it turns "done" the panel closes.
  status?: "running" | "done"
  // Seconds the model thought. Shown when the status is "done".
  duration?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  // A string is split at blank lines into paragraphs, each with dir="auto".
  children?: React.ReactNode
  labels?: Partial<ReasoningLabels>
}

function Reasoning({
  status = "done",
  duration,
  open,
  defaultOpen,
  onOpenChange,
  children,
  labels,
  className,
  ...props
}: ReasoningProps) {
  const t = { ...defaultLabels, ...labels }
  const running = status === "running"
  const [inner, setInner] = React.useState(defaultOpen ?? running)
  const previous = React.useRef(status)
  const isOpen = open ?? inner

  // Thinking is over: fold the panel away so the answer takes the focus.
  React.useEffect(() => {
    if (previous.current === "running" && status === "done") {
      setInner(false)
      onOpenChange?.(false)
    }
    previous.current = status
  }, [status, onOpenChange])

  return (
    <div data-slot="reasoning" className={cn("min-w-0", className)} {...props}>
      <TraceCollapsible
        open={isOpen}
        onOpenChange={(next) => {
          setInner(next)
          onOpenChange?.(next)
        }}
      >
        <TraceCollapsibleTrigger>
          <TraceLine status={running ? "running" : undefined}>
            <TraceIcon>
              {running ? (
                <SpinnerIcon className="animate-spin motion-reduce:animate-none" />
              ) : (
                <BrainIcon />
              )}
            </TraceIcon>
            <TraceTitle>
              {running
                ? t.thinking
                : duration === undefined
                  ? t.thought
                  : t.thoughtFor(duration)}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent className="flex flex-col gap-2">
          {typeof children === "string"
            ? children.split(/\n{2,}/).map((paragraph, index) => (
                <p key={index} dir="auto">
                  {paragraph}
                </p>
              ))
            : children}
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </div>
  )
}

export {
  Reasoning,
  reasoningLabelsAr,
  type ReasoningLabels,
  type ReasoningProps,
}
