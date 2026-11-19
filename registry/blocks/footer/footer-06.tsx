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

function Footer06({ wordmark, links, legal, labels, className }: Footer06Props) {
  const t = { ...labelsEn, ...labels }
  return (
    <footer className={cn("border-t bg-background", className)}>
      <Container className="flex flex-col items-center gap-6 py-12 text-center lg:py-16">
        <p className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">{wordmark}</p>
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
