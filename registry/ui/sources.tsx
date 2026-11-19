"use client"

import * as React from "react"
import { BookOpenTextIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { plural } from "@/registry/lib/format"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/registry/ui/trace"

type Source = {
  title: string
  url: string
  // The site name. It defaults to the host of the url.
  site?: string
  snippet?: string
}

type SourcesLabels = {
  used: (count: number) => string
  citation: (index: number, title: string) => string
}

const defaultLabels: SourcesLabels = {
  used: (count) =>
    plural(count, { one: "Used {n} source", other: "Used {n} sources" }, { lang: "en" }),
  citation: (index, title) => `Source ${index}: ${title}`,
}

const sourcesLabelsAr: SourcesLabels = {
  used: (count) =>
    plural(
      count,
      {
        one: "استند إلى مصدر واحد",
        two: "استند إلى مصدرين",
        few: "استند إلى {n} مصادر",
        many: "استند إلى {n} مصدرًا",
        other: "استند إلى {n} مصدر",
      },
      { lang: "ar" }
    ),
  citation: (index, title) => `المصدر ${index}: ${title}`,
}

function siteOf(source: Source) {
  if (source.site) return source.site
  try {
    return new URL(source.url).hostname.replace(/^www\./, "")
  } catch {
    return source.url
  }
}

function Index({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground tabular-nums">
      {children}
    </span>
  )
}

type SourcesProps = Omit<React.ComponentProps<"div">, "children"> & {
  sources: Source[]
  defaultOpen?: boolean
  labels?: Partial<SourcesLabels>
}

// A collapsed line ("Used 3 sources") that opens a numbered list of source cards.
function Sources({ sources, defaultOpen, labels, className, ...props }: SourcesProps) {
  const t = { ...defaultLabels, ...labels }
  return (
    <div data-slot="sources" className={cn("min-w-0", className)} {...props}>
      <TraceCollapsible defaultOpen={defaultOpen}>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <BookOpenTextIcon />
            </TraceIcon>
            <TraceTitle>{t.used(sources.length)}</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <ol className="flex flex-col gap-2">
            {sources.map((source, index) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-w-0 items-start gap-2.5 rounded-lg border bg-card p-2.5 text-start text-card-foreground transition-colors outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Index>{index + 1}</Index>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span dir="auto" className="truncate text-sm font-medium">
                      {source.title}
                    </span>
                    <bdi dir="ltr" className="truncate text-xs text-muted-foreground">
                      {siteOf(source)}
                    </bdi>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </div>
  )
}

type SourceCitationProps = {
  // The number shown in the text, starting at 1.
  index: number
  source: Source
  labels?: Partial<SourcesLabels>
  className?: string
}

// A small numbered chip inside a paragraph. Hover or focus shows the source in a card.
function SourceCitation({ index, source, labels, className }: SourceCitationProps) {
  const t = { ...defaultLabels, ...labels }
  return (
    <HoverCard>
      <HoverCardTrigger
        delay={150}
        render={
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            aria-label={t.citation(index, source.title)}
            className={cn(
              "mx-0.5 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-muted px-1 align-text-top text-xs leading-none font-medium text-foreground no-underline tabular-nums outline-none hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
              className
            )}
          />
        }
      >
        <bdi>{index}</bdi>
      </HoverCardTrigger>
      <HoverCardContent className="w-72" side="top">
        <div className="flex flex-col gap-1">
          <bdi dir="ltr" className="truncate text-xs text-muted-foreground">
            {siteOf(source)}
          </bdi>
          <p dir="auto" className="font-medium">
            {source.title}
          </p>
          {source.snippet && (
            <p dir="auto" className="line-clamp-3 text-muted-foreground">
              {source.snippet}
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export {
  Sources,
  SourceCitation,
  sourcesLabelsAr,
  type Source,
  type SourceCitationProps,
  type SourcesLabels,
  type SourcesProps,
}
