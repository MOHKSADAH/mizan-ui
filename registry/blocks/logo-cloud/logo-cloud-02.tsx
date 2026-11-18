import * as React from "react"
import {
  BuildingsIcon,
  ForkKnifeIcon,
  GraduationCapIcon,
  HouseLineIcon,
  StethoscopeIcon,
  StorefrontIcon,
  TruckIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr"

import type { BlockBase } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Logo = { name: string; src?: string; logo?: React.ReactNode; href?: string; width?: number }

type LogoCloud02Props = BlockBase & {
  title: string
  description?: string
  logos: Logo[]
}

const labelsEn = {}
const labelsAr = {}

function LogoCloud02({ title, description, logos, headingLevel = 2, id, className }: LogoCloud02Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} title={title} description={description} headingLevel={headingLevel} align="center" />
        <ul className="grid grid-cols-2 border-s border-t md:grid-cols-3 lg:grid-cols-6">
          {logos.map(({ name, src, logo, href, width }) => {
            const mark = src ? (
              <img src={src} alt={name} width={width} className="h-8 w-auto" />
            ) : (
              <span className="flex items-center gap-2 text-xl font-semibold">{logo ?? name}</span>
            )
            return (
              <li
                key={name}
                className="flex h-20 items-center justify-center border-e border-b text-foreground opacity-70 hover:opacity-100"
              >
                {href ? <a href={href}>{mark}</a> : mark}
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

const icon = (Mark: typeof BuildingsIcon, name: string) => (
  <>
    <Mark aria-hidden="true" weight="duotone" className="size-6" />
    {name}
  </>
)

const demo: { en: LogoCloud02Props; ar: LogoCloud02Props } = {
  en: {
    title: "Trusted by growing companies",
    description: "From neighborhood shops to national groups.",
    logos: [
      { name: "Najd Trading", logo: icon(BuildingsIcon, "Najd") },
      { name: "Tuwaiq Logistics", logo: icon(TruckIcon, "Tuwaiq") },
      { name: "Wadi Market", logo: icon(StorefrontIcon, "Wadi") },
      { name: "Sudair Clinics", logo: icon(StethoscopeIcon, "Sudair") },
      { name: "Dar Academy", logo: icon(GraduationCapIcon, "Dar") },
      { name: "Al-Rawda Kitchens", logo: icon(ForkKnifeIcon, "Rawda") },
      { name: "Haya Real Estate", logo: icon(HouseLineIcon, "Haya") },
      { name: "Masar Workshops", logo: icon(WrenchIcon, "Masar") },
    ],
  },
  ar: {
    title: "شركات متنامية تثق بنا",
    description: "من متاجر الأحياء إلى المجموعات الوطنية.",
    logos: [
      { name: "نجد للتجارة", logo: icon(BuildingsIcon, "نجد") },
      { name: "طويق للخدمات اللوجستية", logo: icon(TruckIcon, "طويق") },
      { name: "سوق الوادي", logo: icon(StorefrontIcon, "الوادي") },
      { name: "عيادات سدير", logo: icon(StethoscopeIcon, "سدير") },
      { name: "أكاديمية دار", logo: icon(GraduationCapIcon, "دار") },
      { name: "مطابخ الروضة", logo: icon(ForkKnifeIcon, "الروضة") },
      { name: "هيا العقارية", logo: icon(HouseLineIcon, "هيا") },
      { name: "ورش مسار", logo: icon(WrenchIcon, "مسار") },
    ],
  },
}

export { LogoCloud02, labelsEn, labelsAr, demo }
export type { LogoCloud02Props, Logo }
export default LogoCloud02
