"use client"

import * as React from "react"
import { CheckIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Lang, Money } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

type PeriodId = "month" | "year"

type Plan = {
  id: string
  name: string
  description: string
  // A Money is a fixed price. A record is read with the active period. null shows only priceNote.
  price: Money | Partial<Record<PeriodId, Money>> | null
  priceNote?: string
  features: string[]
  cta: Action
  highlighted?: boolean
  badge?: string
}

type Pricing01Labels = {
  period: string
  perPeriod: (period: PeriodId) => string
}

type Pricing01Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  plans: Plan[]
  periods?: { id: PeriodId; label: string; discountLabel?: string }[]
  period?: PeriodId
  defaultPeriod?: PeriodId
  onPeriodChange?: (period: PeriodId) => void
  labels?: Partial<Pricing01Labels>
}

const labelsEn: Pricing01Labels = {
  period: "Billing period",
  perPeriod: (period) => (period === "month" ? "per month" : "per year"),
}

const labelsAr: Pricing01Labels = {
  period: "فترة الفوترة",
  perPeriod: (period) => (period === "month" ? "شهريًا" : "سنويًا"),
}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

const isMoney = (price: Plan["price"]): price is Money => !!price && "amount" in price

function Pricing01({
  lang = "en",
  eyebrow,
  title,
  description,
  plans,
  periods,
  period,
  defaultPeriod,
  onPeriodChange,
  headingLevel = 2,
  labels,
  id,
  className,
}: Pricing01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const [inner, setInner] = React.useState<PeriodId>(defaultPeriod ?? periods?.[0]?.id ?? "month")
  const current = period ?? inner
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
          className={periods ? "mb-8 md:mb-8" : undefined}
        />
        {periods ? (
          <div className="mb-10 flex justify-center md:mb-12">
            <ToggleGroup
              aria-label={t.period}
              variant="outline"
              spacing={0}
              value={[current]}
              onValueChange={(value) => {
                const next = value[0] as PeriodId | undefined
                if (!next) return
                setInner(next)
                onPeriodChange?.(next)
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
          </div>
        ) : null}
        <ul className="grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const money = isMoney(plan.price) ? plan.price : plan.price?.[current]
            const recurring = plan.price !== null && !isMoney(plan.price)
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
                    <div className="flex flex-col gap-1">
                      {money ? (
                        <p className="flex flex-wrap items-baseline gap-x-2">
                          <Price amount={money.amount} currency={money.currency} lang={lang} className="text-4xl font-semibold" />
                          {recurring ? (
                            <span className="text-sm text-muted-foreground">{t.perPeriod(current)}</span>
                          ) : null}
                        </p>
                      ) : null}
                      {plan.priceNote ? (
                        <p className={money ? "text-sm text-muted-foreground" : "text-4xl font-semibold"}>{plan.priceNote}</p>
                      ) : null}
                    </div>
                    <a
                      href={plan.cta.href}
                      {...external(plan.cta)}
                      className={cn(
                        buttonVariants({ variant: plan.highlighted ? "default" : "outline", size: "lg" }),
                        "h-10 w-full text-sm"
                      )}
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
      </Container>
    </Section>
  )
}

const demo: { en: Pricing01Props; ar: Pricing01Props } = {
  en: {
    lang: "en",
    eyebrow: "Pricing",
    title: "Simple plans that grow with you",
    description: "Start small and upgrade when your business needs more.",
    periods: [
      { id: "month", label: "Monthly" },
      { id: "year", label: "Yearly", discountLabel: "Save 17%" },
    ],
    plans: [
      {
        id: "starter",
        name: "Starter",
        description: "For small shops and freelancers",
        price: { month: { amount: 99, currency: "SAR" }, year: { amount: 990, currency: "SAR" } },
        priceNote: "Excludes VAT",
        features: ["Up to 3 users", "100 invoices per month", "Basic reports", "Email support"],
        cta: { label: "Start free trial", href: "#starter" },
      },
      {
        id: "business",
        name: "Business",
        description: "For teams that sell every day",
        price: { month: { amount: 249, currency: "SAR" }, year: { amount: 2490, currency: "SAR" } },
        priceNote: "Excludes VAT",
        features: ["Up to 15 users", "Unlimited invoices", "Inventory management", "Advanced reports", "WhatsApp support"],
        cta: { label: "Start free trial", href: "#business" },
        highlighted: true,
        badge: "Most popular",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For companies with several branches",
        price: null,
        priceNote: "Custom pricing",
        features: ["Unlimited users", "API and system integrations", "Dedicated account manager", "Service level agreement"],
        cta: { label: "Contact sales", href: "#enterprise" },
      },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "الأسعار",
    title: "باقات بسيطة تنمو مع أعمالك",
    description: "ابدأ بباقة صغيرة وانتقل إلى الأعلى عندما تحتاج إلى المزيد.",
    periods: [
      { id: "month", label: "شهري" },
      { id: "year", label: "سنوي", discountLabel: "وفّر 17%" },
    ],
    plans: [
      {
        id: "starter",
        name: "الأساسية",
        description: "للمتاجر الصغيرة والعمل الحر",
        price: { month: { amount: 99, currency: "SAR" }, year: { amount: 990, currency: "SAR" } },
        priceNote: "السعر لا يشمل ضريبة القيمة المضافة",
        features: ["حتى 3 مستخدمين", "100 فاتورة شهريًا", "تقارير أساسية", "دعم عبر البريد الإلكتروني"],
        cta: { label: "ابدأ تجربتك المجانية", href: "#starter" },
      },
      {
        id: "business",
        name: "الأعمال",
        description: "للفرق التي تبيع كل يوم",
        price: { month: { amount: 249, currency: "SAR" }, year: { amount: 2490, currency: "SAR" } },
        priceNote: "السعر لا يشمل ضريبة القيمة المضافة",
        features: ["حتى 15 مستخدمًا", "فواتير غير محدودة", "إدارة المخزون", "تقارير متقدمة", "دعم عبر واتساب"],
        cta: { label: "ابدأ تجربتك المجانية", href: "#business" },
        highlighted: true,
        badge: "الأكثر طلبًا",
      },
      {
        id: "enterprise",
        name: "المؤسسات",
        description: "للشركات متعددة الفروع",
        price: null,
        priceNote: "سعر مخصص",
        features: ["مستخدمون غير محدودين", "الربط مع أنظمتك عبر واجهة برمجية", "مدير حساب مخصص", "اتفاقية مستوى الخدمة"],
        cta: { label: "تواصل مع المبيعات", href: "#enterprise" },
      },
    ],
    labels: labelsAr,
  },
}

export { Pricing01, labelsEn, labelsAr, demo }
export type { Pricing01Props, Pricing01Labels, Plan, PeriodId }
export default Pricing01
