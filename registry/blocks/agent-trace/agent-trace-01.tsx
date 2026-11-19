"use client"

import * as React from "react"
import { CpuIcon, RobotIcon, WrenchIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatCompact, formatNumber } from "@/registry/lib/format"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { RunStatus, runStatusLabelsAr } from "@/registry/ui/run-status"
import { Section } from "@/registry/ui/section"

type SpanKind = "agent" | "model" | "tool"

export type AgentTrace01Labels = {
  title: string
  duration: string
  cost: string
  tokens: string
  toolCalls: string
  agents: string
  steps: string
  kinds: Record<SpanKind, string>
  seconds: string
  minutes: string
  details: string
  start: string
  length: string
  model: string
  input: string
  output: string
}

export const labelsEn: AgentTrace01Labels = {
  title: "Run trace",
  duration: "Duration",
  cost: "Cost",
  tokens: "Tokens",
  toolCalls: "Tool calls",
  agents: "Agents",
  steps: "Steps on a time axis",
  kinds: { agent: "Agent", model: "Model call", tool: "Tool call" },
  seconds: "s",
  minutes: "m",
  details: "Step details",
  start: "Started at",
  length: "Took",
  model: "Model",
  input: "Input",
  output: "Output",
}

export const labelsAr: AgentTrace01Labels = {
  title: "تتبّع التشغيل",
  duration: "المدة",
  cost: "التكلفة",
  tokens: "الرموز",
  toolCalls: "استدعاءات الأدوات",
  agents: "الوكلاء",
  steps: "الخطوات على محور الزمن",
  kinds: { agent: "وكيل", model: "استدعاء نموذج", tool: "استدعاء أداة" },
  seconds: "ث",
  minutes: "د",
  details: "تفاصيل الخطوة",
  start: "بدأت عند",
  length: "استغرقت",
  model: "النموذج",
  input: "المدخل",
  output: "المخرج",
}

export type TraceSpan = {
  id: string
  name: string
  kind: SpanKind
  // Seconds from the start of the run.
  start: number
  duration: number
  // 0 for the root. A child sits one level deeper than its parent.
  depth: number
  status: "done" | "failed"
  model?: string
  tokens?: number
  // In US dollars.
  cost?: number
  input?: string
  output?: string
}

export type AgentTrace01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<AgentTrace01Labels>
  subtitle?: string
  spans: TraceSpan[]
  selectedId?: string
}

const kindIcon = { agent: RobotIcon, model: CpuIcon, tool: WrenchIcon }
const kindBar: Record<SpanKind, string> = { agent: "bg-muted-foreground/40", model: "bg-series-1", tool: "bg-series-1" }
const TICKS = [0, 0.25, 0.5, 0.75, 1]

