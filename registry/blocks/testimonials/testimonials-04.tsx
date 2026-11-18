"use client"

import * as React from "react"
import { StarIcon } from "@phosphor-icons/react"

import type { BlockBase, Media, Plural } from "@/registry/lib/block-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Card, CardContent } from "@/registry/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/ui/carousel"
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

type Testimonials04Labels = { rating: Plural; previous: string; next: string }

type Testimonials04Props = BlockBase & {
  eyebrow?: string
  title: string
  items: Testimonial[]
  labels?: Partial<Testimonials04Labels>
}

const labelsEn: Testimonials04Labels = { rating: (n) => `${n} out of 5`, previous: "Previous testimonials", next: "Next testimonials" }
const labelsAr: Testimonials04Labels = { rating: (n) => `${n} من 5`, previous: "الآراء السابقة", next: "الآراء التالية" }

const control = "static inset-auto my-0 size-11 translate-x-0 translate-y-0 rtl:translate-x-0"

function Testimonials04({ eyebrow, title, items, headingLevel = 2, labels, id, className }: Testimonials04Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container>
        <Carousel opts={{ align: "start" }} labels={{ previous: t.previous, next: t.next }}>
          <SectionHeader
            id={sid}
            eyebrow={eyebrow}
            title={title}
            headingLevel={headingLevel}
            actions={
              <>
                <CarouselPrevious size="icon" className={control} />
                <CarouselNext size="icon" className={control} />
              </>
            }
          />
          <CarouselContent>
            {items.map(({ quote, name, role, company, avatar, rating }) => (
              <CarouselItem key={name} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full md:[--card-spacing:--spacing(6)]">
                  <CardContent className="h-full">
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </Section>
  )
}

const demo: { en: Testimonials04Props; ar: Testimonials04Props } = {
  en: {
    eyebrow: "Customers",
    title: "What our customers say",
    items: [
      { quote: "The platform saves us hours of manual work every week, and invoices now go out in one click.", name: "Sara Al-Otaibi", role: "Finance Director", company: "Najd Trading", rating: 5 },
      { quote: "Support answered on WhatsApp within minutes and solved our issue the same day.", name: "Mohammed Al-Qahtani", role: "Operations Manager", company: "Wadi Market", rating: 5 },
      { quote: "Finally a system that understands the Saudi market and handles VAT without the headache.", name: "Layla Al-Dosari", role: "Founder", company: "Sudair Store", rating: 4 },
      { quote: "Stock counts across our three warehouses finally match.", name: "Khalid Al-Harbi", role: "Warehouse Lead", company: "Tuwaiq Logistics", rating: 5 },
      { quote: "Setup took one afternoon, and we issued our first invoice before the day ended.", name: "Noura Al-Shehri", role: "Owner", company: "Dar Academy", rating: 5 },
    ],
    labels: labelsEn,
  },
  ar: {
    eyebrow: "عملاؤنا",
    title: "ماذا يقول عملاؤنا",
    items: [
      { quote: "وفرت لنا المنصة ساعات من العمل اليدوي كل أسبوع، وأصبحت الفواتير تصدر بضغطة واحدة.", name: "سارة العتيبي", role: "المديرة المالية", company: "نجد للتجارة", rating: 5 },
      { quote: "تجاوب فريق الدعم معنا عبر واتساب خلال دقائق، وحلّ مشكلتنا في اليوم نفسه.", name: "محمد القحطاني", role: "مدير العمليات", company: "سوق الوادي", rating: 5 },
      { quote: "أخيرًا نظام يفهم السوق السعودي ويتعامل مع ضريبة القيمة المضافة دون تعقيد.", name: "ليلى الدوسري", role: "المؤسسة", company: "متجر سدير", rating: 4 },
      { quote: "تطابقت أخيرًا كميات المخزون في مستودعاتنا الثلاثة.", name: "خالد الحربي", role: "مسؤول المستودعات", company: "طويق للخدمات اللوجستية", rating: 5 },
      { quote: "استغرق الإعداد عصر يوم واحد، وأصدرنا أول فاتورة قبل نهاية اليوم.", name: "نورة الشهري", role: "المالكة", company: "أكاديمية دار", rating: 5 },
    ],
    labels: labelsAr,
  },
}

export { Testimonials04, labelsEn, labelsAr, demo }
export type { Testimonials04Props, Testimonials04Labels, Testimonial }
export default Testimonials04
