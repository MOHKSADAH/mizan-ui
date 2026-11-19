import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Media } from "@/registry/lib/block-types"
import { formatDate } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type EditorialItem = {
  id: string
  title: string
  href?: string
  image: Media
  author: string
  program?: string
  // ISO date, formatted with the lang prop.
  date: string
}

type Editorial01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: Action
  lead: EditorialItem
  items: EditorialItem[]
}

const labelsEn = {}
const labelsAr = {}

function Meta({ item, lang }: { item: EditorialItem; lang: Lang }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
      <span className="font-semibold text-primary">{item.author}</span>
      {item.program ? (
        <>
          <span aria-hidden="true">·</span>
          <span>{item.program}</span>
        </>
      ) : null}
      <span aria-hidden="true">·</span>
      <time dateTime={item.date}>{formatDate(new Date(item.date), { lang })}</time>
    </p>
  )
}

const link = "after:absolute after:inset-0 hover:underline focus-visible:outline-2 focus-visible:outline-ring"

function Editorial01({ lang = "en", eyebrow, title, description, action, lead, items, headingLevel = 2, id, className }: Editorial01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          actions={
            action ? (
              <a href={action.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}>
                {action.label}
                <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
              </a>
            ) : null
          }
        />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
          <article className="relative flex flex-col gap-5">
            <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              <img src={lead.image.src} alt={lead.image.alt} width={lead.image.width} height={lead.image.height} className="size-full object-cover" />
            </div>
            <ItemHeading className="text-2xl leading-snug font-semibold text-balance md:text-3xl">
              <a href={lead.href ?? `#${lead.id}`} className={link}>
                {lead.title}
              </a>
            </ItemHeading>
            <Meta item={lead} lang={lang} />
          </article>
          <ul className="flex flex-col divide-y">
            {items.map((item) => (
              <li key={item.id} className="relative py-5 first:pt-0 last:pb-0">
                <article className="flex items-start gap-4">
                  <div className="aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-36">
                    <img src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" className="size-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <ItemHeading className="line-clamp-3 text-base leading-snug font-semibold md:text-lg">
                      <a href={item.href ?? `#${item.id}`} className={link}>
                        {item.title}
                      </a>
                    </ItemHeading>
                    <Meta item={item} lang={lang} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

const shop = (n: number, alt: string): Media => ({ src: `/examples/shop-${n}.svg`, alt, width: 400, height: 500 })

const demo: { en: Editorial01Props; ar: Editorial01Props } = {
  en: {
    lang: "en",
    eyebrow: "Rafid Journal",
    title: (
      <>
        <span>Stories from Saudi stores,</span> <span className="font-normal">told by the people who run them</span>
      </>
    ),
    action: { label: "All articles", href: "#articles" },
    lead: {
      id: "perfume-jeddah",
      title: "How a Jeddah perfume store doubled its sales before National Day",
      image: shop(2, "A perfume bottle in warm tones"),
      author: "Reem Al-Ghamdi",
      program: "Merchant Stories",
      date: "2026-11-12",
    },
    items: [
      { id: "zatca-phase-two", title: "E-invoicing: what changed in phase two?", image: shop(3, ""), author: "Khalid Al-Dosari", program: "Compliance Guide", date: "2026-11-09" },
      { id: "returns-season", title: "Three ways to cut clothing returns during sale season", image: shop(1, ""), author: "Noura Al-Shammari", program: "Store Operations", date: "2026-11-05" },
      { id: "bakery-khobar", title: "From one shop to six branches: a cafe founder in Khobar", image: shop(4, ""), author: "Sultan Al-Otaibi", program: "Rafid Podcast", date: "2026-10-29" },
      { id: "mada-apple-pay", title: "Why customers choose mada and Apple Pay at checkout", image: shop(5, ""), author: "Reem Al-Ghamdi", program: "Market Numbers", date: "2026-10-22" },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "مجلة رافد",
    title: (
      <>
        <span>حكايات المتاجر السعودية،</span> <span className="font-normal">يرويها من يديرونها</span>
      </>
    ),
    action: { label: "كل المقالات", href: "#articles" },
    lead: {
      id: "perfume-jeddah",
      title: "كيف ضاعف متجر عطور في جدة مبيعاته قبل اليوم الوطني",
      image: shop(2, "زجاجة عطر بألوان دافئة"),
      author: "ريم الغامدي",
      program: "قصص التجّار",
      date: "2026-11-12",
    },
    items: [
      { id: "zatca-phase-two", title: "الفوترة الإلكترونية: ما الذي تغيّر في المرحلة الثانية؟", image: shop(3, ""), author: "خالد الدوسري", program: "دليل الامتثال", date: "2026-11-09" },
      { id: "returns-season", title: "ثلاث طرق لتقليل مرتجعات الملابس في موسم التخفيضات", image: shop(1, ""), author: "نورة الشمري", program: "عمليات المتجر", date: "2026-11-05" },
      { id: "bakery-khobar", title: "من محل واحد إلى ستة فروع: مؤسس مقهى في الخبر", image: shop(4, ""), author: "سلطان العتيبي", program: "بودكاست رافد", date: "2026-10-29" },
      { id: "mada-apple-pay", title: "لماذا يفضّل عملاؤك الدفع بمدى وأبل باي؟", image: shop(5, ""), author: "ريم الغامدي", program: "أرقام السوق", date: "2026-10-22" },
    ],
  },
}

export { Editorial01, labelsEn, labelsAr, demo }
export type { Editorial01Props, EditorialItem }
export default Editorial01
