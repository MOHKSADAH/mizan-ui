import * as React from "react"
import { ArrowUpRightIcon, MapPinIcon, PhoneIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { OpeningHours, openingHoursLabelsAr, type OpeningHoursValue } from "@/registry/ui/opening-hours"
import { Section, SectionHeader } from "@/registry/ui/section"
import { WhatsAppButton, whatsappButtonLabelsAr } from "@/registry/ui/whatsapp-button"

type Location01Labels = { address: string; phone: string }

type Location01Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  name: string
  address: string
  phone: string
  whatsapp?: { phone: string; message?: string }
  directions: Action
  hours: OpeningHoursValue
  // Your map: an iframe or a map component. Without it the block shows a placeholder box.
  map?: React.ReactNode
  // A fixed time for tests and server rendering. Without it the open or closed status appears after mount.
  now?: Date
  labels?: Partial<Location01Labels>
}

const labelsEn: Location01Labels = { address: "Address", phone: "Phone" }
const labelsAr: Location01Labels = { address: "العنوان", phone: "الهاتف" }

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function Location01({
  lang = "en",
  eyebrow,
  title,
  description,
  name,
  address,
  phone,
  whatsapp,
  directions,
  hours,
  map,
  now,
  headingLevel = 2,
  labels,
  id,
  className,
}: Location01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const SubHeading = `h${headingLevel + 1}` as "h3" | "h4"
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
        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <Card className="md:[--card-spacing:--spacing(6)]">
            <CardContent className="flex flex-col gap-6">
              <SubHeading className="text-lg font-semibold md:text-xl">{name}</SubHeading>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <MapPinIcon aria-hidden="true" weight="regular" className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{t.address}</span>
                    <span>{address}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PhoneIcon aria-hidden="true" weight="regular" className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{t.phone}</span>
                    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} dir="ltr" className="w-fit underline-offset-4 hover:underline">
                      {phone}
                    </a>
                  </div>
                </li>
              </ul>
              <OpeningHours
                value={hours}
                lang={lang}
                now={now}
                labels={lang === "ar" ? openingHoursLabelsAr : undefined}
                className="border-t pt-6"
              />
              <div className="flex flex-wrap gap-3">
                <a
                  href={directions.href}
                  {...external(directions)}
                  className={buttonVariants({ size: "lg", className: "h-10 px-4" })}
                >
                  {directions.label}
                  <ArrowUpRightIcon aria-hidden="true" weight="bold" className="rtl:-scale-x-100" />
                </a>
                {whatsapp ? (
                  <WhatsAppButton
                    phone={whatsapp.phone}
                    message={whatsapp.message}
                    variant="outline"
                    className="h-10 px-4"
                    labels={lang === "ar" ? whatsappButtonLabelsAr : undefined}
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>
          <div className="min-h-64 overflow-hidden rounded-xl border bg-muted">
            {map ?? (
              <div aria-hidden="true" className="flex size-full min-h-64 items-center justify-center text-muted-foreground">
                <MapPinIcon aria-hidden="true" weight="duotone" className="size-16" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}

const week = (open: [string, string][]): OpeningHoursValue["week"] => [open, open, open, open, open, [["16:00", "21:00"]], open].map((d) =>
  d.map(([o, c]) => ({ open: o, close: c }))
)
const shifts: [string, string][] = [
  ["09:00", "13:00"],
  ["16:00", "21:00"],
]

const demo: { en: Location01Props; ar: Location01Props } = {
  en: {
    lang: "en",
    eyebrow: "Visit us",
    title: "Find the clinic",
    description: "Free parking in front of the building, and a ground-floor entrance.",
    name: "Nokhba Dental Clinic",
    address: "Anas Ibn Malik Road, Al Malqa District, Riyadh 13521",
    phone: "+966 11 555 0187",
    whatsapp: { phone: "+966 50 555 0187", message: "Hello, I would like to book an appointment." },
    directions: { label: "Get directions", href: "https://maps.google.com/?q=Al+Malqa+Riyadh", external: true },
    hours: { week: week(shifts) },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "زورونا",
    title: "موقع العيادة",
    description: "مواقف مجانية أمام المبنى، ومدخل في الدور الأرضي.",
    name: "عيادة نخبة للأسنان",
    address: "طريق أنس بن مالك، حي الملقا، الرياض 13521",
    phone: "+966 11 555 0187",
    whatsapp: { phone: "+966 50 555 0187", message: "السلام عليكم، أرغب في حجز موعد." },
    directions: { label: "احصل على الاتجاهات", href: "https://maps.google.com/?q=Al+Malqa+Riyadh", external: true },
    hours: { week: week(shifts) },
    labels: labelsAr,
  },
}

export { Location01, labelsEn, labelsAr, demo }
export type { Location01Props, Location01Labels }
export default Location01
