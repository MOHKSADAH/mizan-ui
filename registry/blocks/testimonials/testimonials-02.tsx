import * as React from "react"
import { StarIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Media, Plural } from "@/registry/lib/block-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Testimonial = {
  quote: string
  name: string
  role?: string
  company?: string
  avatar?: Media
  rating?: number
}

type Testimonials02Labels = { rating: Plural }

type Testimonials02Props = BlockBase & {
  eyebrow?: string
  title: string
  items: Testimonial[]
  labels?: Partial<Testimonials02Labels>
}

const labelsEn: Testimonials02Labels = { rating: (n) => `${n} out of 5` }
const labelsAr: Testimonials02Labels = { rating: (n) => `${n} من 5` }

function Testimonials02({ eyebrow, title, items, headingLevel = 2, labels, id, className }: Testimonials02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} headingLevel={headingLevel} align="center" />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ quote, name, role, company, avatar, rating }) => (
            <li key={name}>
              <Card className="h-full md:[--card-spacing:--spacing(6)]">
                <CardContent className="flex h-full flex-col gap-6">
                  <figure className="flex h-full flex-col gap-6">
                    {rating ? (
                      <div role="img" aria-label={t.rating(rating)} className="flex gap-0.5 text-warning">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon key={i} aria-hidden="true" weight={i < rating ? "fill" : "regular"} className="size-5" />
                        ))}
                      </div>
                    ) : null}
                    <blockquote className="flex-1">
                      <p className="text-base">{quote}</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <Avatar size="lg">
                        {avatar ? <AvatarImage src={avatar.src} alt="" /> : null}
                        <AvatarFallback>{name.trim().charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{name}</span>
                        {role || company ? (
                          <span className="text-sm text-muted-foreground">{[role, company].filter(Boolean).join(" · ")}</span>
                        ) : null}
                      </div>
                    </figcaption>
                  </figure>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

const demo: { en: Testimonials02Props; ar: Testimonials02Props } = {
  en: {
    eyebrow: "Customers",
    title: "What our customers say",
    items: [
      {
        quote: "The platform saves us hours of manual work every week, and invoices now go out in one click.",
        name: "Sara Al-Otaibi",
        role: "Finance Director",
        company: "Najd Trading",
        rating: 5,
      },
      {
        quote: "Support answered on WhatsApp within minutes and solved our issue the same day.",
        name: "Mohammed Al-Qahtani",
        role: "Operations Manager",
        company: "Wadi Market",
        rating: 5,
      },
      {
        quote: "Finally a system that understands the Saudi market and handles VAT without the headache.",
        name: "Layla Al-Dosari",
        role: "Founder",
        company: "Sudair Store",
        rating: 4,
      },
    ],
    labels: labelsEn,
  },
  ar: {
    eyebrow: "عملاؤنا",
    title: "ماذا يقول عملاؤنا",
    items: [
      {
        quote: "وفرت لنا المنصة ساعات من العمل اليدوي كل أسبوع، وأصبحت الفواتير تصدر بضغطة واحدة.",
        name: "سارة العتيبي",
        role: "المديرة المالية",
        company: "نجد للتجارة",
        rating: 5,
      },
      {
        quote: "تجاوب فريق الدعم معنا عبر واتساب خلال دقائق، وحلّ مشكلتنا في اليوم نفسه.",
        name: "محمد القحطاني",
        role: "مدير العمليات",
        company: "سوق الوادي",
        rating: 5,
      },
      {
        quote: "أخيرًا نظام يفهم السوق السعودي ويتعامل مع ضريبة القيمة المضافة دون تعقيد.",
        name: "ليلى الدوسري",
        role: "المؤسسة",
        company: "متجر سدير",
        rating: 4,
      },
    ],
    labels: labelsAr,
  },
}

export { Testimonials02, labelsEn, labelsAr, demo }
export type { Testimonials02Props, Testimonials02Labels, Testimonial }
export default Testimonials02
