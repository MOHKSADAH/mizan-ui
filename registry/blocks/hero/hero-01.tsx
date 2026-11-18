import * as React from "react"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"
import { WhatsAppButton } from "@/registry/ui/whatsapp-button"

type Hero01Labels = { whatsapp: string; whatsappOpens: string }

type Hero01Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  eyebrow?: string
  title: string
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  whatsapp?: { phone: string; message: string }
  labels?: Partial<Hero01Labels>
}

const labelsEn: Hero01Labels = { whatsapp: "Chat on WhatsApp", whatsappOpens: "(opens WhatsApp)" }
const labelsAr: Hero01Labels = { whatsapp: "تواصل عبر واتساب", whatsappOpens: "(يفتح واتساب)" }

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

function Hero01({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  whatsapp,
  headingLevel = 1,
  labels,
  id,
  className,
}: Hero01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
          <Heading
            id={`${sid}-heading`}
            className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl"
          >
            {title}
          </Heading>
          {description ? (
            <p className="max-w-2xl text-lg text-balance text-muted-foreground md:text-xl">{description}</p>
          ) : null}
          <div className="flex w-full flex-col items-center justify-center gap-3 pt-2 sm:w-auto sm:flex-row">
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
            {whatsapp ? (
              <WhatsAppButton
                phone={whatsapp.phone}
                message={whatsapp.message}
                variant="outline"
                className={cta}
                labels={{ label: t.whatsapp, opens: t.whatsappOpens }}
              />
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Hero01Props; ar: Hero01Props } = {
  en: {
    eyebrow: "Business platform",
    title: "Run your business with clarity and ease",
    description:
      "One platform for invoices, inventory and customers, built for businesses in Saudi Arabia with VAT and e-invoicing support.",
    primaryCta: { label: "Get started", href: "#start" },
    whatsapp: { phone: "+966 50 555 0142", message: "Hello, I would like to learn more about Rafid." },
    labels: labelsEn,
  },
  ar: {
    eyebrow: "منصة إدارة الأعمال",
    title: "أدر أعمالك بكل وضوح وسهولة",
    description:
      "منصة واحدة تجمع الفواتير والمخزون والعملاء، مصممة لتناسب الشركات في المملكة وتدعم ضريبة القيمة المضافة والفوترة الإلكترونية.",
    primaryCta: { label: "ابدأ الآن", href: "#start" },
    whatsapp: { phone: "+966 50 555 0142", message: "السلام عليكم، أرغب في معرفة المزيد عن رافد." },
    labels: labelsAr,
  },
}

export { Hero01, labelsEn, labelsAr, demo }
export type { Hero01Props, Hero01Labels }
export default Hero01
