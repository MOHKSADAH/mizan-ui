"use client"

import * as React from "react"
import { PlayIcon, WarningIcon } from "@phosphor-icons/react"

import type { BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { formatCompact, plural } from "@/registry/lib/format"
import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { SegmentedBar } from "@/registry/ui/segmented-bar"
import { SegmentedControl } from "@/registry/ui/segmented-control"
import { Section } from "@/registry/ui/section"

export type AgentCost01Labels = {
  title: string
  model: string
  tokens: string
  cost: string
  time: string
  minutes: Plural
  credits: string
  creditsOf: (needed: number, available: number) => string
  overTitle: string
  over: (missing: number) => string
  cancel: string
  run: string
}

const arPlural = (forms: Parameters<typeof plural>[1]): Plural => (n) => plural(n, forms, { lang: "ar" })

export const labelsEn: AgentCost01Labels = {
  title: "Estimate before you run",
  model: "Model",
  tokens: "Tokens",
  cost: "Cost",
  time: "Time",
  minutes: (n) => plural(n, { one: "about {n} min", other: "about {n} min" }, { lang: "en" }),
  credits: "Credits",
  creditsOf: (needed, available) => `${needed} of ${available} credits`,
  overTitle: "Not enough credits",
  over: (missing) => `This run needs ${missing} more ${missing === 1 ? "credit" : "credits"} than you have. Pick a lighter model or add credits.`,
  cancel: "Cancel",
  run: "Run task",
}

export const labelsAr: AgentCost01Labels = {
  title: "قدّر قبل أن تشغّل",
  model: "النموذج",
  tokens: "الرموز",
  cost: "التكلفة",
  time: "الوقت",
  minutes: arPlural({
    one: "نحو دقيقة",
    two: "نحو دقيقتين",
    few: "نحو {n} دقائق",
    many: "نحو {n} دقيقة",
    other: "نحو {n} دقيقة",
  }),
  credits: "الرصيد",
  creditsOf: (needed, available) => `${needed} من ${available} رصيد`,
  overTitle: "الرصيد لا يكفي",
  over: (missing) =>
    `يحتاج هذا التشغيل إلى ${plural(missing, { one: "رصيد واحد", two: "رصيدين", few: "{n} أرصدة", many: "{n} رصيدًا", other: "{n} رصيد" }, { lang: "ar" })} أكثر مما لديك. اختر نموذجًا أخف أو أضف رصيدًا.`,
  cancel: "إلغاء",
  run: "شغّل المهمة",
}

export type CostModel = {
  id: string
  // Model names stay Latin.
  name: string
  tokens: number
  // In US dollars.
  cost: number
  minutes: number
  credits: number
}

export type AgentCost01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<AgentCost01Labels>
  task: { title: string; description?: string }
  models: CostModel[]
  defaultModel?: string
  // Credits left on the account.
  available: number
  onCancel?: () => void
  onRun?: (modelId: string) => void
}

// The estimate follows the chosen model. Run is off while the estimate is above the credits left.
export function AgentCost01({
  lang = "en",
  labels,
  task,
  models,
  defaultModel,
  available,
  onCancel,
  onRun,
  id,
  headingLevel = 2,
  className,
}: AgentCost01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const [modelId, setModelId] = React.useState(defaultModel ?? models[0]?.id)
  const model = models.find((m) => m.id === modelId) ?? models[0]
  const locale = { lang }
  const over = model.credits > available

  const estimates = [
    { label: t.tokens, value: formatCompact(model.tokens, locale) },
    { label: t.cost, value: <Price amount={model.cost} currency="USD" lang={lang} decimals /> },
    { label: t.time, value: t.minutes(model.minutes) },
  ]

  return (
    <Section as="div" spacing="compact" id={id} className={className}>
      <Container dir={dir} className="max-w-xl">
        <Card>
          <CardHeader>
            <CardDescription>{t.title}</CardDescription>
            <CardTitle>
              <Heading className="text-base leading-snug font-medium text-balance">{task.title}</Heading>
            </CardTitle>
            {task.description && <CardDescription>{task.description}</CardDescription>}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">{t.model}</span>
              <SegmentedControl
                aria-label={t.model}
                value={modelId}
                onValueChange={setModelId}
                className="w-full *:flex-1"
                options={models.map((m) => ({ value: m.id, label: <bdi>{m.name}</bdi> }))}
              />
            </div>
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border bg-border">
              {estimates.map((estimate) => (
                <div key={estimate.label} className="flex flex-col gap-0.5 bg-card p-3">
                  <dt className="text-xs text-muted-foreground">{estimate.label}</dt>
                  <dd className="text-sm font-semibold tabular-nums">
                    <bdi>{estimate.value}</bdi>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-2">
              <p className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{t.credits}</span>
                <bdi className="font-medium tabular-nums">{t.creditsOf(model.credits, available)}</bdi>
              </p>
              <SegmentedBar
                aria-label={t.creditsOf(model.credits, available)}
                total={available}
                size="md"
                segments={[{ id: "estimate", value: model.credits, tone: over ? "warning" : "primary" }]}
              />
            </div>
            {over && (
              <Alert>
                <WarningIcon weight="fill" className="text-warning" />
                <AlertTitle>{t.overTitle}</AlertTitle>
                <AlertDescription>{t.over(model.credits - available)}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              {t.cancel}
            </Button>
            <Button disabled={over} onClick={() => onRun?.(model.id)}>
              <PlayIcon weight="fill" data-icon="inline-start" className="rtl:-scale-x-100" />
              {t.run}
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </Section>
  )
}

export default AgentCost01

const models: CostModel[] = [
  { id: "haiku", name: "Claude Haiku", tokens: 62000, cost: 0.42, minutes: 6, credits: 12 },
  { id: "sonnet", name: "Claude Sonnet", tokens: 96000, cost: 1.7, minutes: 10, credits: 30 },
  { id: "opus", name: "Claude Opus", tokens: 140000, cost: 6.3, minutes: 14, credits: 52 },
]

export const demo: { en: AgentCost01Props; ar: AgentCost01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    task: {
      title: "Issue the October invoices for the Riyadh supplier",
      description: "40 purchase orders from Zid, then submit the e-invoices to ZATCA.",
    },
    models,
    defaultModel: "sonnet",
    available: 40,
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    task: {
      title: "إصدار فواتير أكتوبر لمورّد الرياض",
      description: "40 أمر شراء من زد، ثم إرسال الفواتير الإلكترونية إلى هيئة الزكاة.",
    },
    models,
    defaultModel: "sonnet",
    available: 40,
  },
}
