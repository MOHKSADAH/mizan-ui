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

type Testimonials03Labels = { rating: Plural }

type Testimonials03Props = BlockBase & {
  eyebrow?: string
  title: string
  items: Testimonial[]
  labels?: Partial<Testimonials03Labels>
}

const labelsEn: Testimonials03Labels = { rating: (n) => `${n} out of 5` }
const labelsAr: Testimonials03Labels = { rating: (n) => `${n} من 5` }

function Testimonials03({ eyebrow, title, items, headingLevel = 2, labels, id, className }: Testimonials03Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} headingLevel={headingLevel} align="center" />
        {/* CSS columns: the DOM order reads down the first column, then the next. */}
        <ul className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {items.map(({ quote, name, role, company, avatar, rating }) => (
            <li key={name} className="mb-6 break-inside-avoid">
              <Card className="md:[--card-spacing:--spacing(6)]">
                <CardContent>
                  <figure className="flex flex-col gap-6">
                    {rating ? (
                      <div role="img" aria-label={t.rating(rating)} className="flex gap-0.5 text-warning">
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon key={i} aria-hidden="true" weight={i < rating ? "fill" : "regular"} className="size-5" />
                        ))}
                      </div>
                    ) : null}
                    <blockquote>
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

const demo: { en: Testimonials03Props; ar: Testimonials03Props } = {
  en: {
    eyebrow: "Customers",
    title: "Teams that stopped chasing spreadsheets",
    items: [
      { quote: "The platform saves us hours of manual work every week, and invoices now go out in one click.", name: "Sara Al-Otaibi", role: "Finance Director", company: "Najd Trading", rating: 5 },
      { quote: "Support answered on WhatsApp within minutes.", name: "Mohammed Al-Qahtani", role: "Operations Manager", company: "Wadi Market", rating: 5 },
      { quote: "Finally a system that understands the Saudi market and handles VAT without the headache. Our accountant moved over in a single week and has not looked back since.", name: "Layla Al-Dosari", role: "Founder", company: "Sudair Store", rating: 4 },
      { quote: "Stock counts across our three warehouses finally match.", name: "Khalid Al-Harbi", role: "Warehouse Lead", company: "Tuwaiq Logistics", rating: 5 },
      { quote: "Setup took one afternoon. We imported our products from Excel and issued the first invoice before the day ended.", name: "Noura Al-Shehri", role: "Owner", company: "Dar Academy", rating: 5 },
      { quote: "The reports show which branch earns what, and that changed how we plan every month.", name: "Fahad Al-Mutairi", role: "General Manager", company: "Al-Rawda Kitchens", rating: 4 },
    ],
    labels: labelsEn,
  },
  ar: {
    eyebrow: "عملاؤنا",
    title: "فرق تخلّصت من ملاحقة الجداول",
    items: [
      { quote: "وفرت لنا المنصة ساعات من العمل اليدوي كل أسبوع، وأصبحت الفواتير تصدر بضغطة واحدة.", name: "سارة العتيبي", role: "المديرة المالية", company: "نجد للتجارة", rating: 5 },
      { quote: "تجاوب فريق الدعم معنا عبر واتساب خلال دقائق.", name: "محمد القحطاني", role: "مدير العمليات", company: "سوق الوادي", rating: 5 },
      { quote: "أخيرًا نظام يفهم السوق السعودي ويتعامل مع ضريبة القيمة المضافة دون تعقيد. انتقل محاسبنا إليه خلال أسبوع واحد ولم يعد إلى الطريقة القديمة.", name: "ليلى الدوسري", role: "المؤسسة", company: "متجر سدير", rating: 4 },
      { quote: "تطابقت أخيرًا كميات المخزون في مستودعاتنا الثلاثة.", name: "خالد الحربي", role: "مسؤول المستودعات", company: "طويق للخدمات اللوجستية", rating: 5 },
      { quote: "استغرق الإعداد عصر يوم واحد. استوردنا منتجاتنا من إكسل وأصدرنا أول فاتورة قبل نهاية اليوم.", name: "نورة الشهري", role: "المالكة", company: "أكاديمية دار", rating: 5 },
      { quote: "توضح التقارير أرباح كل فرع، وقد غيّر ذلك طريقة تخطيطنا كل شهر.", name: "فهد المطيري", role: "المدير العام", company: "مطابخ الروضة", rating: 4 },
    ],
    labels: labelsAr,
  },
}

export { Testimonials03, labelsEn, labelsAr, demo }
export type { Testimonials03Props, Testimonials03Labels, Testimonial }
export default Testimonials03
