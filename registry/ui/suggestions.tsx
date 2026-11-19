"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"

import { Button } from "@/registry/ui/button"

type Suggestion =
  | string
  | {
      label: string
      // The text sent to onSelect. It defaults to the label.
      prompt?: string
      icon?: React.ReactNode
    }

type SuggestionsLabels = { group: string }

const defaultLabels: SuggestionsLabels = { group: "Suggested prompts" }
const suggestionsLabelsAr: SuggestionsLabels = { group: "اقتراحات" }

type SuggestionsProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  suggestions: Suggestion[]
  // Put the text in the prompt input and focus it. A chip never sends by itself.
  onSelect?: (prompt: string) => void
  // "wrap" breaks into lines. "scroll" keeps one row that scrolls sideways.
  layout?: "wrap" | "scroll"
  labels?: Partial<SuggestionsLabels>
}

function Suggestions({
  suggestions,
  onSelect,
  layout = "wrap",
  labels,
  className,
  ...props
}: SuggestionsProps) {
  const t = { ...defaultLabels, ...labels }
  return (
    <div
      data-slot="suggestions"
      role="group"
      aria-label={t.group}
      className={cn(
        "flex min-w-0 gap-2",
        layout === "wrap"
          ? "flex-wrap"
          : "scroll-fade-x scrollbar-none overflow-x-auto py-1",
        className
      )}
      {...props}
    >
      {suggestions.map((item) => {
        const { label, prompt, icon } =
          typeof item === "string" ? { label: item, prompt: undefined, icon: undefined } : item
        return (
          <Button
            key={label}
            variant="outline"
            size="sm"
            className="h-auto min-h-7 rounded-full py-1 text-start whitespace-normal data-[layout=scroll]:shrink-0 data-[layout=scroll]:whitespace-nowrap"
            data-layout={layout}
            onClick={() => onSelect?.(prompt ?? label)}
          >
            {icon}
            <span dir="auto">{label}</span>
          </Button>
        )
      })}
    </div>
  )
}

export {
  Suggestions,
  suggestionsLabelsAr,
  type Suggestion,
  type SuggestionsLabels,
  type SuggestionsProps,
}
