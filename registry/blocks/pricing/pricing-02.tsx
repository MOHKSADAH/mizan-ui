import * as React from "react"
import { CheckIcon, MinusIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Money } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/ui/table"

type PricePeriod = "month" | "year" | "one-time"

type Plan = {
  id: string
  name: string
  price: Money | null
  priceNote?: string
  period?: PricePeriod
  cta: Action
  highlighted?: boolean
  badge?: string
}

type Row = { label: string; values: (boolean | string)[] }
type RowGroup = { group: string; items: Row[] }

type Pricing02Labels = {
  feature: string
  tableLabel: string
  included: string
  notIncluded: string
  perPeriod: (period: PricePeriod) => string
}

type Pricing02Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  plans: Plan[]
  rows: RowGroup[]
  labels?: Partial<Pricing02Labels>
}

const labelsEn: Pricing02Labels = {
  feature: "Feature",
  tableLabel: "Plan comparison, scroll sideways to see all plans",
  included: "Included",
  notIncluded: "Not included",
  perPeriod: (p) => (p === "month" ? "per month" : p === "year" ? "per year" : "one time"),
}

const labelsAr: Pricing02Labels = {
  feature: "الميزة",
  tableLabel: "مقارنة الباقات، مرر أفقيًا لعرض كل الباقات",
  included: "متوفرة",
  notIncluded: "غير متوفرة",
  perPeriod: (p) => (p === "month" ? "شهريًا" : p === "year" ? "سنويًا" : "دفعة واحدة"),
}

const sticky = "sticky start-0 z-10 bg-background border-e"

function Pricing02({
  lang = "en",
  eyebrow,
  title,
  description,
  plans,
  rows,
  headingLevel = 2,
  labels,
  id,
  className,
}: Pricing02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
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
        />
        <div
          role="region"
          aria-label={t.tableLabel}
          tabIndex={0}
          className="overflow-x-auto rounded-lg border outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead scope="col" className={cn(sticky, "w-48 align-bottom")}>
                  <span className="sr-only">{t.feature}</span>
                </TableHead>
                {plans.map((plan) => (
                  <TableHead
                    key={plan.id}
                    scope="col"
                    className={cn("h-auto min-w-44 p-4 align-top whitespace-normal", plan.highlighted && "border-t-2 border-t-primary bg-muted/50")}
                  >
                    <div className="flex flex-col items-start gap-3">
                      <span className="flex items-center gap-2 text-base font-semibold">
                        {plan.name}
                        {plan.badge ? <Badge>{plan.badge}</Badge> : null}
                      </span>
                      <span className="flex flex-col gap-1 font-normal">
                        {plan.price ? (
                          <span className="flex flex-wrap items-baseline gap-x-2">
                            <Price amount={plan.price.amount} currency={plan.price.currency} lang={lang} className="text-2xl font-semibold" />
                            {plan.period ? <span className="text-muted-foreground">{t.perPeriod(plan.period)}</span> : null}
                          </span>
                        ) : null}
                        {plan.priceNote ? (
                          <span className={plan.price ? "text-muted-foreground" : "text-2xl font-semibold"}>{plan.priceNote}</span>
                        ) : null}
                      </span>
                      <a
                        href={plan.cta.href}
                        {...(plan.cta.external ? { target: "_blank", rel: "noopener" } : {})}
                        className={cn(buttonVariants({ variant: plan.highlighted ? "default" : "outline", size: "lg" }), "h-10 w-full text-sm")}
                      >
                        {plan.cta.label}
                      </a>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            {rows.map((group) => (
              <TableBody key={group.group}>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead scope="rowgroup" colSpan={plans.length + 1} className="sticky start-0 font-semibold">
                    {group.group}
                  </TableHead>
                </TableRow>
                {group.items.map((row) => (
                  <TableRow key={row.label}>
                    <TableHead scope="row" className={cn(sticky, "font-normal whitespace-normal")}>
                      {row.label}
                    </TableHead>
                    {row.values.map((value, i) => (
                      <TableCell key={plans[i]?.id ?? i} className="p-4">
                        {typeof value === "string" ? (
                          value
                        ) : value ? (
                          <>
                            <CheckIcon aria-hidden="true" weight="bold" className="size-4 text-primary" />
                            <span className="sr-only">{t.included}</span>
                          </>
                        ) : (
                          <>
                            <MinusIcon aria-hidden="true" className="size-4 text-muted-foreground" />
                            <span className="sr-only">{t.notIncluded}</span>
                          </>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ))}
          </table>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Pricing02Props; ar: Pricing02Props } = {
  en: {
    lang: "en",
    eyebrow: "Compare plans",
    title: "Find the plan that fits your team",
    description: "All prices exclude VAT.",
    plans: [
      { id: "starter", name: "Starter", price: { amount: 99, currency: "SAR" }, period: "month", cta: { label: "Start free trial", href: "#starter" } },
      { id: "business", name: "Business", price: { amount: 249, currency: "SAR" }, period: "month", cta: { label: "Start free trial", href: "#business" }, highlighted: true, badge: "Most popular" },
      { id: "enterprise", name: "Enterprise", price: null, priceNote: "Custom pricing", cta: { label: "Contact sales", href: "#enterprise" } },
    ],
    rows: [
      {
        group: "Core",
        items: [
          { label: "Users", values: ["3", "15", "Unlimited"] },
          { label: "Invoices per month", values: ["100", "Unlimited", "Unlimited"] },
          { label: "Inventory management", values: [false, true, true] },
        ],
      },
      {
        group: "Support",
        items: [
          { label: "Email support", values: [true, true, true] },
          { label: "WhatsApp support", values: [false, true, true] },
          { label: "Dedicated account manager", values: [false, false, true] },
        ],
      },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "قارن الباقات",
    title: "اعثر على الباقة التي تناسب فريقك",
    description: "جميع الأسعار لا تشمل ضريبة القيمة المضافة.",
    plans: [
      { id: "starter", name: "الأساسية", price: { amount: 99, currency: "SAR" }, period: "month", cta: { label: "ابدأ تجربتك المجانية", href: "#starter" } },
      { id: "business", name: "الأعمال", price: { amount: 249, currency: "SAR" }, period: "month", cta: { label: "ابدأ تجربتك المجانية", href: "#business" }, highlighted: true, badge: "الأكثر طلبًا" },
      { id: "enterprise", name: "المؤسسات", price: null, priceNote: "سعر مخصص", cta: { label: "تواصل مع المبيعات", href: "#enterprise" } },
    ],
    rows: [
      {
        group: "الأساسيات",
        items: [
          { label: "المستخدمون", values: ["3", "15", "غير محدود"] },
          { label: "الفواتير شهريًا", values: ["100", "غير محدودة", "غير محدودة"] },
          { label: "إدارة المخزون", values: [false, true, true] },
        ],
      },
      {
        group: "الدعم",
        items: [
          { label: "الدعم عبر البريد الإلكتروني", values: [true, true, true] },
          { label: "الدعم عبر واتساب", values: [false, true, true] },
          { label: "مدير حساب مخصص", values: [false, false, true] },
        ],
      },
    ],
    labels: labelsAr,
  },
}

export { Pricing02, labelsEn, labelsAr, demo }
export type { Pricing02Props, Pricing02Labels, Plan, Row, RowGroup, PricePeriod }
export default Pricing02
