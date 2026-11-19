"use client"

import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react"

import type { BlockBase, Lang, Media } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { formatNumber } from "@/registry/lib/format"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type AccordionFeature = { id: string; title: string; description: string; media?: Media }

type FeatureAccordion01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  items: AccordionFeature[]
  defaultItem?: string
}

const labelsEn = {}
const labelsAr = {}

function MediaBox({ media, className }: { media?: Media; className?: string }) {
  return (
    <div className={cn("overflow-hidden border bg-muted", className)}>
      {media ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" className="size-full object-cover" />
      ) : (
        <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
          <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
        </div>
      )}
    </div>
  )
}

// One item is always open. The big media slot beside the list (inside the open item on phones) follows it.
// Arrow keys, Home and End move between the headers, and Enter or Space opens one.
function FeatureAccordion01({ lang = "en", eyebrow, title, description, items, defaultItem, headingLevel = 2, id, className }: FeatureAccordion01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const [active, setActive] = React.useState(defaultItem ?? items[0]?.id)
  const current = items.find((item) => item.id === active)
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-14">
          <Accordion
            value={active ? [active] : []}
            onValueChange={(next) => {
              if (next[0]) setActive(next[0])
            }}
            className="gap-2"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="rounded-xl border border-transparent data-open:border-border data-open:bg-card"
              >
                <AccordionTrigger className="items-center gap-4 rounded-xl px-4 py-4 text-foreground hover:no-underline">
                  <span aria-hidden="true" className="w-8 shrink-0 text-lg font-semibold text-muted-foreground tabular-nums group-aria-expanded/accordion-trigger:text-primary">
                    <bdi>{formatNumber(i + 1, { lang }, { minimumIntegerDigits: 2 })}</bdi>
                  </span>
                  <span className="text-lg font-semibold md:text-xl">{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="grid gap-4 pt-0 ps-16 pe-4 pb-4 text-base text-muted-foreground">
                  <p>{item.description}</p>
                  <MediaBox media={item.media} className="aspect-[16/10] rounded-lg lg:hidden" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <MediaBox
            key={active}
            media={current?.media}
            className="hidden aspect-[4/3] rounded-xl motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in-0 lg:block"
          />
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: FeatureAccordion01Props; ar: FeatureAccordion01Props } = {
  en: {
    lang: "en",
    eyebrow: "The platform",
    title: "Everything your store needs, in one place",
    description: "Open a feature to see how it works for your store.",
    items: [
      { id: "branches", title: "Branches and stock on one screen", description: "Follow sales and stock for every branch in Riyadh, Jeddah and Dammam, and get a warning before an item runs out." },
      { id: "invoices", title: "Tax invoices, ready", description: "Invoices that follow ZATCA rules, with the QR code, issued with every order." },
      { id: "payments", title: "Payments your customers trust", description: "mada, Apple Pay, Tamara and bank transfer, on the same page with no extra steps." },
      { id: "shipping", title: "Shipping and tracking", description: "Pick the right carrier for each city, and the tracking number reaches the customer on WhatsApp." },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "المنصة",
    title: "كل ما يحتاجه متجرك، في مكان واحد",
    description: "افتح ميزة لترى كيف تعمل مع متجرك.",
    items: [
      { id: "branches", title: "فروعك ومخزونك في شاشة واحدة", description: "تابع المبيعات والمخزون لكل فرع في الرياض وجدة والدمام، وتنبّه قبل نفاد أي صنف." },
      { id: "invoices", title: "فواتير ضريبية جاهزة", description: "فواتير متوافقة مع أنظمة هيئة الزكاة والضريبة والجمارك برمز الاستجابة السريعة، تصدر مع كل طلب." },
      { id: "payments", title: "مدفوعات يثق بها عملاؤك", description: "مدى وApple Pay وتمارا والتحويل البنكي، في الصفحة نفسها وبلا خطوات إضافية." },
      { id: "shipping", title: "شحن وتتبّع", description: "اختر شركة الشحن المناسبة لكل مدينة، ويصل رقم التتبّع إلى العميل عبر واتساب." },
    ],
  },
}

export { FeatureAccordion01, labelsEn, labelsAr, demo }
export type { FeatureAccordion01Props, AccordionFeature }
export default FeatureAccordion01
