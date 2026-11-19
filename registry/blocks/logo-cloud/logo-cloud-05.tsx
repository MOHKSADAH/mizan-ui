import * as React from "react"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"
import { Section } from "@/registry/ui/section"

type Weight = "light" | "normal" | "medium" | "bold" | "black"

// A brand set as text. The weight is what tells the marks apart, so there are no invented logos.
type Brand = { name: string; weight: Weight; href?: string }

type LogoCloud05Props = BlockBase & {
  // One sentence of social proof. Mix weights with <strong>: the heading is font-normal.
  title: React.ReactNode
  brands: Brand[]
}

const labelsEn = {}
const labelsAr = {}

const WEIGHT: Record<Weight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
  black: "font-black",
}

function LogoCloud05({ title, brands, headingLevel = 2, id, className }: LogoCloud05Props) {
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  return (
    <Section id={sid} className={className}>
      <Container className="flex flex-col gap-10">
        <Heading id={`${sid}-heading`} className="max-w-3xl text-2xl font-normal text-balance md:text-3xl lg:text-4xl">
          {title}
        </Heading>
        <ul className="grid grid-cols-2 border-t border-s md:grid-cols-4">
          {brands.map(({ name, weight, href }) => {
            const mark = <span className={cn("text-2xl text-balance md:text-3xl", WEIGHT[weight])}>{name}</span>
            return (
              <li
                key={name}
                className="flex h-32 items-center justify-center border-e border-b px-4 text-center text-foreground md:h-40"
              >
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
    title: (
      <>
        <strong>Over 400 retailers</strong> and clinics in the Kingdom run on Rafid every day
      </>
    ),
    brands: [
      { name: "Al Dar Perfumes", weight: "bold" },
      { name: "Jabal Coffee", weight: "light" },
      { name: "Bayti Sweets", weight: "black" },
      { name: "Naseej Home", weight: "medium" },
      { name: "Sudair Clinics", weight: "normal" },
      { name: "Wadi Market", weight: "black" },
      { name: "Najd Trading", weight: "light" },
      { name: "Dar Academy", weight: "bold" },
    ],
  },
  ar: {
    title: (
      <>
        <strong>أكثر من 400 متجر وعيادة</strong> في المملكة تعمل على رافد كل يوم
      </>
    ),
    brands: [
      { name: "عطور الدار", weight: "bold" },
      { name: "قهوة الجبل", weight: "light" },
      { name: "حلويات بيتي", weight: "black" },
      { name: "نسيج", weight: "medium" },
      { name: "عيادات سدير", weight: "normal" },
      { name: "سوق الوادي", weight: "black" },
      { name: "نجد للتجارة", weight: "light" },
      { name: "أكاديمية دار", weight: "bold" },
    ],
  },
}

export { LogoCloud05, labelsEn, labelsAr, demo }
export type { LogoCloud05Props, Brand as LogoCloud05Brand }
export default LogoCloud05
