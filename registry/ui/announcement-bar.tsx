"use client"

import * as React from "react"
import { XIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { Button } from "@/registry/ui/button"

type AnnouncementBarLabels = {
  region: string
  dismiss: string
}

const defaultLabels: AnnouncementBarLabels = { region: "Announcement", dismiss: "Dismiss announcement" }
const announcementBarLabelsAr: AnnouncementBarLabels = { region: "إعلان", dismiss: "إغلاق الإعلان" }

const tones = {
  default: "bg-muted text-foreground",
  primary: "bg-primary text-primary-foreground",
}

type AnnouncementBarProps = Omit<React.ComponentProps<"div">, "children"> & {
  children: React.ReactNode
  tone?: keyof typeof tones
  // A link or button, shown after the message.
  action?: React.ReactNode
  // For example a Countdown, shown after the action.
  countdown?: React.ReactNode
  sticky?: boolean
  dismissible?: boolean
  // Pass the stored choice to start hidden. The bar keeps no storage of its own.
  dismissed?: boolean
  dismissKey?: string
  onDismiss?: (dismissKey?: string) => void
  labels?: Partial<AnnouncementBarLabels>
}

function AnnouncementBar({
  children,
  tone = "default",
  action,
  countdown,
  sticky,
  dismissible = true,
  dismissed,
  dismissKey,
  onDismiss,
  labels,
  className,
  ...props
}: AnnouncementBarProps) {
  const l = { ...defaultLabels, ...labels }
  const [hidden, setHidden] = React.useState(false)
  if (dismissed ?? hidden) return null
  return (
    <div
      data-slot="announcement-bar"
      role="region"
      aria-label={l.region}
      className={cn(
        "relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-12 py-2 text-center text-sm",
        tones[tone],
        sticky && "sticky top-0 z-40",
        className
      )}
      {...props}
    >
      <p>{children}</p>
      {action && <span className="font-medium underline underline-offset-4 [&_a]:underline">{action}</span>}
      {countdown}
      {dismissible && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute top-1/2 end-2 -translate-y-1/2"
          aria-label={l.dismiss}
          onClick={() => {
            setHidden(true)
            onDismiss?.(dismissKey)
          }}
        >
          <XIcon aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}

export { AnnouncementBar, announcementBarLabelsAr }
export type { AnnouncementBarLabels }
