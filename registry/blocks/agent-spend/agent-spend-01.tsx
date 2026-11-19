"use client"

import * as React from "react"

import type { BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { SegmentedBar, type BarTone } from "@/registry/ui/segmented-bar"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Section } from "@/registry/ui/section"

type View = "step" | "model"

export type AgentSpend01Labels = {
  title: string
  description: string
  spent: string
  budget: string
  left: string
  byAgent: string
  view: string
  views: Record<View, string>
  steps: Plural
}

const arPlural = (forms: Parameters<typeof plural>[1]): Plural => (n) => plural(n, forms, { lang: "ar" })

export const labelsEn: AgentSpend01Labels = {
  title: "Spend today",
  description: "What your agents cost against the daily budget, in US dollars.",
  spent: "Spent",
  budget: "Budget",
  left: "Left",
  byAgent: "Spend by agent",
  view: "Break down by",
  views: { step: "Step", model: "Model" },
  steps: (n) => plural(n, { one: "{n} step", other: "{n} steps" }, { lang: "en" }),
}

export const labelsAr: AgentSpend01Labels = {
  title: "الإنفاق اليوم",
  description: "ما كلّفه وكلاؤك مقابل الميزانية اليومية، بالدولار الأمريكي.",
  spent: "المصروف",
  budget: "الميزانية",
  left: "المتبقي",
  byAgent: "الإنفاق حسب الوكيل",
  view: "التوزيع حسب",
  views: { step: "الخطوة", model: "النموذج" },
  steps: arPlural({ one: "خطوة واحدة", two: "خطوتان", few: "{n} خطوات", many: "{n} خطوة", other: "{n} خطوة" }),
}

export type SpendStep = {
  id: string
  name: string
  agent: string
  // Model names stay Latin.
  model: string
  // In US dollars.
  amount: number
}

export type AgentSpend01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<AgentSpend01Labels>
  budget: number
  steps: SpendStep[]
}

const sumBy = (steps: SpendStep[], key: (step: SpendStep) => string) => {
  const totals = new Map<string, { amount: number; count: number }>()
  for (const step of steps) {
    const current = totals.get(key(step)) ?? { amount: 0, count: 0 }
    totals.set(key(step), { amount: current.amount + step.amount, count: current.count + 1 })
  }
  return [...totals].map(([name, value]) => ({ name, ...value }))
}

