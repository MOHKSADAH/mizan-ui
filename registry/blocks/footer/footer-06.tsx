"use client"

import * as React from "react"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"

type FooterLink = { label: string; href: string }

type Footer06Labels = { navigation: string }

type Footer06Props = Omit<BlockBase, "headingLevel"> & {
  wordmark: string
  links: FooterLink[]
  legal: string
  labels?: Partial<Footer06Labels>
}

const labelsEn: Footer06Labels = { navigation: "Footer" }
const labelsAr: Footer06Labels = { navigation: "روابط التذييل" }

const MEASURE_SIZE = 100

// Sets the font size so the word spans its box. Only font-size changes and letter spacing stays normal, so Arabic letters keep joining.
function useFitWidth() {
  const box = React.useRef<HTMLDivElement>(null)
  const word = React.useRef<HTMLParagraphElement>(null)
  React.useLayoutEffect(() => {
    const el = box.current
    const text = word.current
    if (!el || !text) return
    const fit = () => {
      text.style.fontSize = `${MEASURE_SIZE}px`
      const width = text.getBoundingClientRect().width
      if (width) text.style.fontSize = `${(MEASURE_SIZE * el.clientWidth) / width}px`
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    document.fonts?.ready.then(fit)
    return () => observer.disconnect()
  }, [])
  return { box, word }
}

function Footer06({ wordmark, links, legal, labels, className }: Footer06Props) {
  const t = { ...labelsEn, ...labels }
  const { box, word } = useFitWidth()
  return (
    <footer className={cn("overflow-hidden border-t bg-background", className)}>
      <Container className="flex flex-col items-center gap-6 pt-12 lg:pt-16">
        <nav aria-label={t.navigation}>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-base font-medium">
            {links.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-6 items-center hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-muted-foreground">{legal}</p>
        <div ref={box} aria-hidden="true" className="w-full [container-type:inline-size]">
          <p
            ref={word}
            className="inline-block text-[22cqw] leading-none font-bold tracking-normal whitespace-nowrap [&:lang(ar)]:leading-[1.5]"
          >
            {wordmark}
          </p>
        </div>
      </Container>
    </footer>
  )
}

const demo: { en: Footer06Props; ar: Footer06Props } = {
  en: {
    wordmark: "Rewaq",
    links: [
      { label: "Catalog", href: "#catalog" },
      { label: "Authors", href: "#authors" },
      { label: "Bookstores", href: "#bookstores" },
      { label: "Submit a manuscript", href: "#submit" },
      { label: "Contact us", href: "#contact" },
      { label: "Privacy", href: "#privacy" },
    ],
    legal: "© 2026 Rewaq Publishing. Riyadh, Saudi Arabia.",
    labels: labelsEn,
  },
  ar: {
    wordmark: "دار رواق",
    links: [
      { label: "الإصدارات", href: "#catalog" },
      { label: "المؤلفون", href: "#authors" },
      { label: "المكتبات", href: "#bookstores" },
      { label: "أرسل مخطوطتك", href: "#submit" },
      { label: "تواصل معنا", href: "#contact" },
      { label: "الخصوصية", href: "#privacy" },
    ],
    legal: "© 2026 دار رواق للنشر. الرياض، المملكة العربية السعودية.",
    labels: labelsAr,
  },
}

export { Footer06, labelsEn, labelsAr, demo }
export type { Footer06Props, Footer06Labels, FooterLink }
export default Footer06
