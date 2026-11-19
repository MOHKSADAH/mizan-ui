import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type EditorialRow = { title: string; summary: string; href?: string }

type Editorial02Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  items: EditorialRow[]
}

const labelsEn = {}
const labelsAr = {}

function Editorial02({ lang = "en", eyebrow, title, description, items, headingLevel = 2, id, className }: Editorial02Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ol className="divide-y border-y">
          {items.map(({ title: itemTitle, summary, href }, i) => (
            <li
              key={itemTitle}
              className="relative grid items-baseline gap-x-6 gap-y-2 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[3rem_minmax(0,2fr)_minmax(0,3fr)] md:py-8"
            >
              <span aria-hidden="true" className="text-lg leading-snug font-semibold text-muted-foreground tabular-nums md:text-xl">
                <bdi>{formatNumber(i + 1, { lang }, { minimumIntegerDigits: 2 })}</bdi>
              </span>
              <ItemHeading className="text-lg font-semibold md:text-xl">
                {href ? (
                  <a href={href} className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-ring">
                    {itemTitle}
                  </a>
                ) : (
                  itemTitle
                )}
              </ItemHeading>
              <p className="flex items-center justify-between gap-4 text-base text-muted-foreground sm:col-start-2 md:col-start-3">
                {summary}
                {href ? <ArrowRightIcon aria-hidden="true" weight="bold" className="size-5 shrink-0 text-foreground rtl:rotate-180" /> : null}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

const demo: { en: Editorial02Props; ar: Editorial02Props } = {
  en: {
    lang: "en",
    eyebrow: "What we do",
    title: "Four tools for a calmer business",
    items: [
      { title: "Invoicing", summary: "ZATCA-compliant invoices that reach your customer on WhatsApp.", href: "#invoicing" },
      { title: "Stock and branches", summary: "Every branch and warehouse in one screen, with an alert before an item runs out.", href: "#stock" },
      { title: "Reports", summary: "Today's and this week's sales in riyals, ready before the morning meeting.", href: "#reports" },
      { title: "Support", summary: "A Saudi team that answers on WhatsApp, Sunday to Thursday.", href: "#support" },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "ماذا نفعل",
    title: "أربع أدوات لتجارة أهدأ",
    items: [
      { title: "الفوترة", summary: "فواتير متوافقة مع هيئة الزكاة والضريبة والجمارك، تصل عميلك على واتساب.", href: "#invoicing" },
      { title: "المخزون والفروع", summary: "كميات كل فرع ومستودع في شاشة واحدة، وتنبيه قبل أن ينفد الصنف.", href: "#stock" },
      { title: "التقارير", summary: "مبيعات اليوم والأسبوع بالريال، جاهزة قبل اجتماع الصباح.", href: "#reports" },
      { title: "الدعم", summary: "فريق سعودي يرد عليك على واتساب من الأحد إلى الخميس.", href: "#support" },
    ],
  },
}

export { Editorial02, labelsEn, labelsAr, demo }
export type { Editorial02Props, EditorialRow }
export default Editorial02
