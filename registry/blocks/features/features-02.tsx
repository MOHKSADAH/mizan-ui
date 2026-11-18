import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Media } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Feature = { title: string; description: string; media: Media | React.ReactNode }

type Features02Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  items: Feature[]
}

const labelsEn = {}
const labelsAr = {}

const isMedia = (m: Media | React.ReactNode): m is Media =>
  typeof m === "object" && m !== null && !React.isValidElement(m) && "src" in m

function Features02({ eyebrow, title, description, items, headingLevel = 2, id, className }: Features02Props) {
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
          align="center"
        />
        <ul className="flex flex-col gap-12 lg:gap-24">
          {items.map(({ title: itemTitle, description: itemDescription, media }) => (
            <li key={itemTitle} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 lg:even:[&>:first-child]:order-last">
              <div className="aspect-[4/3] overflow-hidden rounded-lg border">
                {isMedia(media) ? (
                  <img src={media.src} alt={media.alt} width={media.width} height={media.height} className="size-full object-cover" />
                ) : (
                  media
                )}
              </div>
              <div className="flex flex-col gap-3">
                <ItemHeading className="text-xl font-semibold md:text-2xl">{itemTitle}</ItemHeading>
                <p className="max-w-prose text-base text-muted-foreground md:text-lg">{itemDescription}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const demo: { en: Features02Props; ar: Features02Props } = {
  en: {
    eyebrow: "How it helps",
    title: "Built around the way you work",
    description: "Three tools that remove the daily manual work from your team.",
    items: [
      { title: "Invoices that comply from day one", description: "Issue tax invoices with the QR code and send them to your customer on WhatsApp or email.", media: placeholder },
      { title: "Stock you can trust", description: "Count, transfer and reorder across warehouses and branches, with an alert before an item runs out.", media: placeholder },
      { title: "Reports for every decision", description: "Compare branches, products and months on a dashboard that updates as your team works.", media: placeholder },
    ],
  },
  ar: {
    eyebrow: "كيف يساعدك",
    title: "مصمم حول طريقة عملك",
    description: "ثلاث أدوات تزيل العمل اليدوي اليومي عن فريقك.",
    items: [
      { title: "فواتير متوافقة منذ اليوم الأول", description: "أصدر فواتير ضريبية برمز الاستجابة السريعة وأرسلها لعميلك عبر واتساب أو البريد الإلكتروني.", media: placeholder },
      { title: "مخزون تثق بأرقامه", description: "اجرد وانقل وأعد الطلب بين المستودعات والفروع، مع تنبيه قبل نفاد أي منتج.", media: placeholder },
      { title: "تقارير لكل قرار", description: "قارن الفروع والمنتجات والأشهر في لوحة تتحدث أثناء عمل فريقك.", media: placeholder },
    ],
  },
}

export { Features02, labelsEn, labelsAr, demo }
export type { Features02Props, Feature }
export default Features02
