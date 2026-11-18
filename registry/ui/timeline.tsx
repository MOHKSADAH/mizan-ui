"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import { formatDate, type Digits, type Lang } from "@/registry/lib/format"

type TimelineStatus = "success" | "warning" | "info" | "muted"

type TimelineLabels = Record<TimelineStatus, string>

// Read before each item, so the status is not carried by the dot color alone.
const defaultLabels: TimelineLabels = {
  success: "Completed",
  warning: "Needs attention",
  info: "In progress",
  muted: "Pending",
}

const timelineLabelsAr: TimelineLabels = {
  success: "مكتمل",
  warning: "يحتاج انتباها",
  info: "قيد التنفيذ",
  muted: "قيد الانتظار",
}

const dot: Record<TimelineStatus, string> = {
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
  muted: "bg-muted-foreground",
}

const TimelineContext = React.createContext<{
  lang: Lang
  digits: Digits
  dateOptions?: Intl.DateTimeFormatOptions
  labels: TimelineLabels
}>({ lang: "en", digits: "latn", labels: defaultLabels })

type TimelineProps = React.ComponentProps<"ol"> & {
  orientation?: "vertical" | "horizontal"
  lang?: Lang
  digits?: Digits
  dateOptions?: Intl.DateTimeFormatOptions
  labels?: Partial<TimelineLabels>
}

function Timeline({
  orientation = "vertical",
  lang = "en",
  digits = "latn",
  dateOptions,
  labels,
  className,
  ...props
}: TimelineProps) {
  const value = React.useMemo(
    () => ({ lang, digits, dateOptions, labels: { ...defaultLabels, ...labels } }),
    [lang, digits, dateOptions, labels]
  )
  return (
    <TimelineContext.Provider value={value}>
      <ol
        data-slot="timeline"
        data-orientation={orientation}
        className={cn("group/timeline flex flex-col data-[orientation=horizontal]:flex-row", className)}
        {...props}
      />
    </TimelineContext.Provider>
  )
}

type TimelineItemProps = Omit<React.ComponentProps<"li">, "title"> & {
  title: React.ReactNode
  date?: Date
  status?: TimelineStatus
}

function TimelineItem({ title, date, status = "muted", children, className, ...props }: TimelineItemProps) {
  const { lang, digits, dateOptions, labels } = React.useContext(TimelineContext)
  return (
    <li
      data-slot="timeline-item"
      data-status={status}
      className={cn(
        "group/item flex gap-3 pb-6 last:pb-0 group-data-[orientation=horizontal]/timeline:flex-1 group-data-[orientation=horizontal]/timeline:flex-col group-data-[orientation=horizontal]/timeline:pb-0",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center group-data-[orientation=horizontal]/timeline:flex-row">
        <span aria-hidden="true" className={cn("mt-1 size-3 shrink-0 rounded-full group-data-[orientation=horizontal]/timeline:mt-0", dot[status])} />
        <span
          aria-hidden="true"
          className="w-px flex-1 bg-border group-last/item:hidden group-data-[orientation=horizontal]/timeline:h-px group-data-[orientation=horizontal]/timeline:w-auto"
        />
      </div>
      <div className="flex flex-col gap-0.5 text-sm group-data-[orientation=horizontal]/timeline:pe-4">
        <span className="sr-only">{labels[status]}</span>
        {date && (
          <time dateTime={date.toISOString()} className="text-xs text-muted-foreground tabular-nums">
            {formatDate(date, { lang, digits }, dateOptions)}
          </time>
        )}
        <p className="font-medium">{title}</p>
        {children && <div className="text-muted-foreground">{children}</div>}
      </div>
    </li>
  )
}

export { Timeline, TimelineItem, timelineLabelsAr }
export type { TimelineLabels, TimelineStatus }
