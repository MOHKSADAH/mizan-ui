import * as React from "react"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type ConceptCard = { mark: string; title: string; description: string }

type Hero12Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  // The giant display word. It is the page heading.
  title: React.ReactNode
  description: string
  primaryCta: Action
  secondaryCta?: Action
  // Three or four cards. Each is tilted around the middle of the row, and the tilt mirrors in RTL.
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
  const middle = (cards.length - 1) / 2
  return (
    <Section
      id={sid}
      spacing="hero"
      className={cn("overflow-hidden bg-primary pb-0 text-primary-foreground md:pb-0 lg:pb-0", className)}
    >
      <Container className="flex flex-col items-center gap-6 text-center">
        <Heading
          id={`${sid}-heading`}
          className="mb-2 text-[clamp(5.5rem,24vw,17rem)] leading-[1.15] font-black"
        >
          {title}
        </Heading>
        <p className="max-w-2xl text-xl font-medium text-balance md:text-2xl">{description}</p>
        <div className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row">
          <a href={primaryCta.href} {...external(primaryCta)} className={cn(buttonVariants({ variant: "secondary" }), cta)}>
            {primaryCta.label}
          </a>
          {secondaryCta ? (
            <a
              href={secondaryCta.href}
              {...external(secondaryCta)}
              className={cn(
                buttonVariants({ variant: "outline" }),
                cta,
                "border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground dark:bg-transparent dark:hover:bg-primary-foreground/10"
              )}
            >
              {secondaryCta.label}
            </a>
          ) : null}
        </div>
        <ul className="-mb-12 mt-10 grid w-full grid-cols-2 gap-4 md:mt-14 md:flex md:justify-center md:gap-0 lg:-mb-16">
          {cards.map((card, i) => (
            <li
              key={card.title}
              style={
                {
                  "--tilt": `${(i - middle) * 4}deg`,
                  "--drop": `${Math.abs(i - middle) * 1.25}rem`,
                } as React.CSSProperties
              }
              className="flex min-h-72 flex-col rounded-3xl border-2 border-foreground bg-card p-5 text-start text-card-foreground translate-y-(--drop) rotate-(--tilt) rtl:-rotate-(--tilt) md:w-60 md:not-first:-ms-6 lg:min-h-80 lg:w-64"
            >
              <span aria-hidden="true" className="text-3xl leading-none font-black text-primary">
                {card.mark}
              </span>
              <h3 className="mt-6 text-center text-3xl font-black">{card.title}</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">{card.description}</p>
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
