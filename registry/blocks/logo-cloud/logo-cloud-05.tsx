import * as React from "react"

import type { BlockBase } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

// A brand set as text, so there are no invented logos.
type Brand = { name: string; href?: string }

type LogoCloud05Props = BlockBase & {
  // One sentence of social proof.
  title: string
  brands: Brand[]
}

const labelsEn = {}
const labelsAr = {}

function LogoCloud05({ title, brands, headingLevel = 2, id, className }: LogoCloud05Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} title={title} headingLevel={headingLevel} />
        <ul className="grid grid-cols-2 border-t border-s md:grid-cols-4">
          {brands.map(({ name, href }) => {
            const mark = <span className="text-xl font-semibold text-balance text-muted-foreground md:text-2xl">{name}</span>
            return (
              <li key={name} className="flex h-28 items-center justify-center border-e border-b px-4 text-center md:h-32">
                {href ? (
                  <a href={href} className="outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                    {mark}
                  </a>
                ) : (
                  mark
                )}
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

const demo: { en: LogoCloud05Props; ar: LogoCloud05Props } = {
  en: {
    title: "Over 400 retailers and clinics in the Kingdom run on Rafid every day",
    brands: [
      { name: "Al Dar Perfumes" },
      { name: "Jabal Coffee" },
      { name: "Bayti Sweets" },
      { name: "Naseej Home" },
      { name: "Sudair Clinics" },
      { name: "Wadi Market" },
      { name: "Najd Trading" },
      { name: "Dar Academy" },
    ],
  },
  ar: {
    title: "أكثر من 400 متجر وعيادة في المملكة تعمل على رافد كل يوم",
    brands: [
      { name: "عطور الدار" },
      { name: "قهوة الجبل" },
      { name: "حلويات بيتي" },
      { name: "نسيج" },
      { name: "عيادات سدير" },
      { name: "سوق الوادي" },
      { name: "نجد للتجارة" },
      { name: "أكاديمية دار" },
    ],
  },
}

export { LogoCloud05, labelsEn, labelsAr, demo }
export type { LogoCloud05Props, Brand as LogoCloud05Brand }
export default LogoCloud05
