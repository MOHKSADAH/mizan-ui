import * as React from "react"
import { CheckCircleIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Progress } from "@/registry/ui/progress"
import { Section } from "@/registry/ui/section"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"

type PhoneOrder = { customer: string; number: number; amount: number; status: OrderStatus }

type Cta05Labels = { todaySales: string; goal: string; orders: string }

type Cta05Props = BlockBase & {
  lang?: Lang
  title: React.ReactNode
  benefits: string[]
  primaryCta: Action
  secondaryCta?: Action
  phone: { store: string; sales: number; goal: number; orders: PhoneOrder[] }
  labels?: Partial<Cta05Labels>
}

const labelsEn: Cta05Labels = { todaySales: "Today's sales", goal: "Monthly goal", orders: "Latest orders" }
const labelsAr: Cta05Labels = { todaySales: "مبيعات اليوم", goal: "هدف الشهر", orders: "آخر الطلبات" }

const cta = "h-12 w-full px-6 text-base sm:w-auto"

// A decorative app screen built from registry parts. It is hidden from assistive tech because the benefit list says the same.
function PhoneMock({ lang, phone, t }: { lang: Lang; phone: Cta05Props["phone"]; t: Cta05Labels }) {
  const percent = Math.round((phone.sales / phone.goal) * 100)
  return (
    <Card aria-hidden="true" className="mx-auto w-full max-w-sm text-start md:[--card-spacing:--spacing(6)]">
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm font-semibold">{phone.store}</p>
        <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">{t.todaySales}</p>
          <Price amount={phone.sales} lang={lang} className="text-2xl font-semibold" />
          <Progress value={percent} className="gap-1 [&_[data-slot=progress-track]]:bg-background">
            <span className="text-xs text-muted-foreground">
              {t.goal} <bdi className="tabular-nums">{formatPercent(percent / 100, { lang })}</bdi>
            </span>
          </Progress>
        </div>
        <p className="text-xs font-medium text-muted-foreground">{t.orders}</p>
        <ul className="flex flex-col gap-3">
          {phone.orders.map((order) => (
            <li key={order.number} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-sm font-medium">{order.customer}</span>
                <span className="text-xs text-muted-foreground">
                  <bdi className="tabular-nums">{`#${order.number}`}</bdi>
                </span>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Price amount={order.amount} lang={lang} className="text-sm font-medium" />
                <StatusBadge status={order.status} labels={lang === "ar" ? statusBadgeLabelsAr : undefined} />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function Cta05({
  lang = "en",
  title,
  benefits,
  primaryCta,
  secondaryCta,
  phone,
  headingLevel = 2,
  labels,
  id,
  className,
}: Cta05Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  return (
    <Section id={sid} className={className}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <Heading id={`${sid}-heading`} className="text-2xl font-semibold text-balance md:text-3xl lg:text-4xl">
            {title}
          </Heading>
          <ul className="flex flex-col gap-3 text-lg">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <CheckCircleIcon aria-hidden="true" weight="fill" className="mt-1 size-5 shrink-0 text-primary" />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
            <a href={primaryCta.href} className={cn(buttonVariants(), cta)}>
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <a href={secondaryCta.href} className={cn(buttonVariants({ variant: "outline" }), cta)}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        <PhoneMock lang={lang} phone={phone} t={t} />
      </Container>
    </Section>
  )
}

const demo: { en: Cta05Props; ar: Cta05Props } = {
  en: {
    lang: "en",
    title: "Run your store from your phone",
    benefits: [
      "An alert the moment a new order lands",
      "Update stock from the same screen",
      "Daily sales report in riyals",
    ],
    primaryCta: { label: "Download the app", href: "#download" },
    secondaryCta: { label: "See how it works", href: "#how" },
    phone: {
      store: "Hayat Perfumes",
      sales: 12480,
      goal: 15000,
      orders: [
        { customer: "Hatem Al-Salmi", number: 360243, amount: 3594, status: "pending" },
        { customer: "Moataz Hussam", number: 360242, amount: 2955, status: "paid" },
        { customer: "Ibtisam Al-Khazaei", number: 360241, amount: 2795, status: "shipped" },
      ],
    },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    title: "أدر متجرك من جوالك",
    benefits: [
      "إشعار فوري مع كل طلب جديد",
      "حدّث المخزون من الشاشة نفسها",
      "تقرير مبيعات يومي بالريال",
    ],
    primaryCta: { label: "حمّل التطبيق", href: "#download" },
    secondaryCta: { label: "شاهد كيف يعمل", href: "#how" },
    phone: {
      store: "عطور حياة",
      sales: 12480,
      goal: 15000,
      orders: [
        { customer: "حاتم السلمي", number: 360243, amount: 3594, status: "pending" },
        { customer: "معتصم حسام الدين", number: 360242, amount: 2955, status: "paid" },
        { customer: "ابتسام الخزاعي", number: 360241, amount: 2795, status: "shipped" },
      ],
    },
    labels: labelsAr,
  },
}

export { Cta05, labelsEn, labelsAr, demo }
export type { Cta05Props, Cta05Labels }
export default Cta05
