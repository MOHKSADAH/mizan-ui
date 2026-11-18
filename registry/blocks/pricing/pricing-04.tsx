"use client"

import * as React from "react"
import { CheckIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Lang, Money, Plural, Vat } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Label } from "@/registry/ui/label"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Switch } from "@/registry/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

type PeriodId = "month" | "year"
type VatMode = "inc" | "exc"

type Plan = {
  id: string
  name: string
  description: string
  // Amounts are read with vat.included: true means the amount already contains VAT.
  price: Money | Partial<Record<PeriodId, Money>>
  features: string[]
  cta: Action
  highlighted?: boolean
  badge?: string
}

type Pricing04Labels = {
  period: string
  perPeriod: (period: PeriodId) => string
  vatSwitch: string
  vatIncluded: Plural
  vatExcluded: Plural
  currencyNote: string
}

type Pricing04Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  plans: Plan[]
  vat: Vat
  vatMode?: VatMode
  defaultVatMode?: VatMode
  onVatModeChange?: (mode: VatMode) => void
  periods?: { id: PeriodId; label: string; discountLabel?: string }[]
  defaultPeriod?: PeriodId
  labels?: Partial<Pricing04Labels>
}

// The Plural functions take the VAT rate as a whole percent (15).
const labelsEn: Pricing04Labels = {
  period: "Billing period",
  perPeriod: (p) => (p === "month" ? "per month" : "per year"),
  vatSwitch: "Show prices with VAT",
  vatIncluded: (n) => `Prices include VAT (${formatPercent(n / 100, { lang: "en" })})`,
  vatExcluded: (n) => `Prices exclude VAT (${formatPercent(n / 100, { lang: "en" })})`,
  currencyNote: "All prices are in Saudi riyals.",
}

const labelsAr: Pricing04Labels = {
  period: "فترة الفوترة",
  perPeriod: (p) => (p === "month" ? "شهريًا" : "سنويًا"),
  vatSwitch: "عرض الأسعار شاملة الضريبة",
  vatIncluded: (n) => `الأسعار شاملة ضريبة القيمة المضافة (${formatPercent(n / 100, { lang: "ar" })})`,
  vatExcluded: (n) => `الأسعار غير شاملة ضريبة القيمة المضافة (${formatPercent(n / 100, { lang: "ar" })})`,
  currencyNote: "جميع الأسعار بالريال السعودي.",
}

const isMoney = (price: Plan["price"]): price is Money => "amount" in price

function show(amount: number, vat: Vat, mode: VatMode) {
  const gross = vat.included ? amount : amount * (1 + vat.rate)
  return mode === "inc" ? gross : gross / (1 + vat.rate)
}

function Pricing04({
  lang = "en",
  eyebrow,
  title,
  description,
  plans,
  vat,
  vatMode,
  defaultVatMode = "inc",
  onVatModeChange,
  periods,
  defaultPeriod,
  headingLevel = 2,
  labels,
  id,
  className,
}: Pricing04Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const [innerMode, setInnerMode] = React.useState<VatMode>(defaultVatMode)
  const [period, setPeriod] = React.useState<PeriodId>(defaultPeriod ?? periods?.[0]?.id ?? "month")
  const mode = vatMode ?? innerMode
  const ratePercent = Math.round(vat.rate * 100)
  const CardHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
          className="mb-8 md:mb-8"
        />
        <div className="mb-10 flex flex-col items-center gap-4 md:mb-12">
          {periods ? (
            <ToggleGroup
              aria-label={t.period}
              variant="outline"
              spacing={0}
              value={[period]}
              onValueChange={(value) => {
                const next = value[0] as PeriodId | undefined
                if (next) setPeriod(next)
              }}
            >
              {periods.map((p) => (
                <ToggleGroupItem
                  key={p.id}
                  value={p.id}
                  className="h-10 gap-2 px-4 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"
                >
                  {p.label}
                  {p.discountLabel ? <Badge variant="secondary">{p.discountLabel}</Badge> : null}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          ) : null}
          <div className="flex items-center gap-3">
            <Switch
              id={`${sid}-vat`}
              checked={mode === "inc"}
              onCheckedChange={(checked) => {
                const next: VatMode = checked ? "inc" : "exc"
                setInnerMode(next)
                onVatModeChange?.(next)
              }}
            />
            <Label htmlFor={`${sid}-vat`} className="text-base">
              {t.vatSwitch}
            </Label>
          </div>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {mode === "inc" ? t.vatIncluded(ratePercent) : t.vatExcluded(ratePercent)}
          </p>
        </div>
        <ul className="grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const money = isMoney(plan.price) ? plan.price : plan.price[period]
            const amount = money ? show(money.amount, vat, mode) : null
            return (
              <li key={plan.id} className={cn(plan.highlighted && "max-md:order-first")}>
                <Card className={cn("h-full md:[--card-spacing:--spacing(6)]", plan.highlighted && "ring-2 ring-primary")}>
                  <CardContent className="flex h-full flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <CardHeading className="text-lg font-semibold md:text-xl">{plan.name}</CardHeading>
                        {plan.badge ? <Badge>{plan.badge}</Badge> : null}
                      </div>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    {money && amount !== null ? (
                      <p className="flex flex-wrap items-baseline gap-x-2">
                        <Price
                          amount={amount}
                          currency={money.currency}
                          lang={lang}
                          decimals={!Number.isInteger(Math.round(amount * 100) / 100)}
                          className="text-4xl font-semibold"
                        />
                        {isMoney(plan.price) ? null : <span className="text-sm text-muted-foreground">{t.perPeriod(period)}</span>}
                      </p>
                    ) : null}
                    <a
                      href={plan.cta.href}
                      {...(plan.cta.external ? { target: "_blank", rel: "noopener" } : {})}
                      className={cn(buttonVariants({ variant: plan.highlighted ? "default" : "outline", size: "lg" }), "h-10 w-full text-sm")}
                    >
                      {plan.cta.label}
                    </a>
                    <ul className="flex flex-col gap-3 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckIcon aria-hidden="true" weight="bold" className="mt-0.5 size-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </li>
            )
          })}
        </ul>
        <p className="mt-8 text-center text-sm text-muted-foreground">{t.currencyNote}</p>
      </Container>
    </Section>
  )
}

