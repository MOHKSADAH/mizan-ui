import * as React from "react"
import { WhatsappLogoIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { whatsappUrl } from "@/registry/lib/whatsapp"
import { buttonVariants } from "@/registry/ui/button"

type WhatsAppButtonLabels = { label: string; opens: string }

const defaultLabels: WhatsAppButtonLabels = { label: "Chat on WhatsApp", opens: "(opens WhatsApp)" }
const whatsappButtonLabelsAr: WhatsAppButtonLabels = { label: "تواصل عبر واتساب", opens: "(يفتح واتساب)" }

const VARIANTS = {
  primary: { variant: "default", size: "lg" },
  secondary: { variant: "secondary", size: "lg" },
  outline: { variant: "outline", size: "lg" },
  icon: { variant: "default", size: "icon-lg" },
} as const

type WhatsAppButtonProps = Omit<React.ComponentProps<"a">, "href" | "children"> & {
  phone: string
  message?: string
  variant?: keyof typeof VARIANTS
  // Fixed at the end-bottom corner. A parent sets --mizan-float-offset (for example 5rem) to lift it above a sticky bar.
  floating?: boolean
  labels?: Partial<WhatsAppButtonLabels>
}

function WhatsAppButton({
  phone,
  message,
  variant = "primary",
  floating,
  labels,
  className,
  ...props
}: WhatsAppButtonProps) {
  const t = { ...defaultLabels, ...labels }
  const iconOnly = floating || variant === "icon"
  return (
    <a
      data-slot="whatsapp-button"
      href={whatsappUrl(phone, message)}
      target="_blank"
      rel="noopener"
      aria-label={`${t.label} ${t.opens}`}
      className={cn(
        buttonVariants(floating ? VARIANTS.icon : VARIANTS[variant]),
        floating && "fixed end-4 bottom-[calc(1rem+var(--mizan-float-offset,0px))] z-40 size-12 rounded-full",
        className
      )}
      {...props}
    >
      <WhatsappLogoIcon weight="fill" aria-hidden="true" className={floating ? "size-6" : undefined} />
      {iconOnly ? null : t.label}
    </a>
  )
}

export { WhatsAppButton, whatsappButtonLabelsAr }
export type { WhatsAppButtonLabels }
