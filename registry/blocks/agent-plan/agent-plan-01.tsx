"use client"

import * as React from "react"
import { StopIcon } from "@phosphor-icons/react"

import type { BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { RunStatus, runStatusLabelsAr } from "@/registry/ui/run-status"
import { Section } from "@/registry/ui/section"
import { StepList, type Step } from "@/registry/ui/step-list"

export type AgentPlan01Labels = {
  plan: string
  sources: string
  progress: (done: number, total: number) => string
  estimate: string
  minutes: Plural
  credits: Plural
  stop: string
  stopped: string
}

const arPlural = (forms: Parameters<typeof plural>[1]): Plural => (n) => plural(n, forms, { lang: "ar" })

export const labelsEn: AgentPlan01Labels = {
  plan: "Plan",
  sources: "Sources",
  progress: (done, total) => `${done} of ${plural(total, { one: "{n} step", other: "{n} steps" }, { lang: "en" })}`,
  estimate: "Estimate",
  minutes: (n) => plural(n, { one: "{n} min", other: "{n} min" }, { lang: "en" }),
  credits: (n) => plural(n, { one: "{n} credit", other: "{n} credits" }, { lang: "en" }),
  stop: "Stop",
  stopped: "Stopped",
}

export const labelsAr: AgentPlan01Labels = {
  plan: "الخطة",
  sources: "المصادر",
  progress: (done, total) =>
    `${done} من ${arPlural({ one: "خطوة واحدة", two: "خطوتين", few: "{n} خطوات", many: "{n} خطوة", other: "{n} خطوة" })(total)}`,
  estimate: "التقدير",
  minutes: arPlural({ one: "دقيقة", two: "دقيقتان", few: "{n} دقائق", many: "{n} دقيقة", other: "{n} دقيقة" }),
  credits: arPlural({ one: "رصيد واحد", two: "رصيدان", few: "{n} أرصدة", many: "{n} رصيدًا", other: "{n} رصيد" }),
  stop: "إيقاف",
  stopped: "متوقفة",
}

export type AgentPlan01Props = BlockBase & {
  lang?: Lang
  labels?: Partial<AgentPlan01Labels>
  title: string
  description?: string
  // Apps the agent reads from or writes to. Names stay Latin.
  sources: { id: string; name: string }[]
  steps: Step[]
  estimate: { minutes: number; credits: number }
  onStop?: () => void
}

// A task the agent is working on: the apps it uses, the steps with their status, the estimate and a stop button.
export function AgentPlan01({
  lang = "en",
  labels,
  title,
  description,
  sources,
  steps,
  estimate,
  onStop,
  headingLevel = 2,
  className,
}: AgentPlan01Props) {
  const t = { ...labelsEn, ...labels }
  const dir = lang === "ar" ? "rtl" : "ltr"
  const [stopped, setStopped] = React.useState(false)
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const done = steps.filter((step) => step.status === "done").length

  return (
    <Section as="div" spacing="compact" className={className}>
      <Container dir={dir} className="max-w-xl">
        <Card>
          <CardHeader>
            <CardDescription>{t.plan}</CardDescription>
            <CardTitle>
              <Heading className="text-base leading-snug font-medium text-balance">
                {title}
              </Heading>
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
            <CardAction>
              <RunStatus
                state={stopped ? "idle" : "running"}
                labels={{ ...(lang === "ar" ? runStatusLabelsAr : undefined), ...(stopped ? { idle: t.stopped } : undefined) }}
              />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">{t.sources}</span>
              <ul className="flex flex-wrap gap-1.5">
                {sources.map((source) => (
                  <li key={source.id} className="flex items-center gap-1.5 rounded-md border bg-background py-0.5 ps-1 pe-2 text-xs">
                    <span
                      aria-hidden="true"
                      className="flex size-4 items-center justify-center rounded-sm bg-muted text-xs font-medium"
                    >
                      {[...source.name][0]}
                    </span>
                    <bdi>{source.name}</bdi>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-muted-foreground">
                <bdi>{t.progress(done, steps.length)}</bdi>
              </p>
              <StepList steps={steps} labels={lang === "ar" ? runStatusLabelsAr : undefined} />
            </div>
          </CardContent>
          <CardFooter className="justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {t.estimate}: <bdi>{t.minutes(estimate.minutes)}</bdi> · <bdi>{t.credits(estimate.credits)}</bdi>
            </p>
            <Button
              variant="outline"
              size="sm"
              disabled={stopped}
              onClick={() => {
                setStopped(true)
                onStop?.()
              }}
            >
              <StopIcon weight="fill" data-icon="inline-start" />
              {t.stop}
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </Section>
  )
}

export default AgentPlan01

export const demo: { en: AgentPlan01Props; ar: AgentPlan01Props } = {
  en: {
    lang: "en",
    labels: labelsEn,
    title: "Issue the October invoices for the Riyadh supplier",
    description: "Al-Nokhba Supplies, 40 purchase orders.",
    sources: [
      { id: "zid", name: "Zid" },
      { id: "zatca", name: "ZATCA Fatoora" },
      { id: "sheets", name: "Google Sheets" },
      { id: "whatsapp", name: "WhatsApp" },
    ],
    steps: [
      { id: "read", title: "Read the purchase orders from Zid", status: "done", meta: "40" },
      { id: "match", title: "Match items to the supplier catalog", status: "done", meta: "38 / 40" },
      { id: "create", title: "Create the e-invoices", status: "running", meta: "18 / 38" },
      { id: "submit", title: "Submit them to ZATCA", status: "queued" },
      { id: "send", title: "Send copies to the supplier on WhatsApp", status: "queued" },
    ],
    estimate: { minutes: 10, credits: 30 },
  },
  ar: {
    lang: "ar",
    labels: labelsAr,
    title: "إصدار فواتير أكتوبر لمورّد الرياض",
    description: "مؤسسة النخبة للتوريدات، 40 أمر شراء.",
    sources: [
      { id: "zid", name: "Zid" },
      { id: "zatca", name: "ZATCA Fatoora" },
      { id: "sheets", name: "Google Sheets" },
      { id: "whatsapp", name: "WhatsApp" },
    ],
    steps: [
      { id: "read", title: "قراءة أوامر الشراء من زد", status: "done", meta: "40" },
      { id: "match", title: "مطابقة الأصناف مع كتالوج المورّد", status: "done", meta: "38 / 40" },
      { id: "create", title: "إنشاء الفواتير الإلكترونية", status: "running", meta: "18 / 38" },
      { id: "submit", title: "إرسالها إلى هيئة الزكاة", status: "queued" },
      { id: "send", title: "إرسال نسخ للمورّد عبر واتساب", status: "queued" },
    ],
    estimate: { minutes: 10, credits: 30 },
  },
}
