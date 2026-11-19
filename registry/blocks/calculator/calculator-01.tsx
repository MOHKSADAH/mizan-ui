"use client"

import * as React from "react"

import type { Action, BlockBase, Currency, Lang, Plural } from "@/registry/lib/block-types"
import { formatPercent, plural } from "@/registry/lib/format"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Label } from "@/registry/ui/label"
import { NumberField, numberFieldLabelsAr } from "@/registry/ui/number-field"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Slider } from "@/registry/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

type Calculator01Labels = {
  amount: string
  term: string
  years: Plural
  monthly: string
  total: string
  profit: string
  rate: string
  disclaimer: string
}

type Calculator01Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  currency?: Currency
  // Financed amount: the slider and the number field share it.
  amount: { min: number; max: number; step: number; default: number }
  // Repayment terms in years.
  terms: number[]
  defaultTerm?: number
  // Annual profit rate as a fraction (0.055 is 5.5%).
  rate: number
  cta?: Action
  labels?: Partial<Calculator01Labels>
}

const labelsEn: Calculator01Labels = {
  amount: "Financing amount",
  term: "Repayment term",
  years: (n) => plural(n, { one: "{n} year", other: "{n} years" }, { lang: "en" }),
  monthly: "Monthly installment",
  total: "Total repayment",
  profit: "Total profit",
  rate: "Annual profit rate",
  disclaimer: "An estimate for planning only. The final offer depends on your bank's approval.",
}

const labelsAr: Calculator01Labels = {
  amount: "مبلغ التمويل",
  term: "مدة السداد",
  years: (n) =>
    plural(n, { one: "سنة", two: "سنتان", few: "{n} سنوات", many: "{n} سنة", other: "{n} سنة" }, { lang: "ar" }),
  monthly: "القسط الشهري",
  total: "إجمالي السداد",
  profit: "إجمالي الأرباح",
  rate: "معدل الربح السنوي",
  disclaimer: "تقدير للتخطيط فقط. يعتمد العرض النهائي على موافقة البنك.",
}

// Annuity: a fixed monthly payment over `years` at the annual `rate`.
function estimate(amount: number, years: number, rate: number) {
  const n = years * 12
  const r = rate / 12
  const monthly = r === 0 ? amount / n : (amount * r) / (1 - (1 + r) ** -n)
  const total = monthly * n
  return { monthly, total, profit: total - amount }
}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function Calculator01({
  lang = "en",
  eyebrow,
  title,
  description,
  currency = "SAR",
  amount: range,
  terms,
  defaultTerm,
  rate,
  cta,
  headingLevel = 2,
  labels,
  id,
  className,
}: Calculator01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const [amount, setAmount] = React.useState(range.default)
  const [term, setTerm] = React.useState(defaultTerm ?? terms[0])
  const { monthly, total, profit } = estimate(amount, term, rate)
  const clamp = (n: number) => Math.min(range.max, Math.max(range.min, n))
  const rows = [
    { label: t.total, value: <Price amount={Math.round(total)} lang={lang} currency={currency} /> },
    { label: t.profit, value: <Price amount={Math.round(profit)} lang={lang} currency={currency} /> },
    { label: t.rate, value: <bdi>{formatPercent(rate, { lang }, { max: 2 })}</bdi> },
  ]
  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <Card className="md:[--card-spacing:--spacing(6)]">
            <CardContent className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${sid}-amount`}>{t.amount}</Label>
                <NumberField
                  id={`${sid}-amount`}
                  lang={lang}
                  aria-label={t.amount}
                  labels={lang === "ar" ? numberFieldLabelsAr : undefined}
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={amount}
                  onValueChange={(v) => v !== null && setAmount(clamp(v))}
                />
                <Slider
                  aria-label={t.amount}
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={[amount]}
                  onValueChange={(v) => setAmount(Array.isArray(v) ? v[0] : v)}
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <Price amount={range.min} lang={lang} currency={currency} />
                  <Price amount={range.max} lang={lang} currency={currency} />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span id={`${sid}-term`} className="text-sm leading-none font-medium">
                  {t.term}
                </span>
                <ToggleGroup
                  aria-labelledby={`${sid}-term`}
                  variant="outline"
                  spacing={0}
                  className="flex-wrap"
                  value={[String(term)]}
                  onValueChange={(v) => v[0] && setTerm(Number(v[0]))}
                >
                  {terms.map((y) => (
                    <ToggleGroupItem
                      key={y}
                      value={String(y)}
                      className="h-10 px-4 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"
                    >
                      <bdi>{t.years(y)}</bdi>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
          <Card className="md:[--card-spacing:--spacing(6)]">
            <CardContent className="flex h-full flex-col gap-6">
              <div className="flex flex-col gap-2" aria-live="polite" aria-atomic="true">
                <p className="text-sm text-muted-foreground">{t.monthly}</p>
                <p className="text-4xl font-semibold">
                  <Price amount={Math.round(monthly)} lang={lang} currency={currency} />
                </p>
              </div>
              <dl className="flex flex-col">
                {rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-4 border-t py-3 text-sm">
                    <dt className="text-muted-foreground">{r.label}</dt>
                    <dd className="font-medium">{r.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs text-muted-foreground">{t.disclaimer}</p>
              {cta ? (
                <a
                  href={cta.href}
                  {...external(cta)}
                  className={buttonVariants({ size: "lg", className: "mt-auto h-10 w-full" })}
                >
                  {cta.label}
                </a>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Calculator01Props; ar: Calculator01Props } = {
  en: {
    lang: "en",
    eyebrow: "Home financing",
    title: "Estimate your monthly installment",
    description: "Pick the villa price and the term to see an installment in seconds.",
    amount: { min: 300_000, max: 3_000_000, step: 10_000, default: 1_200_000 },
    terms: [5, 10, 15, 20, 25],
    defaultTerm: 20,
    rate: 0.055,
    cta: { label: "Request financing", href: "#apply" },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "التمويل العقاري",
    title: "قدّر قسطك الشهري",
    description: "اختر سعر الفيلا ومدة السداد، وشاهد قسطك الشهري في ثوانٍ.",
    amount: { min: 300_000, max: 3_000_000, step: 10_000, default: 1_200_000 },
    terms: [5, 10, 15, 20, 25],
    defaultTerm: 20,
    rate: 0.055,
    cta: { label: "اطلب التمويل", href: "#apply" },
    labels: labelsAr,
  },
}

export { Calculator01, estimate, labelsEn, labelsAr, demo }
export type { Calculator01Props, Calculator01Labels }
export default Calculator01
