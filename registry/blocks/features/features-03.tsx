import * as React from "react"
import {
  ChartLineUpIcon,
  CreditCardIcon,
  HeadsetIcon,
  PackageIcon,
  ReceiptIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr"
import type { Icon } from "@phosphor-icons/react"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Span = 4 | 6 | 8
type Feature = { icon?: Icon; title: string; description: string; span: Span }

type Features03Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  items: Feature[]
}

const labelsEn = {}
const labelsAr = {}

const SPAN: Record<Span, string> = {
  4: "md:col-span-3 lg:col-span-4",
  6: "md:col-span-3 lg:col-span-6",
  8: "md:col-span-6 lg:col-span-8",
}

function Features03({ eyebrow, title, description, items, headingLevel = 2, id, className }: Features03Props) {
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
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
          {items.map(({ icon: ItemIcon, title: itemTitle, description: itemDescription, span }) => (
            <li key={itemTitle} className={cn(SPAN[span])}>
              <Card className="h-full md:[--card-spacing:--spacing(6)]">
                <CardContent className="flex h-full flex-col items-start gap-4">
                  {ItemIcon ? (
                    <span className="flex size-10 items-center justify-center rounded-md bg-muted">
                      <ItemIcon aria-hidden="true" weight="regular" className="size-5" />
                    </span>
                  ) : null}
                  <div className="flex flex-col gap-2">
                    <ItemHeading className="text-lg font-semibold md:text-xl">{itemTitle}</ItemHeading>
                    <p className="text-base text-muted-foreground">{itemDescription}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const icons = [ReceiptIcon, ChartLineUpIcon, PackageIcon, UsersThreeIcon, CreditCardIcon, HeadsetIcon]
const spans: Span[] = [8, 4, 4, 4, 4, 4]

const demo: { en: Features03Props; ar: Features03Props } = {
  en: {
    eyebrow: "Platform",
    title: "One platform, every back-office task",
    description: "Start with what you need today and add the rest when you grow.",
    items: [
      { title: "Compliant invoices", description: "Issue tax invoices that meet ZATCA requirements with the QR code included, and send them to customers in one click." },
      { title: "Live reports", description: "Sales and profit on a clear dashboard." },
      { title: "Inventory control", description: "Stock across warehouses and branches." },
      { title: "Team permissions", description: "Decide what each employee can see." },
      { title: "Payments", description: "Accept mada, Apple Pay and transfers." },
      { title: "Arabic support", description: "A Saudi team on WhatsApp in business hours." },
    ].map((item, i) => ({ ...item, icon: icons[i], span: spans[i] })),
  },
  ar: {
    eyebrow: "المنصة",
    title: "منصة واحدة لكل مهام الإدارة الخلفية",
    description: "ابدأ بما تحتاجه اليوم وأضف الباقي حين تنمو.",
    items: [
      { title: "فواتير متوافقة", description: "أصدر فواتير ضريبية تلبي متطلبات هيئة الزكاة والضريبة والجمارك برمز الاستجابة السريعة، وأرسلها لعملائك بضغطة واحدة." },
      { title: "تقارير فورية", description: "المبيعات والأرباح في لوحة واضحة." },
      { title: "إدارة المخزون", description: "الكميات في المستودعات والفروع." },
      { title: "صلاحيات الفريق", description: "حدد ما يراه كل موظف." },
      { title: "المدفوعات", description: "اقبل مدى وأبل باي والتحويل." },
      { title: "دعم بالعربية", description: "فريق سعودي عبر واتساب في أوقات العمل." },
    ].map((item, i) => ({ ...item, icon: icons[i], span: spans[i] })),
  },
}

export { Features03, labelsEn, labelsAr, demo }
export type { Features03Props, Feature, Span }
export default Features03
