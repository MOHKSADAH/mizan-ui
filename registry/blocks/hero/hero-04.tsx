import * as React from "react"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type HeroStat = { value: string | number; label: string }

type Hero04Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  stats: HeroStat[]
}

const labelsEn = {}
const labelsAr = {}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

function Hero04({
  lang = "en",
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  stats,
  headingLevel = 1,
  id,
  className,
}: Hero04Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  const values = stats.map((s) => (typeof s.value === "number" ? formatNumber(s.value, { lang }) : s.value))
  const short = values.every((v) => v.length <= 5)
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="flex flex-col items-start gap-6">
        {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
        <Heading id={`${sid}-heading`} className="max-w-3xl text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
          {title}
        </Heading>
        {description ? <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{description}</p> : null}
        <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
          <a href={primaryCta.href} {...external(primaryCta)} className={cn(buttonVariants(), cta)}>
            {primaryCta.label}
          </a>
          {secondaryCta ? (
            <a href={secondaryCta.href} {...external(secondaryCta)} className={cn(buttonVariants({ variant: "outline" }), cta)}>
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
        <dl className={cn("mt-6 grid w-full gap-6 border-t pt-6", short ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-3")}>
          {stats.map(({ label }, i) => (
            <div key={label} className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="text-2xl font-semibold tabular-nums md:text-3xl">
                <bdi>{values[i]}</bdi>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

const demo: { en: Hero04Props; ar: Hero04Props } = {
  en: {
    lang: "en",
    eyebrow: "Business software",
    title: "Run your business with clarity and confidence",
    description: "Invoices, inventory and reports in one system, built for companies in the Kingdom.",
    primaryCta: { label: "Start free trial", href: "#start" },
    secondaryCta: { label: "Book a demo", href: "#demo" },
    stats: [
      { value: 2500, label: "Companies" },
      { value: "99.9%", label: "Uptime" },
      { value: 15, label: "Cities" },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "برنامج إدارة الأعمال",
    title: "أدر أعمالك بوضوح وثقة",
    description: "فواتير ومخزون وتقارير في نظام واحد، صُمم لشركات المملكة.",
    primaryCta: { label: "ابدأ تجربتك المجانية", href: "#start" },
    secondaryCta: { label: "احجز عرضًا تجريبيًا", href: "#demo" },
    stats: [
      { value: 2500, label: "شركة" },
      { value: "99.9%", label: "جاهزية المنصة" },
      { value: 15, label: "مدينة" },
    ],
  },
}

export { Hero04, labelsEn, labelsAr, demo }
export type { Hero04Props, HeroStat }
export default Hero04
