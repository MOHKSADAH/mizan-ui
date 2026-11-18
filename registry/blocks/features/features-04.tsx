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

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Feature = { icon?: Icon; title: string; description: string }

type Features04Props = BlockBase & {
  eyebrow?: string
  title: string
  description?: string
  cta?: Action
  items: Feature[]
}

const labelsEn = {}
const labelsAr = {}

function Features04({ eyebrow, title, description, cta, items, headingLevel = 2, id, className }: Features04Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <SectionHeader
            id={sid}
            eyebrow={eyebrow}
            title={title}
            description={description}
            headingLevel={headingLevel}
            className="mb-0 md:mb-0 md:flex-col md:items-start md:justify-start"
          />
          {cta ? (
            <a
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
              className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
            >
              {cta.label}
            </a>
          ) : null}
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
          {items.map(({ icon: ItemIcon, title: itemTitle, description: itemDescription }) => (
            <li key={itemTitle} className="flex flex-col items-start gap-4">
              {ItemIcon ? (
                <span className="flex size-10 items-center justify-center rounded-md bg-muted">
                  <ItemIcon aria-hidden="true" weight="regular" className="size-5" />
                </span>
              ) : null}
              <div className="flex flex-col gap-2">
                <ItemHeading className="text-lg font-semibold md:text-xl">{itemTitle}</ItemHeading>
                <p className="text-base text-muted-foreground">{itemDescription}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const icons = [ReceiptIcon, PackageIcon, ChartLineUpIcon, UsersThreeIcon, CreditCardIcon, HeadsetIcon]

const demo: { en: Features04Props; ar: Features04Props } = {
  en: {
    eyebrow: "Why Rafid",
    title: "Everything a growing company needs",
    description: "Connected tools that save time and keep every team on the same numbers.",
    cta: { label: "Start free trial", href: "#start" },
    items: [
      { title: "Compliant invoices", description: "Tax invoices with the QR code, sent in one click." },
      { title: "Inventory control", description: "Stock across warehouses with low-stock alerts." },
      { title: "Live reports", description: "Sales and profit that update as you work." },
      { title: "Team permissions", description: "Control what each employee can see and change." },
      { title: "Payment methods", description: "Accept mada, Apple Pay and bank transfer." },
      { title: "Arabic support", description: "A Saudi team that answers on WhatsApp." },
    ].map((item, i) => ({ ...item, icon: icons[i] })),
  },
  ar: {
    eyebrow: "لماذا رافد",
    title: "كل ما تحتاجه شركة متنامية",
    description: "أدوات متكاملة توفر الوقت وتجمع الفرق على الأرقام نفسها.",
    cta: { label: "ابدأ تجربتك المجانية", href: "#start" },
    items: [
      { title: "فواتير متوافقة", description: "فواتير ضريبية برمز الاستجابة السريعة تُرسل بضغطة واحدة." },
      { title: "إدارة المخزون", description: "تابع الكميات في المستودعات مع تنبيهات انخفاض المخزون." },
      { title: "تقارير فورية", description: "مبيعات وأرباح تتحدث أثناء عملك." },
      { title: "صلاحيات الفريق", description: "تحكم فيما يراه كل موظف وما يعدله." },
      { title: "طرق الدفع", description: "اقبل مدى وأبل باي والتحويل البنكي." },
      { title: "دعم بالعربية", description: "فريق سعودي يرد عليك عبر واتساب." },
    ].map((item, i) => ({ ...item, icon: icons[i] })),
  },
}

export { Features04, labelsEn, labelsAr, demo }
export type { Features04Props, Feature }
export default Features04
