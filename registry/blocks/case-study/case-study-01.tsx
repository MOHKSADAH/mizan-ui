import * as React from "react"
import { ArrowRightIcon, ImageIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

// Without a src the slot shows a muted placeholder, so consumers can pass real photos later.
type CaseImage = { src?: string; alt: string; width?: number; height?: number }

type Result = {
  // Shown as is, for example "42%" or "+3,200". Western digits.
  value: string
  label: string
}

type CaseStudy01Props = BlockBase & {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  image: CaseImage
  client: string
  // The case study title.
  caseTitle: React.ReactNode
  summary: string
  results: Result[]
  link?: Action
}

const labelsEn = {}
const labelsAr = {}

function CaseStudy01({ eyebrow, title, description, image, client, caseTitle, summary, results, link, headingLevel = 2, id, className }: CaseStudy01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <article className="flex flex-col gap-8 lg:gap-10">
          <div className="aspect-[16/9] overflow-hidden rounded-xl bg-muted lg:aspect-[21/9]">
            {image.src ? (
              <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="size-full object-cover" />
            ) : (
              <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
                <ImageIcon aria-hidden="true" weight="duotone" className="size-16" />
              </div>
            )}
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div className="flex flex-col items-start gap-3">
              <p className="text-sm font-medium text-muted-foreground">{client}</p>
              <ItemHeading className="text-xl font-semibold text-balance md:text-2xl">{caseTitle}</ItemHeading>
              <p className="max-w-prose text-base text-muted-foreground md:text-lg">{summary}</p>
              {link ? (
                <a href={link.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-3 gap-2")}>
                  {link.label}
                  <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
                </a>
              ) : null}
            </div>
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] self-start rounded-xl border">
              {results.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-2 border-b p-5 last:border-b-0 sm:border-b-0 sm:border-s sm:first:border-s-0">
                  <dd className="order-first text-3xl font-semibold tabular-nums md:text-4xl">
                    <bdi>{value}</bdi>
                  </dd>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </Container>
    </Section>
  )
}

const photo = (alt: string): CaseImage => ({ alt, width: 1600, height: 686 })

const demo: { en: CaseStudy01Props; ar: CaseStudy01Props } = {
  en: {
    eyebrow: "Selected work",
    title: "A project we are proud of",
    image: photo("Al Rawabi Towers at sunset"),
    client: "Al Rawabi Real Estate, Riyadh",
    caseTitle: "Al Rawabi Towers: 18 floors handed over 2 months early",
    summary: "We took over the structure at 40% and re-sequenced the trades, so fit-out started while the upper floors were still going up.",
    results: [
      { value: "60", label: "Days ahead of schedule" },
      { value: "18", label: "Floors delivered" },
      { value: "100%", label: "Units sold at handover" },
    ],
    link: { label: "Read the case study", href: "#al-rawabi" },
  },
  ar: {
    eyebrow: "أعمال مختارة",
    title: "مشروع نفخر به",
    image: photo("أبراج الروابي عند الغروب"),
    client: "الروابي العقارية، الرياض",
    caseTitle: <>أبراج الروابي: <bdi>18</bdi> طابقًا سُلّمت قبل موعدها بشهرين</>,
    summary: "استلمنا الهيكل عند نسبة إنجاز 40% وأعدنا ترتيب الأعمال، فبدأ التشطيب والأدوار العليا لا تزال قيد الصب.",
    results: [
      { value: "60", label: "يومًا قبل موعد التسليم" },
      { value: "18", label: "طابقًا سُلّمت" },
      { value: "100%", label: "من الوحدات بِيعت عند التسليم" },
    ],
    link: { label: "اقرأ دراسة الحالة", href: "#al-rawabi" },
  },
}

export { CaseStudy01, labelsEn, labelsAr, demo }
export type { CaseStudy01Props, Result }
export default CaseStudy01