// The bars sit on an inline-start offset, so time runs from the start side in both directions.
export function AgentTrace01({
  lang = "en",
  labels,
  subtitle,
  spans,
  selectedId,
  id,
  headingLevel = 2,
  className,
}: AgentTrace01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [selected, setSelected] = React.useState(selectedId ?? spans[0]?.id)
  const span = spans.find((s) => s.id === selected) ?? spans[0]
  const total = Math.max(...spans.map((s) => s.start + s.duration))
  const cost = spans.reduce((sum, s) => sum + (s.cost ?? 0), 0)
  const tokens = spans.reduce((sum, s) => sum + (s.tokens ?? 0), 0)
  const count = (kind: SpanKind) => spans.filter((s) => s.kind === kind).length
  const locale = { lang }

  const clock = (seconds: number) => {
    const whole = Math.round(seconds)
    if (seconds < 60) return `${formatNumber(Number(seconds.toFixed(1)), locale, { maximumFractionDigits: 1 })} ${t.seconds}`
    return `${formatNumber(Math.floor(whole / 60), locale)} ${t.minutes} ${formatNumber(whole % 60, locale)} ${t.seconds}`
  }

  const summary: { label: string; value: React.ReactNode }[] = [
    { label: t.duration, value: clock(total) },
    { label: t.cost, value: <Price amount={cost} currency="USD" lang={lang} decimals /> },
    { label: t.tokens, value: formatCompact(tokens, locale) },
    { label: t.toolCalls, value: formatNumber(count("tool"), locale) },
    { label: t.agents, value: formatNumber(count("agent"), locale) },
  ]

  return (
    <Section as="div" spacing="compact" id={id} className={className}>
      <Container dir={dir} size="narrow">
        <Card>
          <CardHeader>
            <CardTitle>
              <Heading className="text-base leading-snug font-medium">{t.title}</Heading>
            </CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-5">
              {summary.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5 bg-card p-3 first:max-sm:col-span-2">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="text-base font-semibold tabular-nums">
                    <bdi>{item.value}</bdi>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="min-w-0 overflow-x-auto">
                <div className="min-w-[26rem] sm:min-w-[36rem]" role="group" aria-label={t.steps}>
                  <div className="grid grid-cols-[9rem_minmax(0,1fr)] sm:grid-cols-[13rem_minmax(0,1fr)] gap-2 pb-1 text-xs text-muted-foreground">
                    <span />
                    <span className="relative h-4" aria-hidden="true">
                      {TICKS.map((tick) => (
                        <bdi
                          key={tick}
                          style={{ insetInlineStart: `${tick * 100}%` }}
                          className={cn(
                            "absolute whitespace-nowrap tabular-nums",
                            tick === 1 ? "-translate-x-full rtl:translate-x-full" : tick > 0 && "-translate-x-1/2 rtl:translate-x-1/2"
                          )}
                        >
                          {clock(total * tick)}
                        </bdi>
                      ))}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {spans.map((s) => {
                      const Icon = kindIcon[s.kind]
                      const active = s.id === span?.id
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            aria-pressed={active}
                            onClick={() => setSelected(s.id)}
                            className={cn(
                              "grid w-full grid-cols-[9rem_minmax(0,1fr)] sm:grid-cols-[13rem_minmax(0,1fr)] items-center gap-2 rounded-md px-1 text-start text-sm outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50",
                              active && "bg-muted"
                            )}
                          >
                            <span
                              style={{ paddingInlineStart: s.depth * 14 }}
                              className="flex min-w-0 items-center gap-1.5 py-1.5"
                            >
                              <Icon aria-hidden="true" weight="bold" className="size-3.5 shrink-0 text-muted-foreground" />
                              <span className="sr-only">{t.kinds[s.kind]}: </span>
                              <bdi className="truncate">{s.name}</bdi>
                            </span>
                            <span aria-hidden="true" className="relative h-6">
                              {TICKS.map((tick) => (
                                <span
                                  key={tick}
                                  style={{ insetInlineStart: `${tick * 100}%` }}
                                  className="absolute inset-y-0 w-px bg-border"
                                />
                              ))}
                              <span
                                style={{
                                  insetInlineStart: `${(s.start / total) * 100}%`,
                                  width: `max(${(s.duration / total) * 100}%, 4px)`,
                                }}
                                className={cn(
                                  "absolute inset-y-1.5 rounded-sm",
                                  s.status === "failed" ? "bg-destructive" : kindBar[s.kind]
                                )}
                              />
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              {span && (
                <aside aria-label={t.details} className="flex min-w-0 flex-col gap-3 rounded-lg border bg-muted/30 p-3 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid min-w-0">
                      <bdi className="truncate font-medium">{span.name}</bdi>
                      <span className="text-xs text-muted-foreground">{t.kinds[span.kind]}</span>
                    </div>
                    <RunStatus state={span.status} labels={lang === "ar" ? runStatusLabelsAr : undefined} />
                  </div>
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                    <div>
                      <dt className="text-muted-foreground">{t.start}</dt>
                      <dd className="font-medium tabular-nums">
                        <bdi>{clock(span.start)}</bdi>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">{t.length}</dt>
                      <dd className="font-medium tabular-nums">
                        <bdi>{clock(span.duration)}</bdi>
                      </dd>
                    </div>
                    {span.model && (
                      <div className="col-span-2">
                        <dt className="text-muted-foreground">{t.model}</dt>
                        <dd className="font-medium">
                          <bdi>{span.model}</bdi>
                        </dd>
                      </div>
                    )}
                    {span.tokens !== undefined && (
                      <div>
                        <dt className="text-muted-foreground">{t.tokens}</dt>
                        <dd className="font-medium tabular-nums">
                          <bdi>{formatNumber(span.tokens, locale)}</bdi>
                        </dd>
                      </div>
                    )}
                    {span.cost !== undefined && (
                      <div>
                        <dt className="text-muted-foreground">{t.cost}</dt>
                        <dd className="font-medium">
                          <Price amount={span.cost} currency="USD" lang={lang} decimals />
                        </dd>
                      </div>
                    )}
                  </dl>
                  {[
                    { label: t.input, value: span.input },
                    { label: t.output, value: span.output },
                  ].map(
                    (block) =>
                      block.value && (
                        <div key={block.label} className="grid gap-1">
                          <span className="text-xs text-muted-foreground">{block.label}</span>
                          <pre
                            dir="ltr"
                            className="max-h-28 overflow-auto rounded-md border bg-background p-2 text-start text-xs whitespace-pre-wrap"
                          >
                            {block.value}
                          </pre>
                        </div>
                      )
                  )}
                </aside>
              )}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export default AgentTrace01

// The run is the same in both languages: tool and model names are identifiers.
const sampleSpans: TraceSpan[] = [
  { id: "lead", name: "back-office-lead", kind: "agent", start: 0, duration: 72, depth: 0, status: "done" },
  {
    id: "plan",
    name: "plan_close_books",
    kind: "model",
    start: 0.5,
    duration: 5.5,
    depth: 1,
    status: "done",
    model: "Claude Opus",
    tokens: 6200,
    cost: 0.18,
    input: "Close the October books for supplier 4471. 40 purchase orders.",
    output: '{ "steps": ["read_orders", "create_invoices", "submit", "notify"] }',
  },
  {
    id: "orders",
    name: "zid.list_orders",
    kind: "tool",
    start: 6,
    duration: 8,
    depth: 1,
    status: "done",
    input: '{ "status": "paid", "month": "2026-10", "page_size": 50 }',
    output: '{ "count": 40, "total": 187420.0 }',
  },
  { id: "invoice", name: "invoice-agent", kind: "agent", start: 14, duration: 44, depth: 1, status: "done" },
  {
    id: "match",
    name: "match_items",
    kind: "model",
    start: 14.5,
    duration: 15.5,
    depth: 2,
    status: "done",
    model: "Claude Sonnet",
    tokens: 31400,
    cost: 0.21,
    input: "40 orders, 212 line items, supplier catalog v12",
    output: '{ "matched": 38, "unmatched": 2 }',
  },
  {
    id: "create",
    name: "fatoora.create_invoice",
    kind: "tool",
    start: 30,
    duration: 17,
    depth: 2,
    status: "done",
    input: '{ "orders": 38, "type": "standard" }',
    output: '{ "created": 38, "failed": 0 }',
  },
  {
    id: "submit",
    name: "fatoora.submit_invoice",
    kind: "tool",
    start: 47,
    duration: 11,
    depth: 2,
    status: "failed",
    input: '{ "invoice": "INV-2210", "mode": "clearance" }',
    output: '{ "error": "timeout", "retry_after_s": 30 }',
  },
  { id: "supplier", name: "supplier-agent", kind: "agent", start: 58, duration: 12, depth: 1, status: "done" },
  {
    id: "send",
    name: "whatsapp.send_message",
    kind: "tool",
    start: 60,
    duration: 8,
    depth: 2,
    status: "done",
    input: '{ "to": "+966 55 555 0148", "template": "invoice_ready" }',
    output: '{ "status": "delivered" }',
  },
  {
    id: "wrap",
    name: "write_summary",
    kind: "model",
    start: 70,
    duration: 2,
    depth: 1,
    status: "done",
    model: "Claude Haiku",
    tokens: 10600,
    cost: 0.03,
    output: "38 invoices created, 37 cleared, 1 retry scheduled.",
  },
]

export const demo: { en: AgentTrace01Props; ar: AgentTrace01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    subtitle: "Close the October books, Al-Nokhba Supplies",
    spans: sampleSpans,
    selectedId: "submit",
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    subtitle: "إقفال حسابات أكتوبر، مؤسسة النخبة للتوريدات",
    spans: sampleSpans,
    selectedId: "submit",
  },
}
