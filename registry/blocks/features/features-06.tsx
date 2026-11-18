import * as React from "react"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber, type Digits } from "@/registry/lib/format"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Step = { title: string; description: string }

type Features06Props = BlockBase & {
  lang?: Lang
  digits?: Digits
  eyebrow?: string
  title: string
  description?: string
  steps: Step[]
}

const labelsEn = {}
const labelsAr = {}

function Features06({
  lang = "en",
  digits = "latn",
  eyebrow,
  title,
  description,
  steps,
  headingLevel = 2,
  id,
  className,
}: Features06Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const StepHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {steps.map(({ title: stepTitle, description: stepDescription }, i) => (
            <li key={stepTitle} className="flex flex-col items-start gap-4 lg:border-t lg:pt-6 lg:pe-6">
              <span className="flex size-10 items-center justify-center rounded-full border text-base font-semibold tabular-nums">
                <bdi>{formatNumber(i + 1, { lang, digits })}</bdi>
              </span>
              <div className="flex flex-col gap-2">
                <StepHeading className="text-lg font-semibold md:text-xl">{stepTitle}</StepHeading>
                <p className="text-base text-muted-foreground">{stepDescription}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

const demo: { en: Features06Props; ar: Features06Props } = {
  en: {
    lang: "en",
    eyebrow: "How it works",
    title: "Up and running in four steps",
    description: "Most companies finish setup in one afternoon.",
    steps: [
      { title: "Create your account", description: "Sign up with your commercial registration and VAT number." },
      { title: "Import your data", description: "Upload customers, products and opening balances from Excel." },
      { title: "Invite your team", description: "Add employees and choose what each one can see." },
      { title: "Issue your first invoice", description: "Send it to your customer on WhatsApp in one click." },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "كيف تبدأ",
    title: "ابدأ العمل في أربع خطوات",
    description: "تنهي أغلب الشركات الإعداد خلال عصر يوم واحد.",
    steps: [
      { title: "أنشئ حسابك", description: "سجّل بسجلك التجاري ورقمك الضريبي." },
      { title: "استورد بياناتك", description: "ارفع العملاء والمنتجات والأرصدة الافتتاحية من ملف إكسل." },
      { title: "ادعُ فريقك", description: "أضف الموظفين وحدد ما يراه كل منهم." },
      { title: "أصدر أول فاتورة", description: "أرسلها لعميلك عبر واتساب بضغطة واحدة." },
    ],
  },
}

export { Features06, labelsEn, labelsAr, demo }
export type { Features06Props, Step }
export default Features06
