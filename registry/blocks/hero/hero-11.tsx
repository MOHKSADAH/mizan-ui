import * as React from "react"

import type { Action, BlockBase, Media } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Hero11Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  // A pill above the title, for example a project status.
  eyebrow?: React.ReactNode
  // Mix weights with <strong>: the heading is font-normal, so the strong part stands out.
  title: React.ReactNode
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  media: Media
  // Short facts under the buttons, for example a region, a phase count and a delivery year.
  facts?: React.ReactNode[]
}

const labelsEn = {}
const labelsAr = {}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

function Hero11({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
  facts,
  headingLevel = 1,
  id,
  className,
}: Hero11Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section
      id={sid}
      spacing="compact"
      className={cn(
        "relative flex min-h-[34rem] items-end overflow-hidden bg-muted pt-56 md:min-h-[40rem] md:pt-8 lg:min-h-[44rem] lg:pt-10",
        className
      )}
    >
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        className="absolute inset-0 size-full object-cover"
      />
      <Container className="relative">
        <div className="flex max-w-xl flex-col items-start gap-5 rounded-3xl border bg-background p-6 md:p-8">
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium">
              {eyebrow}
            </p>
          ) : null}
          <Heading id={`${sid}-heading`} className="text-4xl font-normal text-balance md:text-5xl">
            {title}
          </Heading>
          {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
          {facts?.length ? (
            <ul className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 border-t pt-5 text-sm font-medium">
              {facts.map((fact, i) => (
                <li key={i} className="flex items-center gap-4">
                  {i > 0 ? <span aria-hidden="true" className="text-muted-foreground">·</span> : null}
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Hero11Props; ar: Hero11Props } = {
  en: {
    eyebrow: "New residential project",
    title: (
      <>
        <strong>Villas in the north of Riyadh</strong> with room to breathe
      </>
    ),
    description: "Plots from 450 sqm, wide streets and a park within five minutes of every home.",
    primaryCta: { label: "Book a site visit", href: "#visit" },
    secondaryCta: { label: "Download the brochure", href: "#brochure" },
    media: { src: "/examples/estate.svg", alt: "Villas with flat roofs and palm trees at sunset", width: 1600, height: 900 },
    facts: ["Riyadh region", <>4 phases</>, <>Delivery <bdi>2027</bdi></>],
  },
  ar: {
    eyebrow: "مشروع سكني جديد",
    title: (
      <>
        <strong>فلل شمال الرياض</strong> بمساحات تتسع لك
      </>
    ),
    description: "قطع من 450 م² وشوارع عريضة وحديقة على بُعد خمس دقائق من كل منزل.",
    primaryCta: { label: "احجز زيارة للموقع", href: "#visit" },
    secondaryCta: { label: "حمّل الكتيّب", href: "#brochure" },
    media: { src: "/examples/estate.svg", alt: "فلل بأسطح مستوية ونخيل عند الغروب", width: 1600, height: 900 },
    facts: ["منطقة الرياض", <><bdi>4</bdi> مراحل</>, <>تسليم <bdi>2027</bdi></>],
  },
}

export { Hero11, labelsEn, labelsAr, demo }
export type { Hero11Props }
export default Hero11
