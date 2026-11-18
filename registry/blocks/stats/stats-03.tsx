import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Trend = { direction: "up" | "down"; label: string }
type Stat = { value: string | number; label: string; trend?: Trend }

type Stats03Props = BlockBase & {
  lang?: Lang
  title?: string
  description?: string
  items: Stat[]
}

const labelsEn = {}
const labelsAr = {}

function Stats03({ lang = "en", title, description, items, headingLevel = 2, id, className }: Stats03Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} as={title ? "section" : "div"} className={className}>
      <Container>
        {title ? (
          <SectionHeader id={sid} title={title} description={description} headingLevel={headingLevel} align="center" />
        ) : null}
        <dl className="grid gap-4 md:grid-cols-3">
          {items.map(({ value, label, trend }) => (
            <Card key={label} className="md:[--card-spacing:--spacing(6)]">
              <dt className="px-(--card-spacing) text-sm text-muted-foreground">{label}</dt>
              <dd className="px-(--card-spacing) text-3xl font-semibold tabular-nums md:text-4xl">
                <bdi>{typeof value === "number" ? formatNumber(value, { lang }) : value}</bdi>
              </dd>
              {trend ? (
                <dd className="px-(--card-spacing)">
                  <Badge variant="secondary" className={cn("h-6 gap-1 text-sm", trend.direction === "up" ? "text-success" : "text-destructive")}>
                    {trend.direction === "up" ? (
                      <ArrowUpIcon aria-hidden="true" weight="bold" />
                    ) : (
                      <ArrowDownIcon aria-hidden="true" weight="bold" />
                    )}
                    <bdi>{trend.label}</bdi>
                  </Badge>
                </dd>
              ) : null}
            </Card>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

const demo: { en: Stats03Props; ar: Stats03Props } = {
  en: {
    lang: "en",
    title: "This quarter at a glance",
    description: "Compared with the previous quarter.",
    items: [
      { value: "SAR 1.2M", label: "Invoiced", trend: { direction: "up", label: "+12%" } },
      { value: 342, label: "New customers", trend: { direction: "up", label: "+8%" } },
      { value: "2.1 days", label: "Average payment time", trend: { direction: "down", label: "-15%" } },
    ],
  },
  ar: {
    lang: "ar",
    title: "نظرة على هذا الربع",
    description: "مقارنة بالربع السابق.",
    items: [
      { value: "1.2 مليون ر.س", label: "إجمالي الفواتير", trend: { direction: "up", label: "+12%" } },
      { value: 342, label: "عملاء جدد", trend: { direction: "up", label: "+8%" } },
      { value: "2.1 يوم", label: "متوسط مدة السداد", trend: { direction: "down", label: "-15%" } },
    ],
  },
}

export { Stats03, labelsEn, labelsAr, demo }
export type { Stats03Props, Stat, Trend }
export default Stats03