// The segmented bar splits the budget by agent. The rows below it split the same total by step or by model.
export function AgentSpend01({
  lang = "en",
  labels,
  budget,
  steps,
  id,
  headingLevel = 2,
  className,
}: AgentSpend01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [view, setView] = React.useState<View>("step")
  const spent = steps.reduce((sum, step) => sum + step.amount, 0)
  const agents = sumBy(steps, (step) => step.agent)
  const models = sumBy(steps, (step) => step.model)
  // Each row takes the color its agent has in the legend. In the model view it takes the color of its model.
  const tone = (index: number): BarTone => `series-${(index % 5) + 1}` as BarTone
  const rows =
    view === "step"
      ? steps.map((step) => ({
          key: step.id,
          name: step.name,
          sub: (
            <>
              {step.agent} · <bdi>{step.model}</bdi>
            </>
          ),
          amount: step.amount,
          tone: tone(agents.findIndex((agent) => agent.name === step.agent)),
        }))
      : models.map((m, index) => ({ key: m.name, name: m.name, sub: t.steps(m.count), amount: m.amount, tone: tone(index) }))
  const sorted = [...rows].sort((a, b) => b.amount - a.amount)
  const top = sorted[0]?.amount ?? 1
  const price = (amount: number) => <Price amount={amount} currency="USD" lang={lang} decimals />

  return (
    <Section as="div" spacing="compact" id={id} className={className}>
      <Container dir={dir} className="max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>
              <Heading className="text-base leading-snug font-medium">{t.title}</Heading>
            </CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
                <p className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{t.spent}</span>
                  <span className="text-3xl font-semibold">{price(spent)}</span>
                </p>
                <p className="flex gap-4 text-sm text-muted-foreground">
                  <span>
                    {t.budget} {price(budget)}
                  </span>
                  <span>
                    {t.left} {price(Math.max(budget - spent, 0))}
                  </span>
                </p>
              </div>
              <SegmentedBar
                total={budget}
                size="lg"
                legend
                aria-label={t.byAgent}
                segments={agents.map((agent) => ({
                  id: agent.name,
                  label: agent.name,
                  valueLabel: price(agent.amount),
                  value: agent.amount,
                }))}
              />
            </div>
            <div className="flex flex-col gap-3 border-t pt-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">{t.view}</span>
                <SegmentedControl
                  aria-label={t.view}
                  value={view}
                  onValueChange={(value) => setView(value as View)}
                  options={(Object.keys(t.views) as View[]).map((key) => ({ value: key, label: t.views[key] }))}
                />
              </div>
              <ul className="flex flex-col gap-3">
                {sorted.map((row) => (
                  <li key={row.key} className="grid gap-1.5">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="grid min-w-0">
                        <bdi className="truncate font-medium">{row.name}</bdi>
                        <span className="truncate text-xs text-muted-foreground">{row.sub}</span>
                      </span>
                      <span className="shrink-0 font-medium">{price(row.amount)}</span>
                    </div>
                    <SegmentedBar
                      aria-hidden="true"
                      size="sm"
                      total={top}
                      segments={[{ id: row.key, value: row.amount, tone: row.tone }]}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

export default AgentSpend01

export const demo: { en: AgentSpend01Props; ar: AgentSpend01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    budget: 25,
    steps: [
      { id: "plan", name: "Plan the October close", agent: "Back-office lead", model: "Claude Opus", amount: 3.1 },
      { id: "match", name: "Match items to the catalog", agent: "Invoice agent", model: "Claude Sonnet", amount: 4.2 },
      { id: "create", name: "Create 38 e-invoices", agent: "Invoice agent", model: "Claude Sonnet", amount: 2.4 },
      { id: "tickets", name: "Answer 12 store tickets", agent: "Support agent", model: "Claude Haiku", amount: 1.9 },
      { id: "refunds", name: "Draft refund replies", agent: "Support agent", model: "Claude Sonnet", amount: 2.3 },
      { id: "reorder", name: "Build the reorder list", agent: "Stock agent", model: "Claude Sonnet", amount: 1.8 },
      { id: "statement", name: "Send the supplier statement", agent: "Supplier agent", model: "Claude Haiku", amount: 0.6 },
    ],
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    budget: 25,
    steps: [
      { id: "plan", name: "التخطيط لإقفال أكتوبر", agent: "مسؤول المكتب الخلفي", model: "Claude Opus", amount: 3.1 },
      { id: "match", name: "مطابقة الأصناف مع الكتالوج", agent: "وكيل الفواتير", model: "Claude Sonnet", amount: 4.2 },
      { id: "create", name: "إنشاء 38 فاتورة إلكترونية", agent: "وكيل الفواتير", model: "Claude Sonnet", amount: 2.4 },
      { id: "tickets", name: "الرد على 12 تذكرة من المتجر", agent: "وكيل الدعم", model: "Claude Haiku", amount: 1.9 },
      { id: "refunds", name: "صياغة ردود الاسترجاع", agent: "وكيل الدعم", model: "Claude Sonnet", amount: 2.3 },
      { id: "reorder", name: "إعداد قائمة إعادة الطلب", agent: "وكيل المخزون", model: "Claude Sonnet", amount: 1.8 },
      { id: "statement", name: "إرسال كشف حساب المورّد", agent: "وكيل الموردين", model: "Claude Haiku", amount: 0.6 },
    ],
  },
}
