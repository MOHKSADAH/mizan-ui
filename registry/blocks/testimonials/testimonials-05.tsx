import * as React from "react"
import { MapPinIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Media } from "@/registry/lib/block-types"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type FeaturedCustomer = {
  quote: string
  name: string
  role: string
  company: string
  city: string
  photo?: Media
}

type OtherCustomer = { name: string; company: string; city: string }

type Testimonials05Labels = { others: string }

type Testimonials05Props = BlockBase & {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  item: FeaturedCustomer
  others?: OtherCustomer[]
  labels?: Partial<Testimonials05Labels>
}

const labelsEn: Testimonials05Labels = { others: "Also growing with us" }
const labelsAr: Testimonials05Labels = { others: "ينمون معنا أيضًا" }

function Testimonials05({ eyebrow, title, item, others, headingLevel = 2, labels, id, className }: Testimonials05Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const { quote, name, role, company, city, photo } = item
  return (
    <Section id={sid} as={title ? "section" : "div"} className={className}>
      <Container size="narrow">
        {title ? <SectionHeader id={sid} eyebrow={eyebrow} title={title} headingLevel={headingLevel} /> : null}
        <Card className="md:[--card-spacing:--spacing(6)]">
          <CardContent>
            <figure className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10">
              <blockquote className="flex items-center">
                <p className="text-lg text-balance md:text-xl">{quote}</p>
              </blockquote>
              <figcaption className="flex items-center gap-3 lg:border-s lg:ps-10">
                {photo ? (
                  <img src={photo.src} alt="" width={photo.width} height={photo.height} className="size-14 shrink-0 rounded-full object-cover" />
                ) : (
                  <Avatar size="lg">
                    <AvatarFallback>{name.trim().charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex flex-col">
                  <span className="font-medium">{name}</span>
                  <span className="text-sm text-muted-foreground">
                    {role} · {company}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPinIcon aria-hidden="true" weight="bold" className="size-4 shrink-0" />
                    {city}
                  </span>
                </div>
              </figcaption>
            </figure>
          </CardContent>
        </Card>
        {others?.length ? (
          <div className="mt-10 flex flex-col gap-4 border-t pt-6 md:mt-12">
            <p className="text-sm font-medium text-muted-foreground">{t.others}</p>
            <ul className="flex flex-wrap gap-x-10 gap-y-4">
              {others.map((other) => (
                <li key={other.name} className="flex flex-col">
                  <span className="text-base font-semibold">{other.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {other.company} · {other.city}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </Section>
  )
}

const demo: { en: Testimonials05Props; ar: Testimonials05Props } = {
  en: {
    eyebrow: "Customers",
    title: "Real stores, real numbers",
    item: {
      quote: "We closed our books in two days instead of two weeks, and our invoices now reach customers on WhatsApp the same minute.",
      name: "Sara Al-Otaibi",
      role: "Finance Director",
      company: "Najd Trading",
      city: "Riyadh",
    },
    others: [
      { name: "Mohammed Al-Qahtani", company: "Wadi Market", city: "Abha" },
      { name: "Layla Al-Dosari", company: "Sudair Store", city: "Dammam" },
      { name: "Khalid Al-Harbi", company: "Tuwaiq Logistics", city: "Madinah" },
      { name: "Noura Al-Shehri", company: "Dar Academy", city: "Jeddah" },
    ],
    labels: labelsEn,
  },
  ar: {
    eyebrow: "عملاؤنا",
    title: "متاجر حقيقية، وأرقام حقيقية",
    item: {
      quote: "أصبحنا نقفل حساباتنا في يومين بدل أسبوعين، وتصل فواتيرنا إلى العملاء عبر واتساب في اللحظة نفسها.",
      name: "سارة العتيبي",
      role: "المديرة المالية",
      company: "نجد للتجارة",
      city: "الرياض",
    },
    others: [
      { name: "محمد القحطاني", company: "سوق الوادي", city: "أبها" },
      { name: "ليلى الدوسري", company: "متجر سدير", city: "الدمام" },
      { name: "خالد الحربي", company: "طويق للخدمات اللوجستية", city: "المدينة المنورة" },
      { name: "نورة الشهري", company: "أكاديمية دار", city: "جدة" },
    ],
    labels: labelsAr,
  },
}

export { Testimonials05, labelsEn, labelsAr, demo }
export type { Testimonials05Props, Testimonials05Labels, FeaturedCustomer, OtherCustomer }
export default Testimonials05
