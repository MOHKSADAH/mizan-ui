import * as React from "react"
import {
  BuildingsIcon,
  ForkKnifeIcon,
  GraduationCapIcon,
  StethoscopeIcon,
  StorefrontIcon,
  TruckIcon,
} from "@phosphor-icons/react/ssr"

import type { BlockBase } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Logo = { name: string; src?: string; logo?: React.ReactNode; href?: string; width?: number }

type LogoCloud04Props = BlockBase & {
  title: string
  description?: string
  logos: Logo[]
}

const labelsEn = {}
const labelsAr = {}

function LogoCloud04({ title, description, logos, headingLevel = 2, id, className }: LogoCloud04Props) {
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container className="grid items-center gap-8 lg:grid-cols-3">
        <SectionHeader
          id={sid}
          title={title}
          description={description}
          headingLevel={headingLevel}
          className="mb-0 md:mb-0 md:flex-col md:items-start md:justify-start"
        />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-2">
          {logos.map(({ name, src, logo, href, width }) => {
            const mark = src ? (
              <img src={src} alt={name} width={width} className="h-8 w-auto" />
            ) : (
              <span className="flex items-center gap-2 text-lg font-semibold">{logo ?? name}</span>
            )
            return (
              <li
                key={name}
                className="flex h-20 items-center justify-center rounded-lg border text-foreground opacity-70 hover:opacity-100"
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

const demo: { en: LogoCloud04Props; ar: LogoCloud04Props } = {
  en: {
    title: "Trusted by growing companies",
    description: "Teams across the Kingdom run their daily work on Rafid.",
    logos: [
      { name: "Najd Trading", logo: icon(BuildingsIcon, "Najd") },
      { name: "Tuwaiq Logistics", logo: icon(TruckIcon, "Tuwaiq") },
      { name: "Wadi Market", logo: icon(StorefrontIcon, "Wadi") },
      { name: "Sudair Clinics", logo: icon(StethoscopeIcon, "Sudair") },
      { name: "Dar Academy", logo: icon(GraduationCapIcon, "Dar") },
      { name: "Al-Rawda Kitchens", logo: icon(ForkKnifeIcon, "Rawda") },
    ],
  },
  ar: {
    title: "شركات متنامية تثق بنا",
    description: "فرق في أنحاء المملكة تدير عملها اليومي على رافد.",
    logos: [
      { name: "نجد للتجارة", logo: icon(BuildingsIcon, "نجد") },
      { name: "طويق للخدمات اللوجستية", logo: icon(TruckIcon, "طويق") },
      { name: "سوق الوادي", logo: icon(StorefrontIcon, "الوادي") },
      { name: "عيادات سدير", logo: icon(StethoscopeIcon, "سدير") },
      { name: "أكاديمية دار", logo: icon(GraduationCapIcon, "دار") },
      { name: "مطابخ الروضة", logo: icon(ForkKnifeIcon, "الروضة") },
    ],
  },
}

export { LogoCloud04, labelsEn, labelsAr, demo }
export type { LogoCloud04Props, Logo }
export default LogoCloud04
