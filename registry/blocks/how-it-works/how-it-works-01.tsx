import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { Badge } from "@/registry/ui/badge"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Step = { title: string; description: string; duration?: React.ReactNode }

type HowItWorks01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  steps: Step[]
}

const labelsEn = {}
const labelsAr = {}

// The rule after each numeral follows the reading direction: flex rows mirror in RTL.
function HowItWorks01({ lang = "en", eyebrow, title, description, steps, headingLevel = 2, id, className }: HowItWorks01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const StepHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ol className="grid gap-12 lg:grid-flow-col lg:auto-cols-fr lg:gap-0">
          {steps.map(({ title: stepTitle, description: stepDescription, duration }, i) => (
            <li key={stepTitle} className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="text-6xl leading-none font-light tabular-nums md:text-7xl">
                  <bdi>{formatNumber(i + 1, { lang }, { minimumIntegerDigits: 2 })}</bdi>
                </span>
                {i < steps.length - 1 ? <span aria-hidden="true" className="h-px flex-1 bg-foreground/30" /> : null}
              </div>
              <div className="flex flex-col items-start gap-3 lg:pe-10">
                {duration ? <Badge variant="secondary">{duration}</Badge> : null}
                <StepHeading className="text-xl font-semibold md:text-2xl">{stepTitle}</StepHeading>
                <p className="text-base text-muted-foreground">{stepDescription}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

const demo: { en: HowItWorks01Props; ar: HowItWorks01Props } = {
  en: {
    lang: "en",
    eyebrow: "Getting started",
    title: (
      <>
        <span>From sign-up to your first invoice</span> <span className="font-normal">in one afternoon</span>
      </>
    ),
    steps: [
      { title: "Create your account", description: "Enter your commercial registration and VAT numbers. We fill in the rest from the official records.", duration: "5 minutes" },
      { title: "Add your products", description: "Import an Excel sheet or add items one by one, with prices that include VAT.", duration: "30 minutes" },
      { title: "Connect your branches", description: "Link each branch and warehouse so stock counts match from the first sale.", duration: "20 minutes" },
      { title: "Issue your first invoice", description: "Send it to your customer by WhatsApp or SMS, with the QR code included.", duration: "1 minute" },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "ابدأ معنا",
    title: (
      <>
        <span>من التسجيل إلى أول فاتورة</span> <span className="font-normal">في عصر يوم واحد</span>
      </>
    ),
    steps: [
      { title: "أنشئ حسابك", description: "أدخل رقم السجل التجاري والرقم الضريبي، ونكمل بقية البيانات من السجلات الرسمية.", duration: <><bdi>5</bdi> دقائق</> },
      { title: "أضف منتجاتك", description: "ارفع ملف إكسل أو أضف الأصناف واحدًا واحدًا، بأسعار شاملة ضريبة القيمة المضافة.", duration: <><bdi>30</bdi> دقيقة</> },
      { title: "اربط فروعك", description: "اربط كل فرع ومستودع لتتطابق الكميات من أول عملية بيع.", duration: <><bdi>20</bdi> دقيقة</> },
      { title: "أصدر أول فاتورة", description: "أرسلها لعميلك عبر واتساب أو الرسائل النصية، ومعها رمز الاستجابة السريعة.", duration: "دقيقة واحدة" },
    ],
  },
}

export { HowItWorks01, labelsEn, labelsAr, demo }
export type { HowItWorks01Props, Step }
export default HowItWorks01
