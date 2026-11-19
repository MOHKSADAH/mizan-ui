import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Cta06Props = BlockBase & {
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
        <Card className="md:[--card-spacing:--spacing(10)]">
          <CardContent className="flex flex-col items-center gap-6 text-center">
            <Heading id={`${sid}-heading`} className="max-w-3xl text-2xl font-semibold text-balance md:text-3xl lg:text-4xl">
              {title}
            </Heading>
            <a href={cta.href} className={cn(buttonVariants(), "h-12 w-full gap-2 px-6 text-base sm:w-auto")}>
              {cta.label}
              <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
            </a>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

const demo: { en: Cta06Props; ar: Cta06Props } = {
  en: {
    title: "Your first store starts here",
    cta: { label: "Start your free trial", href: "#start" },
  },
  ar: {
    title: "متجرك الأول يبدأ من هنا",
    cta: { label: "ابدأ تجربتك المجانية", href: "#start" },
  },
}

export { Cta06, labelsEn, labelsAr, demo }
export type { Cta06Props }
export default Cta06
