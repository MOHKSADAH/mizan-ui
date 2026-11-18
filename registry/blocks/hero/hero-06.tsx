import * as React from "react"

import type { BlockBase } from "@/registry/lib/block-types"
import { Button } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { Section } from "@/registry/ui/section"

type Hero06Labels = { search: string }

type Hero06Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  eyebrow?: string
  title: string
  description?: string
  widget: React.ReactNode
  // Set when the widget is a search, so the card is a search landmark.
  isSearch?: boolean
  labels?: Partial<Hero06Labels>
}

const labelsEn: Hero06Labels = { search: "Search" }
const labelsAr: Hero06Labels = { search: "بحث" }

function Hero06({
  eyebrow,
  title,
  description,
  widget,
  isSearch,
  headingLevel = 1,
  labels,
  id,
  className,
}: Hero06Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="flex flex-col items-center gap-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
          <Heading id={`${sid}-heading`} className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
            {title}
          </Heading>
          {description ? <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{description}</p> : null}
        </div>
        <Card
          className="w-full max-w-5xl md:[--card-spacing:--spacing(6)]"
          role={isSearch ? "search" : undefined}
          aria-label={isSearch ? t.search : undefined}
        >
          <CardContent>{widget}</CardContent>
        </Card>
      </Container>
    </Section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const uid = React.useId()
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={uid}>{label}</Label>
      {React.isValidElement<{ id?: string }>(children) ? React.cloneElement(children, { id: uid }) : children}
    </div>
  )
}

const widget = (fields: [string, string][], submit: string) => (
  <form className="grid items-end gap-3 md:grid-cols-4">
    {fields.map(([label, placeholder]) => (
      <Field key={label} label={label}>
        <Input placeholder={placeholder} className="h-11" />
      </Field>
    ))}
    <Button type="submit" size="lg" className="h-11 w-full text-base">
      {submit}
    </Button>
  </form>
)

const demo: { en: Hero06Props; ar: Hero06Props } = {
  en: {
    eyebrow: "Real estate",
    title: "Find the right property in your city",
    description: "Search thousands of verified listings for sale and rent across the Kingdom.",
    isSearch: true,
    widget: widget(
      [
        ["City", "Riyadh"],
        ["Property type", "Apartment"],
        ["Maximum budget", "SAR 900,000"],
      ],
      "Search"
    ),
    labels: labelsEn,
  },
  ar: {
    eyebrow: "العقارات",
    title: "اعثر على العقار المناسب في مدينتك",
    description: "ابحث في آلاف العروض الموثقة للبيع والإيجار في أنحاء المملكة.",
    isSearch: true,
    widget: widget(
      [
        ["المدينة", "الرياض"],
        ["نوع العقار", "شقة"],
        ["الحد الأعلى للميزانية", "900,000 ر.س"],
      ],
      "بحث"
    ),
    labels: labelsAr,
  },
}

export { Hero06, labelsEn, labelsAr, demo }
export type { Hero06Props, Hero06Labels }
export default Hero06
