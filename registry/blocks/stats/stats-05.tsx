import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Stat = { value: string | number; label: string; context: string }

type Stats05Props = BlockBase & {
  lang?: Lang
  // Mix weights with <strong>: the heading is font-normal, so the strong part stands out.
  title: React.ReactNode
  // The first item is the lead number. It is set much larger than the rest.
  items: Stat[]
}

const labelsEn = {}
const labelsAr = {}

function Stats05({ lang = "en", title, items, headingLevel = 2, id, className }: Stats05Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  const [lead, ...rest] = items
  const show = (value: Stat["value"]) => (typeof value === "number" ? formatNumber(value, { lang }) : value)
  return (
    <Section id={sid} className={cn("bg-primary text-primary-foreground", className)}>
      <Container className="flex flex-col gap-10 md:gap-14">
        <Heading id={`${sid}-heading`} className="max-w-2xl text-2xl font-normal text-balance md:text-3xl lg:text-4xl">
          {title}
        </Heading>
        <dl className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-3 lg:col-span-7">
            <dd className="order-1 text-7xl leading-none font-semibold tabular-nums sm:text-9xl lg:text-[11rem]">
              <bdi>{show(lead.value)}</bdi>
            </dd>
            <dt className="order-2 text-xl font-medium">{lead.label}</dt>
            <dd className="order-3 max-w-md text-lg text-primary-foreground/80">{lead.context}</dd>
          </div>
          <div className="flex flex-col lg:col-span-5">
            {rest.map(({ value, label, context }) => (
              <div
                key={label}
                className="flex flex-col gap-1 border-t border-primary-foreground/30 py-6 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-6"
              >
                <dd className="order-1 text-5xl leading-tight font-semibold tabular-nums">
                  <bdi>{show(value)}</bdi>
                </dd>
                <dt className="order-2 text-base font-medium">{label}</dt>
                <dd className="order-3 text-base text-primary-foreground/80">{context}</dd>
              </div>
            ))}
          </div>
        </dl>
      </Container>
    </Section>
  )
}

const demo: { en: Stats05Props; ar: Stats05Props } = {
  en: {
    lang: "en",
    title: (
      <>
        <strong>Numbers</strong> from stores that sell every day
      </>
    ),
    items: [
      {
        value: "+12,000",
        label: "Active stores",
        context: "Across the Kingdom, and about 120 new stores join every week.",
      },
      { value: "2.4B", label: "Riyals in sales", context: "Went through Rafid checkouts in 2026." },
      { value: "99.9%", label: "Platform uptime", context: "Over the last twelve months, including Ramadan and White Friday." },
      { value: "4 min", label: "First support reply", context: "The median across chat and WhatsApp." },
    ],
  },
  ar: {
    lang: "ar",
    title: (
      <>
        <strong>أرقام</strong> من متاجر تبيع كل يوم
      </>
    ),
    items: [
      {
        value: "+12,000",
        label: "متجر نشط",
        context: "في أنحاء المملكة، وينضم إلينا نحو 120 متجرًا جديدًا كل أسبوع.",
      },
      { value: "2.4 مليار", label: "ريال مبيعات", context: "مرّت عبر صفحات الدفع في رافد خلال 2026." },
      { value: "99.9%", label: "جاهزية المنصة", context: "خلال الاثني عشر شهرًا الماضية، ومنها رمضان والجمعة البيضاء." },
      { value: "4 دقائق", label: "أول رد من الدعم", context: "المتوسط عبر المحادثة والواتساب." },
    ],
  },
}

export { Stats05, labelsEn, labelsAr, demo }
export type { Stats05Props, Stat as Stats05Stat }
export default Stats05
