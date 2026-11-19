import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { formatNumber } from "@/registry/lib/format"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Service = { title: string; description: string; href?: string }

type Services01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  services: Service[]
}

const labelsEn = {}
const labelsAr = {}

function Services01({ lang = "en", eyebrow, title, description, services, headingLevel = 2, id, className }: Services01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <ol className="flex flex-col divide-y border-y">
          {services.map(({ title: serviceTitle, description: serviceDescription, href }, i) => (
            <li key={serviceTitle} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[4rem_minmax(0,2fr)_minmax(0,3fr)_auto] md:gap-x-8 md:py-8">
              <span aria-hidden="true" className="text-sm text-muted-foreground tabular-nums">
                <bdi>{formatNumber(i + 1, { lang }, { minimumIntegerDigits: 2 })}</bdi>
              </span>
              <ItemHeading className="text-lg font-semibold md:text-xl">
                {href ? (
                  <a href={href} className="after:absolute after:inset-0 hover:underline focus-visible:outline-2 focus-visible:outline-ring">
                    {serviceTitle}
                  </a>
                ) : (
                  serviceTitle
                )}
              </ItemHeading>
              <p className="col-start-2 text-base text-muted-foreground md:col-start-auto">{serviceDescription}</p>
              {href ? <ArrowRightIcon aria-hidden="true" weight="bold" className="col-start-3 row-start-1 size-5 text-muted-foreground rtl:rotate-180 md:col-start-auto md:row-start-auto" /> : <span className="hidden md:block md:size-5" />}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

const demo: { en: Services01Props; ar: Services01Props } = {
  en: {
    lang: "en",
    eyebrow: "What we do",
    title: "Four services, one accountable team",
    description: "We design, build and hand over, with one contact from the first sketch to the keys.",
    services: [
      { title: "Architectural design", description: "Concept to permit drawings, approved by the municipality and Balady before work starts.", href: "#design" },
      { title: "General contracting", description: "Our own crews and a fixed schedule, with a weekly site report you can open on your phone.", href: "#contracting" },
      { title: "Interior fit-out", description: "Joinery, finishes and lighting for villas, offices and showrooms, delivered turnkey.", href: "#fit-out" },
      { title: "Property management", description: "Maintenance, tenant requests and rent collection after handover, in one monthly report.", href: "#management" },
    ],
  },
  ar: {
    lang: "ar",
    eyebrow: "ماذا نقدّم",
    title: "أربع خدمات وفريق واحد مسؤول",
    description: "نصمم ونبني ونسلّم، وتتعامل مع جهة واحدة من أول مخطط حتى استلام المفتاح.",
    services: [
      { title: "التصميم المعماري", description: "من الفكرة إلى مخططات الترخيص، معتمدة من الأمانة وبلدي قبل بدء العمل.", href: "#design" },
      { title: "المقاولات العامة", description: "فرقنا الخاصة وجدول زمني ثابت، مع تقرير موقع أسبوعي تفتحه من جوالك.", href: "#contracting" },
      { title: "التشطيبات الداخلية", description: "نجارة وتشطيبات وإضاءة للفلل والمكاتب والمعارض، تُسلَّم جاهزة للسكن.", href: "#fit-out" },
      { title: "إدارة الأملاك", description: "صيانة وطلبات المستأجرين وتحصيل الإيجارات بعد التسليم، في تقرير شهري واحد.", href: "#management" },
    ],
  },
}

export { Services01, labelsEn, labelsAr, demo }
export type { Services01Props, Service }
export default Services01
