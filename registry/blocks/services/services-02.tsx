import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Service = { title: string; description: string; href?: string }

type Services02Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: Action
  services: Service[]
}

const labelsEn = {}
const labelsAr = {}

// The heading column sticks on large screens while the services scroll past it.
function Services02({ lang = "en", eyebrow, title, description, action, services, headingLevel = 2, id, className }: Services02Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          <div className="flex flex-col items-start gap-6 lg:sticky lg:top-24 lg:self-start">
            <SectionHeader
              id={sid}
              eyebrow={eyebrow}
              title={title}
              description={description}
              headingLevel={headingLevel}
              className="mb-0 md:mb-0 md:flex-col md:items-start md:justify-start"
            />
            {action ? (
              <a href={action.href} className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                {action.label}
                <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
              </a>
            ) : null}
          </div>
          <ol className="flex flex-col border-b">
            {services.map(({ title: serviceTitle, description: serviceDescription, href }, i) => (
              <li key={serviceTitle} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-4 border-t py-8 first:pt-0 first:border-t-0 md:grid-cols-[3rem_minmax(0,1fr)_auto]">
                <span aria-hidden="true" className="pt-1.5 text-sm text-muted-foreground tabular-nums">
                  <bdi>{formatNumber(i + 1, { lang }, { minimumIntegerDigits: 2 })}</bdi>
                </span>
                <div className="flex flex-col gap-2">
                  <ItemHeading className="text-lg font-semibold md:text-xl">
                    {href ? (
                      <a href={href} className="after:absolute after:inset-0 hover:underline focus-visible:outline-2 focus-visible:outline-ring">
                        {serviceTitle}
                      </a>
                    ) : (
                      serviceTitle
                    )}
                  </ItemHeading>
                  <p className="text-base text-muted-foreground">{serviceDescription}</p>
                </div>
                {href ? <ArrowRightIcon aria-hidden="true" weight="bold" className="mt-1.5 size-5 text-muted-foreground rtl:rotate-180" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

const demo: { en: Services02Props; ar: Services02Props } = {
  en: {
    lang: "en",
    eyebrow: "Services",
    title: "Everything a project needs, under one roof",
    description: "Pick one service or hand us the whole project. The same team stays with you throughout.",
    action: { label: "Request a quote", href: "#quote" },
    services: [
      { title: "Feasibility studies", description: "Market, land and cost analysis for Riyadh, Jeddah and the Eastern Province before you commit.", href: "#feasibility" },
      { title: "Architectural design", description: "Concept to permit drawings, approved by the municipality and Balady before work starts.", href: "#design" },
      { title: "General contracting", description: "Our own crews and a fixed schedule, with a weekly site report you can open on your phone.", href: "#contracting" },
      { title: "Interior fit-out", description: "Joinery, finishes and lighting for villas, offices and showrooms, delivered turnkey.", href: "#fit-out" },
      { title: "Property management", description: "Maintenance, tenant requests and rent collection after handover, in one monthly report.", href: "#management" },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "الخدمات",
    title: "كل ما يحتاجه مشروعك تحت سقف واحد",
    description: "اختر خدمة واحدة أو سلّمنا المشروع كاملًا. الفريق نفسه يبقى معك حتى النهاية.",
    action: { label: "اطلب عرض سعر", href: "#quote" },
    services: [
      { title: "دراسات الجدوى", description: "تحليل السوق والأرض والتكلفة في الرياض وجدة والمنطقة الشرقية قبل أن تلتزم.", href: "#feasibility" },
      { title: "التصميم المعماري", description: "من الفكرة إلى مخططات الترخيص، معتمدة من الأمانة وبلدي قبل بدء العمل.", href: "#design" },
      { title: "المقاولات العامة", description: "فرقنا الخاصة وجدول زمني ثابت، مع تقرير موقع أسبوعي تفتحه من جوالك.", href: "#contracting" },
      { title: "التشطيبات الداخلية", description: "نجارة وتشطيبات وإضاءة للفلل والمكاتب والمعارض، تُسلَّم جاهزة للسكن.", href: "#fit-out" },
      { title: "إدارة الأملاك", description: "صيانة وطلبات المستأجرين وتحصيل الإيجارات بعد التسليم، في تقرير شهري واحد.", href: "#management" },
    ],
  },
}

export { Services02, labelsEn, labelsAr, demo }
export type { Services02Props, Service }
export default Services02
