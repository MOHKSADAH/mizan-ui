import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Stat = { value: string | number; label: string }

type Stats02Props = BlockBase & {
  lang?: Lang
  title: string
  description?: string
  items: Stat[]
}

const labelsEn = {}
const labelsAr = {}

function Stats02({ lang = "en", title, description, items, headingLevel = 2, id, className }: Stats02Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <SectionHeader
          id={sid}
          title={title}
          description={description}
          headingLevel={headingLevel}
          className="mb-0 md:mb-0 md:flex-col md:items-start md:justify-start"
        />
        <dl className="grid grid-cols-2 gap-8">
          {items.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse gap-2 border-s ps-6">
              <dt className="text-base text-muted-foreground">{label}</dt>
              <dd className="text-4xl font-semibold tabular-nums">
                <bdi>{typeof value === "number" ? formatNumber(value, { lang }) : value}</bdi>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

const demo: { en: Stats02Props; ar: Stats02Props } = {
  en: {
    lang: "en",
    title: "Numbers we are proud of",
    description: "Growing businesses across the Kingdom run on Rafid every day.",
    items: [
      { value: "+2,500", label: "Companies on the platform" },
      { value: "99.9%", label: "Platform uptime" },
      { value: 15, label: "Cities served" },
      { value: "24/7", label: "Support by chat" },
    ],
  },
  ar: {
    lang: "ar",
    title: "أرقام نفخر بها",
    description: "شركات متنامية في أنحاء المملكة تعتمد على رافد كل يوم.",
    items: [
      { value: "+2,500", label: "شركة تعمل على المنصة" },
      { value: "99.9%", label: "جاهزية المنصة" },
      { value: 15, label: "مدينة نخدمها" },
      { value: "24/7", label: "دعم عبر المحادثة" },
    ],
  },
}

export { Stats02, labelsEn, labelsAr, demo }
export type { Stats02Props, Stat }
export default Stats02
