import * as React from "react"
import {
  CreditCardIcon,
  HeadsetIcon,
  ChartLineUpIcon,
  PackageIcon,
  ReceiptIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr"
import type { Icon } from "@phosphor-icons/react"

import type { BlockBase } from "@/registry/lib/block-types"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Feature = { icon?: Icon; title: string; description: string }

type Features01Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  items: Feature[]
}

const labelsEn = {}
const labelsAr = {}

function Features01({ eyebrow, title, description, items, headingLevel = 2, id, className }: Features01Props) {
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
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: ItemIcon, title: itemTitle, description: itemDescription }) => (
            <li key={itemTitle}>
              <Card className="h-full md:[--card-spacing:--spacing(6)]">
                <CardContent className="flex flex-col items-start gap-4">
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

const icons = [ReceiptIcon, PackageIcon, ChartLineUpIcon, UsersThreeIcon, CreditCardIcon, HeadsetIcon]

const demo: { en: Features01Props; ar: Features01Props } = {
  en: {
    eyebrow: "Features",
    title: "Everything you need to run your business",
    description: "Connected tools that save you time and keep your team informed.",
    items: [
      { title: "Compliant invoices", description: "Issue tax invoices that meet ZATCA requirements, with the QR code included." },
      { title: "Inventory control", description: "Track stock across warehouses and branches and get an alert before items run out." },
      { title: "Live reports", description: "See sales and profit on a clear dashboard that updates as you work." },
      { title: "Team permissions", description: "Decide exactly what each employee can see and what they can change." },
      { title: "Multiple payment methods", description: "Accept mada, Apple Pay, STC Pay and bank transfer from one system." },
      { title: "Arabic support", description: "A Saudi support team that answers on WhatsApp during business hours." },
    ].map((item, i) => ({ ...item, icon: icons[i] })),
  },
  ar: {
    eyebrow: "المزايا",
    title: "كل ما تحتاجه لإدارة أعمالك",
    description: "أدوات متكاملة توفر وقتك وتبقي فريقك على اطلاع.",
    items: [
      { title: "فواتير متوافقة", description: "أصدر فواتير ضريبية تلبي متطلبات هيئة الزكاة والضريبة والجمارك، مع رمز الاستجابة السريعة." },
      { title: "إدارة المخزون", description: "تابع الكميات في مستودعاتك وفروعك، وتلقَّ تنبيهًا قبل نفاد المنتجات." },
      { title: "تقارير فورية", description: "اطلع على المبيعات والأرباح في لوحة واضحة تتحدث أثناء عملك." },
      { title: "صلاحيات الفريق", description: "حدد بدقة ما يراه كل موظف وما يمكنه تعديله." },
      { title: "طرق دفع متعددة", description: "اقبل مدى وأبل باي وSTC Pay والتحويل البنكي من نظام واحد." },
      { title: "دعم باللغة العربية", description: "فريق دعم سعودي يرد عليك عبر واتساب خلال ساعات العمل." },
    ].map((item, i) => ({ ...item, icon: icons[i] })),
  },
}

export { Features01, labelsEn, labelsAr, demo }
export type { Features01Props, Feature }
export default Features01