const vat: Vat = { rate: 0.15, included: false }

const demo: { en: Pricing04Props; ar: Pricing04Props } = {
  en: {
    lang: "en",
    eyebrow: "Pricing",
    title: "Plans with clear VAT",
    description: "Switch between prices with and without VAT.",
    vat,
    periods: [
      { id: "month", label: "Monthly" },
      { id: "year", label: "Yearly", discountLabel: "Save 17%" },
    ],
    plans: [
      { id: "starter", name: "Starter", description: "For small shops and freelancers", price: { month: { amount: 99, currency: "SAR" }, year: { amount: 990, currency: "SAR" } }, features: ["Up to 3 users", "100 invoices per month", "Basic reports"], cta: { label: "Start free trial", href: "#starter" } },
      { id: "business", name: "Business", description: "For teams that sell every day", price: { month: { amount: 249, currency: "SAR" }, year: { amount: 2490, currency: "SAR" } }, features: ["Up to 15 users", "Unlimited invoices", "Inventory management", "WhatsApp support"], cta: { label: "Start free trial", href: "#business" }, highlighted: true, badge: "Most popular" },
      { id: "growth", name: "Growth", description: "For companies with several branches", price: { month: { amount: 599, currency: "SAR" }, year: { amount: 5990, currency: "SAR" } }, features: ["Unlimited users", "Multiple branches", "API access", "Account manager"], cta: { label: "Start free trial", href: "#growth" } },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "الأسعار",
    title: "باقات بضريبة واضحة",
    description: "بدّل بين الأسعار مع الضريبة وبدونها.",
    vat,
    periods: [
      { id: "month", label: "شهري" },
      { id: "year", label: "سنوي", discountLabel: "وفّر 17%" },
    ],
    plans: [
      { id: "starter", name: "الأساسية", description: "للمتاجر الصغيرة والعمل الحر", price: { month: { amount: 99, currency: "SAR" }, year: { amount: 990, currency: "SAR" } }, features: ["حتى 3 مستخدمين", "100 فاتورة شهريًا", "تقارير أساسية"], cta: { label: "ابدأ تجربتك المجانية", href: "#starter" } },
      { id: "business", name: "الأعمال", description: "للفرق التي تبيع كل يوم", price: { month: { amount: 249, currency: "SAR" }, year: { amount: 2490, currency: "SAR" } }, features: ["حتى 15 مستخدمًا", "فواتير غير محدودة", "إدارة المخزون", "دعم عبر واتساب"], cta: { label: "ابدأ تجربتك المجانية", href: "#business" }, highlighted: true, badge: "الأكثر طلبًا" },
      { id: "growth", name: "النمو", description: "للشركات متعددة الفروع", price: { month: { amount: 599, currency: "SAR" }, year: { amount: 5990, currency: "SAR" } }, features: ["مستخدمون غير محدودين", "فروع متعددة", "الوصول إلى الواجهة البرمجية", "مدير حساب"], cta: { label: "ابدأ تجربتك المجانية", href: "#growth" } },
    ],
    labels: labelsAr,
  },
}

export { Pricing04, labelsEn, labelsAr, demo }
export type { Pricing04Props, Pricing04Labels, Plan, PeriodId, VatMode }
export default Pricing04
