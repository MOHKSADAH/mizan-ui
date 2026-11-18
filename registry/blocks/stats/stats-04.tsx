import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Stat = { value: string | number; label: string }

type Stats04Props = BlockBase & {
  lang?: Lang
  items: Stat[]
}

const labelsEn = {}
const labelsAr = {}

function Stats04({ lang = "en", items, id, className }: Stats04Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} as="div" spacing="compact" className={className}>
      <Container>
        <dl className="grid gap-6 rounded-lg bg-muted p-6 md:auto-cols-fr md:grid-flow-col">
          {items.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse gap-1 md:border-s md:ps-6 md:first:border-s-0 md:first:ps-0">
              <dt className="text-base text-muted-foreground">{label}</dt>
              <dd className="text-3xl font-semibold tabular-nums md:text-4xl">
                <bdi>{typeof value === "number" ? formatNumber(value, { lang }) : value}</bdi>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

const demo: { en: Stats04Props; ar: Stats04Props } = {
  en: {
    lang: "en",
    items: [
      { value: "+2,500", label: "Companies on the platform" },
      { value: "99.9%", label: "Platform uptime" },
      { value: 15, label: "Cities served" },
      { value: "24/7", label: "Support by chat" },
    ],
  },
  ar: {
    lang: "ar",
    items: [
      { value: "+2,500", label: "شركة تعمل على المنصة" },
      { value: "99.9%", label: "جاهزية المنصة" },
      { value: 15, label: "مدينة نخدمها" },
      { value: "24/7", label: "دعم عبر المحادثة" },
    ],
  },
}

export { Stats04, labelsEn, labelsAr, demo }
export type { Stats04Props, Stat }
export default Stats04
