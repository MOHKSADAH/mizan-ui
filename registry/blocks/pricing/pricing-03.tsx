import * as React from "react"
import { CheckIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Money } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"

type SinglePlan = {
  name: string
  description?: string
  price: Money
  priceNote?: string
  features: string[]
  cta: Action
}

type Pricing03Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  plan: SinglePlan
}

const labelsEn = {}
const labelsAr = {}

function Pricing03({ lang = "en", eyebrow, title, description, plan, headingLevel = 2, id, className }: Pricing03Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const CardHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container size="prose">
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <Card className="md:[--card-spacing:--spacing(8)]">
          <CardContent className="grid gap-8 md:grid-cols-5">
            <div className="flex flex-col items-start gap-6 md:col-span-2">
              <div className="flex flex-col gap-2">
                <CardHeading className="text-lg font-semibold md:text-xl">{plan.name}</CardHeading>
                {plan.description ? <p className="text-sm text-muted-foreground">{plan.description}</p> : null}
              </div>
              <div className="flex flex-col gap-1">
                <Price amount={plan.price.amount} currency={plan.price.currency} lang={lang} className="text-4xl font-semibold" />
                {plan.priceNote ? <p className="text-sm text-muted-foreground">{plan.priceNote}</p> : null}
              </div>
              <a
                href={plan.cta.href}
                {...(plan.cta.external ? { target: "_blank", rel: "noopener" } : {})}
                className={cn(buttonVariants({ size: "lg" }), "h-11 w-full text-base")}
              >
                {plan.cta.label}
              </a>
            </div>
            <ul className="grid content-start gap-3 text-base sm:grid-cols-2 md:col-span-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckIcon aria-hidden="true" weight="bold" className="mt-1 size-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

const demo: { en: Pricing03Props; ar: Pricing03Props } = {
  en: {
    lang: "en",
    eyebrow: "One price",
    title: "A single package for your clinic",
    description: "Everything included, with no hidden fees.",
    plan: {
      name: "Clinic package",
      description: "Setup, training and the first year of support",
      price: { amount: 4500, currency: "SAR" },
      priceNote: "One-time price, excludes VAT",
      features: ["Appointment booking", "Patient records", "Invoices and insurance claims", "SMS and WhatsApp reminders", "Staff training session", "12 months of support"],
      cta: { label: "Book a consultation", href: "#book" },
    },
  },
  ar: {
    lang: "ar",
    eyebrow: "سعر واحد",
    title: "باقة واحدة لعيادتك",
    description: "كل شيء مشمول، دون رسوم خفية.",
    plan: {
      name: "باقة العيادة",
      description: "الإعداد والتدريب وسنة أولى من الدعم",
      price: { amount: 4500, currency: "SAR" },
      priceNote: "سعر لمرة واحدة، لا يشمل ضريبة القيمة المضافة",
      features: ["حجز المواعيد", "ملفات المرضى", "الفواتير ومطالبات التأمين", "تذكيرات عبر الرسائل وواتساب", "جلسة تدريب للموظفين", "دعم لمدة 12 شهرًا"],
      cta: { label: "احجز استشارة", href: "#book" },
    },
  },
}

export { Pricing03, labelsEn, labelsAr, demo }
export type { Pricing03Props, SinglePlan }
export default Pricing03
