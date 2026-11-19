"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { RunStatusIcon, runStatusLabelsAr, runStatusLabelsEn, type RunState } from "@/registry/ui/run-status"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Section } from "@/registry/ui/section"

type Filter = "all" | "mine" | "needs-you"

export type AgentRuns01Labels = {
  title: string
  description: string
  filter: string
  filters: Record<Filter, string>
  open: string
  viewing: string
  empty: string
  elapsed: string
  hours: string
  minutes: string
  seconds: string
  states: Record<RunState, string>
}

export const labelsEn: AgentRuns01Labels = {
  title: "Live runs",
  description: "What your agents are doing now and what finished today.",
  filter: "Filter runs",
  filters: { all: "All", mine: "Mine", "needs-you": "Needs you" },
  open: "Open",
  viewing: "Open now",
  empty: "No runs here.",
  elapsed: "Elapsed",
  hours: "h",
  minutes: "m",
  seconds: "s",
  states: runStatusLabelsEn,
}

export const labelsAr: AgentRuns01Labels = {
  title: "التشغيلات الحالية",
  description: "ما يعمل عليه وكلاؤك الآن وما انتهى اليوم.",
  filter: "تصفية التشغيلات",
  filters: { all: "الكل", mine: "تشغيلاتي", "needs-you": "تحتاج إليك" },
  open: "افتح",
  viewing: "مفتوحة الآن",
  empty: "لا توجد تشغيلات هنا.",
  elapsed: "المدة",
  hours: "س",
  minutes: "د",
  seconds: "ث",
  states: runStatusLabelsAr,
}

export type AgentRun = {
  id: string
  title: string
  agent: string
  state: RunState
  // Seconds since the run started.
  elapsed: number
  mine: boolean
}

export type AgentRuns01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<AgentRuns01Labels>
  runs: AgentRun[]
  openId?: string
  onOpen?: (id: string) => void
}

// Hours and minutes, or minutes and seconds. Never more than two units, and a zero second unit is dropped.
function elapsedText(seconds: number, lang: Lang, t: AgentRuns01Labels) {
  const n = (value: number) => formatNumber(value, { lang })
  const pair = (big: number, bigUnit: string, small: number, smallUnit: string) =>
    small ? `${n(big)} ${bigUnit} ${n(small)} ${smallUnit}` : `${n(big)} ${bigUnit}`
  if (seconds >= 3600) return pair(Math.floor(seconds / 3600), t.hours, Math.floor((seconds % 3600) / 60), t.minutes)
  if (seconds >= 60) return pair(Math.floor(seconds / 60), t.minutes, seconds % 60, t.seconds)
  return `${n(seconds)} ${t.seconds}`
}

export function AgentRuns01({
  lang = "en",
  labels,
  runs,
  openId,
  onOpen,
  id,
  headingLevel = 2,
  className,
}: AgentRuns01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [filter, setFilter] = React.useState<Filter>("all")
  const [open, setOpen] = React.useState(openId)
  const matches: Record<Filter, (run: AgentRun) => boolean> = {
    all: () => true,
    mine: (run) => run.mine,
    "needs-you": (run) => run.state === "needs-you",
  }
  const shown = runs.filter(matches[filter])

  return (
    <Section as="div" spacing="compact" id={id} className={className}>
      <Container dir={dir} className="max-w-2xl">
        <Card className="gap-0 pb-0">
          <CardHeader className="pb-4">
            <CardTitle>
              <Heading className="text-base leading-snug font-medium">{t.title}</Heading>
            </CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-0">
            <SegmentedControl
              aria-label={t.filter}
              value={filter}
              onValueChange={(value) => setFilter(value as Filter)}
              className="mx-4"
              options={(Object.keys(matches) as Filter[]).map((key) => ({
                value: key,
                label: (
                  <>
                    {t.filters[key]}
                    <span className="text-xs text-muted-foreground tabular-nums">
                      <bdi>{formatNumber(runs.filter(matches[key]).length, { lang })}</bdi>
                    </span>
                  </>
                ),
              }))}
            />
            {shown.length === 0 ? (
              <p className="border-t px-4 py-6 text-center text-sm text-muted-foreground">{t.empty}</p>
            ) : (
              <ul className="divide-y border-t">
                {shown.map((run) => {
                  const active = run.id === open
                  return (
                    <li
                      key={run.id}
                      aria-current={active ? "true" : undefined}
                      className={cn("flex items-center gap-3 px-4 py-3", active && "bg-muted/50")}
                    >
                      <RunStatusIcon state={run.state} className="[&_svg]:size-5" />
                      <div className="grid min-w-0 flex-1 text-sm">
                        <span className="truncate font-medium">
                          <span className="sr-only">{t.states[run.state]}: </span>
                          {run.title}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {run.agent} · <span className="sr-only">{t.elapsed}: </span>
                          <bdi className="tabular-nums">{elapsedText(run.elapsed, lang, t)}</bdi>
                        </span>
                      </div>
                      <Button
                        variant={run.state === "needs-you" ? "default" : "outline"}
                        size="sm"
                        disabled={active}
                        onClick={() => {
                          setOpen(run.id)
                          onOpen?.(run.id)
                        }}
                      >
                        {active ? t.viewing : t.open}
                      </Button>
                    </li>
                  )
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export default AgentRuns01

export const demo: { en: AgentRuns01Props; ar: AgentRuns01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    openId: "invoices",
    runs: [
      { id: "invoices", title: "Match October invoices for Al-Nokhba Supplies", agent: "Invoice agent", state: "running", elapsed: 252, mine: true },
      { id: "tickets", title: "Answer the open Zid store tickets", agent: "Support agent", state: "running", elapsed: 1080, mine: false },
      { id: "reorder", title: "Reorder list for low-stock items", agent: "Stock agent", state: "needs-you", elapsed: 2160, mine: true },
      { id: "freight", title: "Price the Riyadh and Dammam shipments", agent: "Pricing agent", state: "needs-you", elapsed: 3900, mine: false },
      { id: "statement", title: "Send the supplier statement", agent: "Supplier agent", state: "done", elapsed: 160, mine: true },
      { id: "prices", title: "Update prices for the Royal Oud batch", agent: "Pricing agent", state: "failed", elapsed: 52, mine: false },
    ],
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    openId: "invoices",
    runs: [
      { id: "invoices", title: "مطابقة فواتير أكتوبر لمؤسسة النخبة", agent: "وكيل الفواتير", state: "running", elapsed: 252, mine: true },
      { id: "tickets", title: "الرد على تذاكر متجر زد المفتوحة", agent: "وكيل الدعم", state: "running", elapsed: 1080, mine: false },
      { id: "reorder", title: "قائمة إعادة طلب الأصناف منخفضة المخزون", agent: "وكيل المخزون", state: "needs-you", elapsed: 2160, mine: true },
      { id: "freight", title: "تسعير شحنات الرياض والدمام", agent: "وكيل التسعير", state: "needs-you", elapsed: 3900, mine: false },
      { id: "statement", title: "إرسال كشف حساب المورّد", agent: "وكيل الموردين", state: "done", elapsed: 160, mine: true },
      { id: "prices", title: "تحديث أسعار دفعة العود الملكي", agent: "وكيل التسعير", state: "failed", elapsed: 52, mine: false },
    ],
  },
}
