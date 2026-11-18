"use client"

import * as React from "react"
import { XIcon } from "@phosphor-icons/react"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"

type Banner01Labels = { region: string; dismiss: string }

type Banner01Props = Omit<BlockBase, "headingLevel"> & {
  message: string
  action?: Action
  dismissible?: boolean
  onDismiss?: () => void
  labels?: Partial<Banner01Labels>
}

const labelsEn: Banner01Labels = { region: "Announcement", dismiss: "Dismiss announcement" }
const labelsAr: Banner01Labels = { region: "إعلان", dismiss: "إغلاق الإعلان" }

function Banner01({ message, action, dismissible = false, onDismiss, labels, className }: Banner01Props) {
  const t = { ...labelsEn, ...labels }
  const [open, setOpen] = React.useState(true)
  if (!open) return null
  return (
    <div role="region" aria-label={t.region} className={cn("bg-primary text-primary-foreground", className)}>
      <Container className="flex h-10 items-center gap-2 text-sm">
        {dismissible ? <span aria-hidden="true" className="size-7 shrink-0" /> : null}
        <p className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center">
          <span className="truncate">{message}</span>
          {action ? (
            <a
              href={action.href}
              {...(action.external ? { target: "_blank", rel: "noopener" } : {})}
              className="shrink-0 font-medium underline underline-offset-4"
            >
              {action.label}
            </a>
          ) : null}
        </p>
        {dismissible ? (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={t.dismiss}
            onClick={() => {
              setOpen(false)
              onDismiss?.()
            }}
            className="shrink-0 text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
          >
            <XIcon aria-hidden="true" />
          </Button>
        ) : null}
      </Container>
    </div>
  )
}

const demo: { en: Banner01Props; ar: Banner01Props } = {
  en: {
    message: "Free shipping on every order this week",
    action: { label: "Shop now", href: "#shop" },
    dismissible: true,
    labels: labelsEn,
  },
  ar: {
    message: "شحن مجاني على جميع الطلبات هذا الأسبوع",
    action: { label: "تسوق الآن", href: "#shop" },
    dismissible: true,
    labels: labelsAr,
  },
}

export { Banner01, labelsEn, labelsAr, demo }
export type { Banner01Props, Banner01Labels }
export default Banner01
