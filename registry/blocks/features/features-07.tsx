import * as React from "react"
import {
  CreditCardIcon,
  HandCoinsIcon,
  KeyReturnIcon,
  TruckIcon,
} from "@phosphor-icons/react/ssr"
import type { Icon } from "@phosphor-icons/react"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Feature = { icon?: Icon; title: string; description: string }

type Features07Props = BlockBase & {
  title: string
  items: Feature[]
}

const labelsEn = {}
const labelsAr = {}

function Features07({ title, items, headingLevel = 2, id, className }: Features07Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} spacing="compact" className={cn("border-y", className)}>
      <Container>
        <Heading id={`${sid}-heading`} className="sr-only">
          {title}
        </Heading>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map(({ icon: ItemIcon, title: itemTitle, description }) => (
            <li key={itemTitle} className="flex flex-col items-start gap-2 sm:flex-row sm:gap-3">
              {ItemIcon ? (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                  <ItemIcon aria-hidden="true" weight="regular" className="size-5" />
                </span>
              ) : null}
              <div className="flex flex-col gap-0.5">
                <ItemHeading className="text-base font-semibold">{itemTitle}</ItemHeading>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const icons = [TruckIcon, KeyReturnIcon, HandCoinsIcon, CreditCardIcon]

const demo: { en: Features07Props; ar: Features07Props } = {
  en: {
    title: "Why shop with us",
    items: [
      { title: "Fast shipping", description: "Your order arrives in a few days" },
      { title: "Easy returns", description: "Exchange or return with no hassle" },
      { title: "Cash on delivery", description: "Pay in cash when your order arrives" },
      { title: "Secure payment", description: "mada, Apple Pay and credit cards" },
    ].map((item, i) => ({ ...item, icon: icons[i] })),
  },
  ar: {
    title: "لماذا تتسوق معنا",
    items: [
      { title: "شحن سريع", description: "يصلك طلبك خلال أيام قليلة" },
      { title: "إرجاع سهل", description: "استبدل أو أرجع منتجك بكل سهولة" },
      { title: "الدفع عند الاستلام", description: "ادفع نقدًا عند وصول طلبك" },
      { title: "دفع آمن", description: "مدى وأبل باي وبطاقات الائتمان" },
    ].map((item, i) => ({ ...item, icon: icons[i] })),
  },
}

export { Features07, labelsEn, labelsAr, demo }
export type { Features07Props, Feature }
export default Features07
