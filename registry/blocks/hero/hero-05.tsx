import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Media } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Hero05Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  eyebrow?: string
  title: string
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  media: Media | React.ReactNode
}

const labelsEn = {}
const labelsAr = {}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

const isMedia = (m: Media | React.ReactNode): m is Media =>
  typeof m === "object" && m !== null && !React.isValidElement(m) && "src" in m

function Hero05({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
  headingLevel = 1,
  id,
  className,
}: Hero05Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="flex flex-col items-center gap-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
          <Heading id={`${sid}-heading`} className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
            {title}
          </Heading>
          {description ? <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{description}</p> : null}
          <div className="flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row">
            <a href={primaryCta.href} {...external(primaryCta)} className={cn(buttonVariants(), cta)}>
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <a href={secondaryCta.href} {...external(secondaryCta)} className={cn(buttonVariants({ variant: "outline" }), cta)}>
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border">
          {isMedia(media) ? (
            <img src={media.src} alt={media.alt} width={media.width} height={media.height} className="size-full object-cover" />
          ) : (
            media
          )}
        </div>
      </Container>
    </Section>
  )
}

const placeholder = (
  <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
    <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
  </div>
)

const demo: { en: Hero05Props; ar: Hero05Props } = {
  en: {
    eyebrow: "New dashboard",
    title: "See your whole business on one screen",
    description: "Sales, stock and cash flow update as your team works, so you decide on today's numbers.",
    primaryCta: { label: "Start free trial", href: "#start" },
    secondaryCta: { label: "See pricing", href: "#pricing" },
    media: placeholder,
  },
  ar: {
    eyebrow: "لوحة التحكم الجديدة",
    title: "شاهد أعمالك كاملة على شاشة واحدة",
    description: "تتحدث المبيعات والمخزون والتدفق النقدي أثناء عمل فريقك، لتقرر بناءً على أرقام اليوم.",
    primaryCta: { label: "ابدأ تجربتك المجانية", href: "#start" },
    secondaryCta: { label: "اطلع على الأسعار", href: "#pricing" },
    media: placeholder,
  },
}

export { Hero05, labelsEn, labelsAr, demo }
export type { Hero05Props }
export default Hero05
