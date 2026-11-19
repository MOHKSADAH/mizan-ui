"use client"

import * as React from "react"
import { CheckIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { formatPercent } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { QuantityStepper, quantityStepperLabelsAr } from "@/registry/ui/quantity-stepper"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"
import { Section, SectionHeader } from "@/registry/ui/section"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"
import { computeVat, type Vat } from "@/registry/ui/vat-summary"

type PeriodId = "month" | "year"

type PickerPlan = {
  id: string
  name: string
  description: string
  // SAR per seat per month for each billing period. The yearly price is billed once a year.
  price: Record<PeriodId, number>
  features: string[]
  badge?: string
}

type Pricing06Labels = {
  period: string
  monthly: string
  yearly: string
  // The discount badge on the yearly option. The argument is the percent.
  save: (percent: string) => string
  plan: string
  perSeat: string
  seats: string
  subtotal: string
  vat: (rate: string) => string
  total: string
  perPeriod: (period: PeriodId) => string
  vatNote: (rate: string, included: boolean) => string
}

type Pricing06Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  plans: PickerPlan[]
  defaultPlan?: string
  defaultPeriod?: PeriodId
  seats?: { min: number; max: number; default: number }
  vat?: Vat
  cta: Action
  labels?: Partial<Pricing06Labels>
}

const labelsEn: Pricing06Labels = {
  period: "Billing period",
  monthly: "Monthly",
  yearly: "Yearly",
  save: (percent) => `Save ${percent}`,
  plan: "Plan",
  perSeat: "per seat, per month",
  seats: "Seats",
  subtotal: "Subtotal",
  vat: (rate) => `VAT (${rate})`,
  total: "Total",
  perPeriod: (period) => (period === "month" ? "per month" : "per year"),
  vatNote: (rate, included) => (included ? `Prices include ${rate} VAT.` : `Prices exclude ${rate} VAT. It is added at checkout.`),
}

const labelsAr: Pricing06Labels = {
  period: "فترة الفوترة",
  monthly: "شهريًا",
  yearly: "سنويًا",
  save: (percent) => `وفّر ${percent}`,
  plan: "الباقة",
  perSeat: "للمقعد الواحد شهريًا",
  seats: "عدد المقاعد",
  subtotal: "المجموع الفرعي",
  vat: (rate) => `ضريبة القيمة المضافة (${rate})`,
  total: "الإجمالي",
  perPeriod: (period) => (period === "month" ? "شهريًا" : "سنويًا"),
  vatNote: (rate, included) => (included ? `الأسعار شاملة ضريبة القيمة المضافة ${rate}.` : `الأسعار لا تشمل ضريبة القيمة المضافة ${rate}، وتُضاف عند الدفع.`),
}

const ksaVat: Vat = { rate: 0.15, included: false }

// A number that changed slides in for a moment, up when it grows and down when it shrinks. It never moves on first paint.
function useSlide(value: number) {
  const [last, setLast] = React.useState(value)
  const [dir, setDir] = React.useState<"up" | "down" | null>(null)
  if (value !== last) {
    setLast(value)
    setDir(value > last ? "up" : "down")
  }
  if (!dir) return undefined
  return cn(
    "animate-in fade-in-0 duration-200 motion-reduce:animate-none",
    dir === "up" ? "slide-in-from-bottom-1" : "slide-in-from-top-1"
  )
}

function PlanPrice({ amount, lang, className }: { amount: number; lang: Lang; className?: string }) {
  const slide = useSlide(amount)
  return <Price key={amount} amount={amount} lang={lang} className={cn(slide, className)} />
}

