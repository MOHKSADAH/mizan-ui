import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Stat = { value: string | number; label: string }

type Stats01Props = BlockBase & {
  lang?: Lang
  title?: string
  description?: string
  items: Stat[]
}

const labelsEn = {}
const labelsAr = {}

function Stats01({ lang = "en", title, description, items, headingLevel = 2, id, className }: Stats01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} as={title ? "section" : "div"} className={className}>
      <Container>
        {title ? (
          <SectionHeader
            id={sid}
            title={title}
            description={description}
            headingLevel={headingLevel}
            align="center"
          />
        ) : null}
        <dl
          className={cn(
            "grid gap-8 text-center",
            items.length === 3 ? "sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
          )}
        >
          {items.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse gap-2">
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

const demo: { en: Stats01Props; ar: Stats01Props } = {
  en: {
    lang: "en",
    title: "Numbers we are proud of",
    description: "Growing businesses across the Kingdom run on Rafid every day.",
    items: [
      { value: "+2,500", label: "Companies on the platform" },
      { value: "99.9%", label: "Platform uptime" },
      { value: 15, label: "Cities served in the Kingdom" },
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
      { value: 15, label: "مدينة نخدمها في المملكة" },
      { value: "24/7", label: "دعم عبر المحادثة" },
    ],
  },
}

export { Stats01, labelsEn, labelsAr, demo }
export type { Stats01Props, Stat }
export default Stats01
