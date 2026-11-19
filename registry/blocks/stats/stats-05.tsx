import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Stat = { value: string | number; label: string; context: string }

type Stats05Props = BlockBase & {
  lang?: Lang
  title: string
  // The first item is the lead number. It is one step larger than the rest.
  items: Stat[]
}

const labelsEn = {}
const labelsAr = {}

function Stats05({ lang = "en", title, items, headingLevel = 2, id, className }: Stats05Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const show = (value: Stat["value"]) => (typeof value === "number" ? formatNumber(value, { lang }) : value)
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} title={title} headingLevel={headingLevel} />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ value, label, context }, i) => (
            <div key={label} className="flex flex-col gap-2 border-t pt-6">
              <dd className={cn("order-1 font-semibold tabular-nums", i === 0 ? "text-5xl" : "text-4xl")}>
                <bdi>{show(value)}</bdi>
              </dd>
              <dt className="order-2 text-base font-medium">{label}</dt>
              <dd className="order-3 text-base text-muted-foreground">{context}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

const demo: { en: Stats05Props; ar: Stats05Props } = {
  en: {
    lang: "en",
    title: "Numbers from stores that sell every day",
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
    title: "أرقام من متاجر تبيع كل يوم",
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
