import * as React from "react"

import type { BlockBase, Media } from "@/registry/lib/block-types"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Testimonial = { quote: string; name: string; role?: string; company?: string; avatar?: Media }

type Testimonials01Props = BlockBase & {
  title?: string
  item: Testimonial
}

const labelsEn = {}
const labelsAr = {}

function Testimonials01({ title, item, headingLevel = 2, id, className }: Testimonials01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const { quote, name, role, company, avatar } = item
  return (
    <Section id={sid} as={title ? "section" : "div"} className={className}>
      <Container size="prose">
        {title ? <SectionHeader id={sid} title={title} headingLevel={headingLevel} align="center" /> : null}
        <figure className="flex flex-col items-center gap-8 text-center">
          <blockquote>
            <p className="text-xl font-medium text-balance md:text-2xl">{quote}</p>
          </blockquote>
          <figcaption className="flex items-center gap-3 text-start">
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
      </Container>
    </Section>
  )
}

const demo: { en: Testimonials01Props; ar: Testimonials01Props } = {
  en: {
    title: "A customer story",
    item: {
      quote: "We closed our books in two days instead of two weeks, and our invoices now reach customers on WhatsApp the same minute.",
      name: "Sara Al-Otaibi",
      role: "Finance Director",
      company: "Najd Trading",
    },
  },
  ar: {
    title: "قصة عميل",
    item: {
      quote: "أصبحنا نقفل حساباتنا في يومين بدل أسبوعين، وتصل فواتيرنا إلى العملاء عبر واتساب في اللحظة نفسها.",
      name: "سارة العتيبي",
      role: "المديرة المالية",
      company: "نجد للتجارة",
    },
  },
}

export { Testimonials01, labelsEn, labelsAr, demo }
export type { Testimonials01Props, Testimonial }
export default Testimonials01