function Pricing06({
  lang = "en",
  eyebrow,
  title,
  description,
  plans,
  defaultPlan,
  defaultPeriod = "month",
  seats = { min: 1, max: 50, default: 3 },
  vat = ksaVat,
  cta,
  labels,
  headingLevel = 2,
  id,
  className,
}: Pricing06Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const [planId, setPlanId] = React.useState(defaultPlan ?? plans[0]?.id)
  const [period, setPeriod] = React.useState<PeriodId>(defaultPeriod)
  const [count, setCount] = React.useState(seats.default)

  const plan = plans.find((p) => p.id === planId) ?? plans[0]
  // The badge states the saving every plan has at least, in whole percent.
  const saving = Math.floor(Math.min(...plans.map((p) => 1 - p.price.year / p.price.month)) * 100) / 100
  const subtotal = plan.price[period] * count * (period === "year" ? 12 : 1)
  const totals = computeVat(subtotal, vat, "SAR")
  const rate = formatPercent(vat.rate, { lang })

  return (
    <Section id={sid} className={className}>
      <Container size="prose">
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <Card className="md:[--card-spacing:--spacing(6)]">
          <CardContent className="grid gap-6">
            <ToggleGroup
              aria-label={t.period}
              variant="outline"
              spacing={0}
              className="w-full"
              value={[period]}
              onValueChange={(value) => {
                const next = value[0] as PeriodId | undefined
                if (next) setPeriod(next)
              }}
            >
              <ToggleGroupItem
                value="month"
                className="h-10 flex-1 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"
              >
                {t.monthly}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="year"
                className="h-10 flex-1 gap-2 aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:hover:bg-primary/90"
              >
                {t.yearly}
                <Badge variant="secondary">{t.save(formatPercent(saving, { lang }))}</Badge>
              </ToggleGroupItem>
            </ToggleGroup>

            <RadioGroup aria-label={t.plan} value={plan.id} onValueChange={(value) => setPlanId(String(value))} className="gap-3">
              {plans.map((p) => {
                const selected = p.id === plan.id
                return (
                  <div
                    key={p.id}
                    data-selected={selected || undefined}
                    className={cn("rounded-xl border bg-card", selected && "border-primary ring-1 ring-primary")}
                  >
                    <label className="flex cursor-pointer items-start gap-3 p-4">
                      <RadioGroupItem value={p.id} className="mt-1" />
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-lg font-semibold">{p.name}</span>
                          {p.badge ? <Badge variant="secondary">{p.badge}</Badge> : null}
                        </span>
                        <span className="text-sm text-muted-foreground">{p.description}</span>
                      </span>
                      <span className="flex flex-col items-end gap-0.5 text-end">
                        <PlanPrice amount={p.price[period]} lang={lang} className="text-lg font-semibold" />
                        <span className="text-xs text-muted-foreground">{t.perSeat}</span>
                      </span>
                    </label>
                    <div
                      inert={!selected}
                      className={cn(
                        "grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
                        selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <ul className="grid gap-2 px-4 pb-4 ps-11 text-sm sm:grid-cols-2">
                          {p.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <CheckIcon aria-hidden="true" weight="bold" className="mt-0.5 size-4 shrink-0 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </RadioGroup>

            <div className="flex items-center justify-between gap-4 border-t pt-6">
              <span className="font-medium">{t.seats}</span>
              <QuantityStepper
                lang={lang}
                labels={{
                  ...(lang === "ar" ? quantityStepperLabelsAr : undefined),
                  quantity: t.seats,
                  announce: (n) => `${t.seats} ${n}`,
                }}
                min={seats.min}
                max={seats.max}
                value={count}
                onValueChange={setCount}
              />
            </div>

            <dl className="flex flex-col gap-2 border-t pt-6 text-sm">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">{t.subtotal}</dt>
                <dd>
                  <PlanPrice amount={totals.base} lang={lang} />
                </dd>
              </div>
              {vat.rate > 0 ? (
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted-foreground">{t.vat(rate)}</dt>
                  <dd>
                    <PlanPrice amount={totals.vat} lang={lang} />
                  </dd>
                </div>
              ) : null}
              <div className="flex items-baseline justify-between gap-3 border-t pt-3">
                <dt className="font-semibold">
                  {t.total} <span className="text-xs font-normal text-muted-foreground">{t.perPeriod(period)}</span>
                </dt>
                <dd>
                  <PlanPrice amount={totals.total} lang={lang} className="text-3xl font-semibold" />
                </dd>
              </div>
            </dl>

            <a
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
              className={cn(buttonVariants({ size: "lg" }), "h-11 w-full text-base")}
            >
              {cta.label}
            </a>
            {vat.rate > 0 ? <p className="text-center text-xs text-muted-foreground">{t.vatNote(rate, vat.included)}</p> : null}
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

const demo: { en: Pricing06Props; ar: Pricing06Props } = {
  en: {
    lang: "en",
    eyebrow: "Pricing",
    title: "Pick the plan for your team",
    description: "Choose a plan, set the number of seats and see the total in riyals.",
    plans: [
      {
        id: "starter",
        name: "Starter",
        description: "For a single branch or an online shop",
        price: { month: 49, year: 39 },
        features: ["Orders and invoices", "ZATCA e-invoice QR code", "One sales channel", "Email support"],
      },
      {
        id: "growth",
        name: "Growth",
        description: "For stores with several staff and branches",
        price: { month: 99, year: 79 },
        features: ["Everything in Starter", "Stock by branch", "Mada, Apple Pay and STC Pay", "WhatsApp order updates", "Daily sales reports", "Priority support"],
        badge: "Most chosen",
      },
      {
        id: "business",
        name: "Business",
        description: "For chains with accounting and API needs",
        price: { month: 199, year: 159 },
        features: ["Everything in Growth", "Roles and permissions", "Accounting export", "API access", "Dedicated account manager"],
      },
    ],
    defaultPlan: "growth",
    cta: { label: "Start 14-day free trial", href: "#trial" },
    vat: { rate: 0.15, included: false },
  },
  ar: {
    lang: "ar",
    eyebrow: "الأسعار",
    title: "اختر الباقة المناسبة لفريقك",
    description: "اختر باقة، وحدّد عدد المقاعد، وشاهد الإجمالي بالريال.",
    plans: [
      {
        id: "starter",
        name: "الأساسية",
        description: "لفرع واحد أو متجر إلكتروني",
        price: { month: 49, year: 39 },
        features: ["الطلبات والفواتير", "رمز الفاتورة الإلكترونية (زاتكا)", "قناة بيع واحدة", "دعم عبر البريد"],
      },
      {
        id: "growth",
        name: "النمو",
        description: "للمتاجر ذات الموظفين والفروع المتعددة",
        price: { month: 99, year: 79 },
        features: ["كل مزايا الأساسية", "المخزون حسب الفرع", "مدى وApple Pay وSTC Pay", "تحديثات الطلبات عبر واتساب", "تقارير مبيعات يومية", "دعم ذو أولوية"],
        badge: "الأكثر اختيارًا",
      },
      {
        id: "business",
        name: "الأعمال",
        description: "للسلاسل التي تحتاج محاسبة وربطًا برمجيًا",
        price: { month: 199, year: 159 },
        features: ["كل مزايا النمو", "الأدوار والصلاحيات", "تصدير للمحاسبة", "الوصول إلى واجهة البرمجة", "مدير حساب مخصص"],
      },
    ],
    defaultPlan: "growth",
    cta: { label: "ابدأ تجربة مجانية لمدة 14 يومًا", href: "#trial" },
    vat: { rate: 0.15, included: false },
    labels: labelsAr,
  },
}

export { Pricing06, labelsEn, labelsAr, demo }
export type { Pricing06Props, Pricing06Labels, PickerPlan }
export default Pricing06
