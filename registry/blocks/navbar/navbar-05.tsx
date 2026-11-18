import * as React from "react"
import { CubeIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { WhatsAppButton } from "@/registry/ui/whatsapp-button"

type Navbar05Labels = { whatsapp: string; whatsappOpens: string }

type Navbar05Props = BlockBase & {
  brand: { name: string; href: string; logo?: React.ReactNode }
  cta: Action
  whatsapp?: { phone: string; message: string }
  sticky?: boolean
  labels?: Partial<Navbar05Labels>
}

const labelsEn: Navbar05Labels = { whatsapp: "Chat on WhatsApp", whatsappOpens: "(opens WhatsApp)" }
const labelsAr: Navbar05Labels = { whatsapp: "تواصل عبر واتساب", whatsappOpens: "(يفتح واتساب)" }

function Navbar05({ brand, cta, whatsapp, sticky = true, labels, className }: Navbar05Props) {
  const t = { ...labelsEn, ...labels }
  return (
    <header className={cn("border-b bg-background", sticky && "sticky top-0 z-40", className)}>
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href={brand.href} className="flex items-center gap-2 text-lg font-semibold">
          {brand.logo}
          {brand.name}
        </a>
        <div className="flex items-center gap-2">
          {whatsapp ? (
            <WhatsAppButton
              phone={whatsapp.phone}
              message={whatsapp.message}
              variant="icon"
              className="size-11"
              labels={{ label: t.whatsapp, opens: t.whatsappOpens }}
            />
          ) : null}
          <a
            href={cta.href}
            {...(cta.external ? { target: "_blank", rel: "noopener" } : {})}
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-4 text-sm")}
          >
            {cta.label}
          </a>
        </div>
      </Container>
    </header>
  )
}

const logo = (
  <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
    <CubeIcon aria-hidden="true" weight="fill" />
  </span>
)

const demo: { en: Navbar05Props; ar: Navbar05Props } = {
  en: {
    brand: { name: "Rafid", href: "#", logo },
    cta: { label: "Book a demo", href: "#demo" },
    whatsapp: { phone: "966505550142", message: "Hello Rafid, I would like to book a demo." },
    sticky: false,
    labels: labelsEn,
  },
  ar: {
    brand: { name: "رافد", href: "#", logo },
    cta: { label: "احجز عرضًا تجريبيًا", href: "#demo" },
    whatsapp: { phone: "966505550142", message: "السلام عليكم، أرغب في حجز عرض تجريبي لرافد." },
    sticky: false,
    labels: labelsAr,
  },
}

export { Navbar05, labelsEn, labelsAr, demo }
export type { Navbar05Props, Navbar05Labels }
export default Navbar05
