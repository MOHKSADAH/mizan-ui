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
import { Section } from "@/registry/ui/section"

type Logo = { name: string; src?: string; logo?: React.ReactNode; href?: string; width?: number }

type LogoCloud01Props = BlockBase & {
  title: string
  logos: Logo[]
}

const labelsEn = {}
const labelsAr = {}

function LogoCloud01({ title, logos, headingLevel = 2, id, className }: LogoCloud01Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  return (
    <Section id={sid} className={className}>
      <Container>
        <Heading id={`${sid}-heading`} className="text-center text-sm text-muted-foreground">
          {title}
        </Heading>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map(({ name, src, logo, href, width }) => {
            const mark = src ? (
              <img src={src} alt={name} width={width} className="h-8 w-auto" />
            ) : (
              <span className="flex items-center gap-2 text-xl font-semibold">{logo ?? name}</span>
            )
            return (
              <li key={name} className="flex h-8 items-center text-foreground opacity-70 hover:opacity-100">
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

const demo: { en: LogoCloud01Props; ar: LogoCloud01Props } = {
  en: {
    title: "Trusted by growing companies",
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

export { LogoCloud01, labelsEn, labelsAr, demo }
export type { LogoCloud01Props, Logo }
export default LogoCloud01
