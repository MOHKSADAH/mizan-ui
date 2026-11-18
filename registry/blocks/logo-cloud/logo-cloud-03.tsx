"use client"

import * as React from "react"
import {
  BuildingsIcon,
  ForkKnifeIcon,
  GraduationCapIcon,
  PauseIcon,
  PlayIcon,
  StethoscopeIcon,
  StorefrontIcon,
  TruckIcon,
} from "@phosphor-icons/react"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Logo = { name: string; src?: string; logo?: React.ReactNode; href?: string; width?: number }

type LogoCloud03Labels = { pause: string; play: string }

type LogoCloud03Props = BlockBase & {
  title: string
  logos: Logo[]
  // Seconds for one full loop.
  duration?: number
  labels?: Partial<LogoCloud03Labels>
}

const labelsEn: LogoCloud03Labels = { pause: "Pause logos", play: "Play logos" }
const labelsAr: LogoCloud03Labels = { pause: "إيقاف الشعارات", play: "تشغيل الشعارات" }

// The keyframes live here so the block installs alone. Reduced motion shows a static wrapped row.
const KEYFRAMES = "@keyframes mizan-marquee{to{transform:translateX(calc(-50% * var(--mizan-dir)))}}"

function Mark({ logo }: { logo: Logo }) {
  return logo.src ? (
    <img src={logo.src} alt={logo.name} width={logo.width} className="h-8 w-auto" />
  ) : (
    <span className="flex items-center gap-2 text-xl font-semibold">{logo.logo ?? logo.name}</span>
  )
}

function LogoCloud03({ title, logos, duration = 40, labels, headingLevel = 2, id, className }: LogoCloud03Props) {
  const t = { ...labelsEn, ...labels }
  const [paused, setPaused] = React.useState(false)
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as "h2" | "h3"
  return (
    <Section id={sid} className={className}>
      <style>{KEYFRAMES}</style>
      <Container>
        <Heading id={`${sid}-heading`} className="text-center text-sm text-muted-foreground">
          {title}
        </Heading>
        <div className="mt-8 overflow-hidden">
          <div
            className={cn(
              "flex w-max items-center [--mizan-dir:1] rtl:[--mizan-dir:-1] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-safe:animate-[mizan-marquee_var(--mizan-duration)_linear_infinite] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6",
              paused && "[animation-play-state:paused]"
            )}
            style={{ "--mizan-duration": `${duration}s` } as React.CSSProperties}
          >
            <ul className="flex shrink-0 items-center gap-x-10 pe-10 motion-reduce:pe-0 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6">
              {logos.map((logo) => (
                <li key={logo.name} className="flex h-8 items-center text-foreground opacity-70 hover:opacity-100">
                  {logo.href ? (
                    <a href={logo.href}>
                      <Mark logo={logo} />
                    </a>
                  ) : (
                    <Mark logo={logo} />
                  )}
                </li>
              ))}
            </ul>
            <ul aria-hidden="true" className="flex shrink-0 items-center gap-x-10 pe-10 motion-reduce:hidden">
              {logos.map((logo) => (
                <li key={logo.name} className="flex h-8 items-center text-foreground opacity-70">
                  <Mark logo={logo} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex justify-center motion-reduce:hidden">
          <Button type="button" variant="ghost" size="sm" onClick={() => setPaused((p) => !p)}>
            {paused ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
            {paused ? t.play : t.pause}
          </Button>
        </div>
      </Container>
    </Section>
  )
}

const icon = (Icon: typeof BuildingsIcon, name: string) => (
  <>
    <Icon aria-hidden="true" weight="duotone" className="size-6" />
    {name}
  </>
)

const demo: { en: LogoCloud03Props; ar: LogoCloud03Props } = {
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

export { LogoCloud03, labelsEn, labelsAr, demo }
export type { LogoCloud03Props, Logo }
export default LogoCloud03
