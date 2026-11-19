import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Step = { title: string; description: string; meta?: React.ReactNode }

type HowItWorks02Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: Action
  steps: Step[]
}

const labelsEn = {}
const labelsAr = {}

// The heading column sticks on large screens while the steps scroll past it.
function HowItWorks02({ lang = "en", eyebrow, title, description, action, steps, headingLevel = 2, id, className }: HowItWorks02Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  const StepHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          <div className="flex flex-col items-start gap-4 lg:sticky lg:top-24 lg:self-start">
            {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
            <Heading id={`${sid}-heading`} className="text-3xl leading-tight font-semibold text-balance md:text-4xl lg:text-5xl">
              {title}
            </Heading>
            {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
            {action ? (
              <a href={action.href} className={cn(buttonVariants({ size: "lg" }), "mt-2 gap-2")}>
                {action.label}
                <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
              </a>
            ) : null}
          </div>
          <ol className="flex flex-col">
            {steps.map(({ title: stepTitle, description: stepDescription, meta }, i) => (
              <li
                key={stepTitle}
                className={cn(
                  "relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-5 pb-12 last:pb-0",
                  i < steps.length - 1 && "before:absolute before:inset-y-0 before:start-[calc(1.25rem-0.5px)] before:w-px before:bg-border"
                )}
              >
                <span
                  aria-hidden="true"
                  className="relative flex size-10 items-center justify-center rounded-full border bg-background text-base font-semibold tabular-nums"
                >
                  <bdi>{formatNumber(i + 1, { lang })}</bdi>
                </span>
                <div className="flex flex-col items-start gap-2 pt-1.5">
                  <StepHeading className="text-xl font-semibold md:text-2xl">{stepTitle}</StepHeading>
                  <p className="text-base text-muted-foreground">{stepDescription}</p>
                  {meta ? <p className="mt-1 text-sm font-medium text-primary">{meta}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: HowItWorks02Props; ar: HowItWorks02Props } = {
  en: {
    lang: "en",
    eyebrow: "How an order moves",
    title: (
      <>
        <span>From the cart</span> <span className="font-normal">to the doorstep</span>
      </>
    ),
    description: "Every step is tracked, so your customer never has to ask where the order is.",
    action: { label: "Start free", href: "#start" },
    steps: [
      { title: "The customer places an order", description: "Payment by mada, Apple Pay or cash on delivery. The order reaches your screen within seconds.", meta: "Order #10482 received" },
      { title: "Your team prepares it", description: "The picking list shows the exact shelf. Stock drops as soon as an item is packed.", meta: "Average: 12 minutes" },
      { title: "A courier collects it", description: "Choose Aramex, SMSA or your own drivers. The tracking link goes out on WhatsApp automatically.", meta: "Tracking link sent" },
      { title: "The invoice closes the loop", description: "A tax invoice with a QR code is issued on delivery and added to your VAT return.", meta: "ZATCA-compliant" },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "رحلة الطلب",
    title: (
      <>
        <span>من سلة عميلك</span> <span className="font-normal">إلى باب بيته</span>
      </>
    ),
    description: "كل خطوة موثّقة، فلا يحتاج عميلك أن يسأل أين طلبه.",
    action: { label: "ابدأ مجانًا", href: "#start" },
    steps: [
      { title: "العميل يطلب", description: "يدفع بمدى أو أبل باي أو عند الاستلام، ويصلك الطلب على شاشتك خلال ثوانٍ.", meta: <>وصل الطلب <bdi>#10482</bdi></> },
      { title: "فريقك يجهّزه", description: "قائمة التجهيز تحدد الرف بدقة، وينقص المخزون فور تغليف الصنف.", meta: <>المتوسط: <bdi>12</bdi> دقيقة</> },
      { title: "المندوب يستلمه", description: "اختر أرامكس أو سمسا أو مندوبيك، ويصل رابط التتبع إلى العميل على واتساب تلقائيًا.", meta: "أُرسل رابط التتبع" },
      { title: "الفاتورة تُغلق الدورة", description: "تصدر فاتورة ضريبية برمز الاستجابة السريعة عند التسليم، وتُضاف إلى إقرارك الضريبي.", meta: "متوافقة مع هيئة الزكاة والضريبة والجمارك" },
    ],
  },
}

export { HowItWorks02, labelsEn, labelsAr, demo }
export type { HowItWorks02Props, Step }
export default HowItWorks02
