import * as React from "react"
import { CheckIcon, ClockIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Money } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { WhatsAppButton } from "@/registry/ui/whatsapp-button"

type ServicePackage = {
  id: string
  name: string
  price: Money
  duration: string
  features: string[]
  cta: Action
  whatsapp?: { phone: string; message: string }
}

type Pricing05Labels = { from: string; whatsapp: string; whatsappOpens: string }

type Pricing05Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  packages: ServicePackage[]
  labels?: Partial<Pricing05Labels>
}

const labelsEn: Pricing05Labels = { from: "Starting from", whatsapp: "Request a quote", whatsappOpens: "(opens WhatsApp)" }
const labelsAr: Pricing05Labels = { from: "ابتداءً من", whatsapp: "اطلب عرض سعر", whatsappOpens: "(يفتح واتساب)" }

function Pricing05({ lang = "en", eyebrow, title, description, packages, headingLevel = 2, labels, id, className }: Pricing05Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const CardHeading = `h${headingLevel + 1}` as "h3" | "h4"
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
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <li key={pkg.id}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-5">
                  <CardHeading className="text-lg font-semibold">{pkg.name}</CardHeading>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">{t.from}</p>
                    <Price amount={pkg.price.amount} currency={pkg.price.currency} lang={lang} className="text-3xl font-semibold" />
                  </div>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ClockIcon aria-hidden="true" className="size-4" />
                    {pkg.duration}
                  </p>
                  <ul className="flex flex-1 flex-col gap-3 text-sm">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckIcon aria-hidden="true" weight="bold" className="mt-0.5 size-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {pkg.whatsapp ? (
                    <WhatsAppButton
                      phone={pkg.whatsapp.phone}
                      message={pkg.whatsapp.message}
                      variant="outline"
                      className="h-10 w-full text-sm"
                      labels={{ label: t.whatsapp, opens: t.whatsappOpens }}
                    />
                  ) : (
                    <a
                      href={pkg.cta.href}
                      {...(pkg.cta.external ? { target: "_blank", rel: "noopener" } : {})}
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 w-full text-sm")}
                    >
                      {pkg.cta.label}
                    </a>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const demo: { en: Pricing05Props; ar: Pricing05Props } = {
  en: {
    lang: "en",
    eyebrow: "Services",
    title: "Packages for every stage",
    description: "Prices start here and depend on the size of your project.",
    packages: [
      { id: "setup", name: "Quick setup", price: { amount: 1500, currency: "SAR" }, duration: "2 working days", features: ["Account configuration", "Chart of accounts", "Data import", "One training call"], cta: { label: "Request a quote", href: "#setup" }, whatsapp: { phone: "966505550142", message: "Hello Rafid, I would like a quote for the Quick setup package." } },
      { id: "migration", name: "Data migration", price: { amount: 3000, currency: "SAR" }, duration: "1 week", features: ["Customers and suppliers", "Products and stock", "Opening balances", "Data checks"], cta: { label: "Request a quote", href: "#migration" }, whatsapp: { phone: "966505550142", message: "Hello Rafid, I would like a quote for the Data migration package." } },
      { id: "training", name: "Team training", price: { amount: 2000, currency: "SAR" }, duration: "2 sessions", features: ["On-site or online", "Role-based sessions", "Recorded guides", "30 days of follow-up"], cta: { label: "Request a quote", href: "#training" }, whatsapp: { phone: "966505550142", message: "Hello Rafid, I would like a quote for the Team training package." } },
      { id: "custom", name: "Custom integration", price: { amount: 8000, currency: "SAR" }, duration: "3 to 6 weeks", features: ["Scoping workshop", "API integration", "Testing and launch", "Priority support"], cta: { label: "Request a quote", href: "#custom" }, whatsapp: { phone: "966505550142", message: "Hello Rafid, I would like a quote for a custom integration." } },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "الخدمات",
    title: "باقات لكل مرحلة",
    description: "تبدأ الأسعار من هنا، وتختلف بحسب حجم مشروعك.",
    packages: [
      { id: "setup", name: "الإعداد السريع", price: { amount: 1500, currency: "SAR" }, duration: "يوما عمل", features: ["تهيئة الحساب", "دليل الحسابات", "استيراد البيانات", "مكالمة تدريب واحدة"], cta: { label: "اطلب عرض سعر", href: "#setup" }, whatsapp: { phone: "966505550142", message: "السلام عليكم، أرغب في عرض سعر لباقة الإعداد السريع من رافد." } },
      { id: "migration", name: "نقل البيانات", price: { amount: 3000, currency: "SAR" }, duration: "أسبوع", features: ["العملاء والموردون", "المنتجات والمخزون", "الأرصدة الافتتاحية", "مراجعة البيانات"], cta: { label: "اطلب عرض سعر", href: "#migration" }, whatsapp: { phone: "966505550142", message: "السلام عليكم، أرغب في عرض سعر لباقة نقل البيانات من رافد." } },
      { id: "training", name: "تدريب الفريق", price: { amount: 2000, currency: "SAR" }, duration: "جلستان", features: ["في موقعك أو عن بُعد", "جلسات حسب الدور الوظيفي", "أدلة مسجلة", "متابعة لمدة 30 يومًا"], cta: { label: "اطلب عرض سعر", href: "#training" }, whatsapp: { phone: "966505550142", message: "السلام عليكم، أرغب في عرض سعر لباقة تدريب الفريق من رافد." } },
      { id: "custom", name: "ربط مخصص", price: { amount: 8000, currency: "SAR" }, duration: "من 3 إلى 6 أسابيع", features: ["ورشة تحديد النطاق", "ربط عبر الواجهة البرمجية", "الاختبار والإطلاق", "دعم ذو أولوية"], cta: { label: "اطلب عرض سعر", href: "#custom" }, whatsapp: { phone: "966505550142", message: "السلام عليكم، أرغب في عرض سعر لربط مخصص مع رافد." } },
    ],
    labels: labelsAr,
  },
}

export { Pricing05, labelsEn, labelsAr, demo }
export type { Pricing05Props, Pricing05Labels, ServicePackage }
export default Pricing05
