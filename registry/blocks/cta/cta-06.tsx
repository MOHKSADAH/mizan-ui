import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Cta06Props = BlockBase & {
  // Write the key words in <strong>: the heading is regular weight, so the contrast is real.
  title: React.ReactNode
  cta: Action
}

const labelsEn = {}
const labelsAr = {}

function Cta06({ title, cta, headingLevel = 2, id, className }: Cta06Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  return (
    <Section id={sid} className={className}>
      <Container>
        <div className="flex flex-col items-center gap-10 rounded-3xl bg-secondary px-6 py-16 text-center text-secondary-foreground md:py-24 lg:py-32">
          <Heading id={`${sid}-heading`} className="max-w-4xl text-5xl font-normal text-balance md:text-6xl lg:text-7xl">
            {title}
          </Heading>
          <a href={cta.href} className={cn(buttonVariants(), "h-14 w-full px-8 text-lg sm:w-auto")}>
            {cta.label}
            <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
          </a>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Cta06Props; ar: Cta06Props } = {
  en: {
    title: (
      <>
        <strong>Your first store</strong> starts here
      </>
    ),
    cta: { label: "Start your free trial", href: "#start" },
  },
  ar: {
    title: (
      <>
        <strong>متجرك الأول</strong> يبدأ من هنا
      </>
    ),
    cta: { label: "ابدأ تجربتك المجانية", href: "#start" },
  },
}

export { Cta06, labelsEn, labelsAr, demo }
export type { Cta06Props }
export default Cta06
