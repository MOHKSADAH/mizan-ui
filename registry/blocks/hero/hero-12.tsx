import * as React from "react"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type ConceptCard = { mark: string; title: string; description: string }

type Hero12Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  // The studio name. It is the page heading.
  title: string
  description: string
  primaryCta: Action
  secondaryCta?: Action
  // Three or four cards in a row. The mark is a small letter label.
  cards: ConceptCard[]
}

const labelsEn = {}
const labelsAr = {}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

function Hero12({ title, description, primaryCta, secondaryCta, cards, headingLevel = 1, id, className }: Hero12Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="flex flex-col items-center gap-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Heading id={`${sid}-heading`} className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
            {title}
          </Heading>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{description}</p>
          <div className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row">
            <a href={primaryCta.href} {...external(primaryCta)} className={cn(buttonVariants(), cta)}>
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <a
                href={secondaryCta.href}
                {...external(secondaryCta)}
                className={cn(buttonVariants({ variant: "outline" }), cta)}
              >
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <li key={card.title} className="flex">
              <Card className="w-full gap-2 px-4">
                <span aria-hidden="true" className="text-sm font-medium text-muted-foreground">
                  {card.mark}
                </span>
                <h3 className="text-lg font-semibold md:text-xl">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const demo: { en: Hero12Props; ar: Hero12Props } = {
  en: {
    title: "Awraq",
    description: "A Riyadh studio for brands: identity, content, ads and growth, dealt like one hand.",
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#work" },
    cards: [
      { mark: "A", title: "Identity", description: "A name, a mark and a voice that people remember." },
      { mark: "B", title: "Content", description: "Stories that earn attention and keep it." },
      { mark: "C", title: "Ads", description: "Paid reach that follows what the numbers say." },
      { mark: "D", title: "Growth", description: "A measured next step, every month." },
    ],
  },
  ar: {
    title: "أوراق",
    description: "استوديو في الرياض للعلامات التجارية: هوية ومحتوى وإعلانات ونمو، في يدٍ واحدة.",
    primaryCta: { label: "تواصل معنا", href: "#contact" },
    secondaryCta: { label: "شاهد أعمالنا", href: "#work" },
    cards: [
      { mark: "أ", title: "هوية", description: "اسم وشعار ونبرة تبقى في الذاكرة." },
      { mark: "ب", title: "محتوى", description: "حكايات تكسب الانتباه وتحافظ عليه." },
      { mark: "ج", title: "إعلانات", description: "وصول مدفوع يتبع ما تقوله الأرقام." },
      { mark: "د", title: "نمو", description: "خطوة محسوبة نحو الأمام كل شهر." },
    ],
  },
}

export { Hero12, labelsEn, labelsAr, demo }
export type { Hero12Props, ConceptCard as Hero12Card }
export default Hero12
