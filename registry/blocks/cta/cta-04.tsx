import * as React from "react"
import { ClockIcon, PhoneIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase } from "@/registry/lib/block-types"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"
import { WhatsAppButton } from "@/registry/ui/whatsapp-button"

type Cta04Labels = { whatsapp: string; whatsappOpens: string; call: string }

type Cta04Props = BlockBase & {
  title: string
  description?: string
  contact: { phone: string; message: string; hours?: string; responseTime?: string }
  labels?: Partial<Cta04Labels>
}

const labelsEn: Cta04Labels = { whatsapp: "Chat on WhatsApp", whatsappOpens: "(opens WhatsApp)", call: "Call us" }
const labelsAr: Cta04Labels = { whatsapp: "تواصل عبر واتساب", whatsappOpens: "(يفتح واتساب)", call: "اتصل بنا" }

const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`

function Cta04({ title, description, contact, headingLevel = 2, labels, id, className }: Cta04Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  return (
    <Section id={sid} className={className}>
      <Container>
        <Card className="md:[--card-spacing:--spacing(10)]">
          <CardContent className="grid items-center gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <Heading
                id={`${sid}-heading`}
                className="text-2xl font-semibold text-balance md:text-3xl lg:text-4xl"
              >
                {title}
              </Heading>
              {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
              {contact.responseTime ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClockIcon aria-hidden="true" className="size-4 shrink-0" />
                  {contact.responseTime}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <WhatsAppButton
                phone={contact.phone}
                message={contact.message}
                className="h-12 w-full px-6 text-base md:w-auto"
                labels={{ label: t.whatsapp, opens: t.whatsappOpens }}
              />
              <a
                href={tel(contact.phone)}
                className="flex min-h-6 items-center gap-2 text-base font-medium hover:underline"
              >
                <PhoneIcon aria-hidden="true" className="size-4 shrink-0" />
                <span className="sr-only">{t.call}</span>
                <bdi dir="ltr" className="tabular-nums">
                  {contact.phone}
                </bdi>
              </a>
              {contact.hours ? <p className="text-sm text-muted-foreground">{contact.hours}</p> : null}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}

const demo: { en: Cta04Props; ar: Cta04Props } = {
  en: {
    title: "Talk to our team now",
    description: "We answer on WhatsApp during business hours and help you pick the right plan.",
    contact: {
      phone: "+966 50 555 0142",
      message: "Hello, I would like help choosing a plan.",
      hours: "Sunday to Thursday, 9 AM to 6 PM",
      responseTime: "We usually reply within minutes",
    },
    labels: labelsEn,
  },
  ar: {
    title: "تحدث مع فريقنا الآن",
    description: "نرد على استفساراتك عبر واتساب خلال ساعات العمل، ونساعدك في اختيار الباقة المناسبة.",
    contact: {
      phone: "+966 50 555 0142",
      message: "السلام عليكم، أرغب في المساعدة في اختيار الباقة المناسبة.",
      hours: "من الأحد إلى الخميس، من 9 صباحًا إلى 6 مساءً",
      responseTime: "نرد عادةً خلال دقائق",
    },
    labels: labelsAr,
  },
}

export { Cta04, labelsEn, labelsAr, demo }
export type { Cta04Props, Cta04Labels }
export default Cta04
