import * as React from "react"
import { ArrowRightIcon, ImageIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Media } from "@/registry/lib/block-types"
import { formatDate } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

// Without a src the slot shows a muted placeholder, so consumers can pass real photos later.
type EditorialImage = Omit<Media, "src"> & { src?: string }

type EditorialItem = {
  id: string
  title: string
  href?: string
  image: EditorialImage
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

function Photo({ image, className, loading }: { image: EditorialImage; className: string; loading?: "lazy" }) {
  return (
    <div className={cn("overflow-hidden bg-muted", className)}>
      {image.src ? (
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={loading} className="size-full object-cover" />
      ) : (
        <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
          <ImageIcon aria-hidden="true" weight="duotone" className="size-10" />
        </div>
      )}
    </div>
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
            <Photo image={lead.image} className="aspect-[4/3] rounded-xl" />
            <ItemHeading className="text-xl leading-snug font-semibold text-balance md:text-2xl">
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
                  <Photo image={item.image} loading="lazy" className="aspect-[4/3] w-28 shrink-0 rounded-lg sm:w-36" />
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

const photo = (alt: string): EditorialImage => ({ alt, width: 400, height: 300 })

const demo: { en: Editorial01Props; ar: Editorial01Props } = {
  en: {
    lang: "en",
    eyebrow: "Rafid Journal",
    title: "Stories from Saudi stores, told by the people who run them",
    action: { label: "All articles", href: "#articles" },
    lead: {
      id: "perfume-jeddah",
      title: "How a Jeddah perfume store doubled its sales before National Day",
      image: photo("A perfume bottle in warm tones"),
      author: "Reem Al-Ghamdi",
      program: "Merchant Stories",
      date: "2026-11-12",
    },
    items: [
      { id: "zatca-phase-two", title: "E-invoicing: what changed in phase two?", image: photo(""), author: "Khalid Al-Dosari", program: "Compliance Guide", date: "2026-11-09" },
      { id: "returns-season", title: "Three ways to cut clothing returns during sale season", image: photo(""), author: "Noura Al-Shammari", program: "Store Operations", date: "2026-11-05" },
      { id: "bakery-khobar", title: "From one shop to six branches: a cafe founder in Khobar", image: photo(""), author: "Sultan Al-Otaibi", program: "Rafid Podcast", date: "2026-10-29" },
      { id: "mada-apple-pay", title: "Why customers choose mada and Apple Pay at checkout", image: photo(""), author: "Reem Al-Ghamdi", program: "Market Numbers", date: "2026-10-22" },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "مجلة رافد",
    title: "حكايات المتاجر السعودية، يرويها من يديرونها",
    action: { label: "كل المقالات", href: "#articles" },
    lead: {
      id: "perfume-jeddah",
      title: "كيف ضاعف متجر عطور في جدة مبيعاته قبل اليوم الوطني",
      image: photo("زجاجة عطر بألوان دافئة"),
      author: "ريم الغامدي",
      program: "قصص التجّار",
      date: "2026-11-12",
    },
    items: [
      { id: "zatca-phase-two", title: "الفوترة الإلكترونية: ما الذي تغيّر في المرحلة الثانية؟", image: photo(""), author: "خالد الدوسري", program: "دليل الامتثال", date: "2026-11-09" },
      { id: "returns-season", title: "ثلاث طرق لتقليل مرتجعات الملابس في موسم التخفيضات", image: photo(""), author: "نورة الشمري", program: "عمليات المتجر", date: "2026-11-05" },
      { id: "bakery-khobar", title: "من محل واحد إلى ستة فروع: مؤسس مقهى في الخبر", image: photo(""), author: "سلطان العتيبي", program: "بودكاست رافد", date: "2026-10-29" },
      { id: "mada-apple-pay", title: "لماذا يفضّل عملاؤك الدفع بمدى وأبل باي؟", image: photo(""), author: "ريم الغامدي", program: "أرقام السوق", date: "2026-10-22" },
    ],
  },
}

export { Editorial01, labelsEn, labelsAr, demo }
export type { Editorial01Props, EditorialItem, EditorialImage }
export default Editorial01
