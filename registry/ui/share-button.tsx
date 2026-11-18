"use client"

import * as React from "react"
import { ShareNetworkIcon, WhatsappLogoIcon, XLogoIcon } from "@phosphor-icons/react"
import { Button, buttonVariants } from "@/registry/ui/button"
import { CopyButton, type CopyButtonLabels } from "@/registry/ui/copy-button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type ShareButtonLabels = CopyButtonLabels & {
  share: string
  shared: string
  copyLink: string
  whatsapp: string
  x: string
}

const defaultLabels: ShareButtonLabels = {
  copy: "Copy",
  copied: "Copied",
  failed: "Copy failed. The text is selected: press Ctrl+C to copy it.",
  share: "Share",
  shared: "Shared",
  copyLink: "Copy link",
  whatsapp: "WhatsApp",
  x: "X",
}

const shareButtonLabelsAr: ShareButtonLabels = {
  copy: "نسخ",
  copied: "تم النسخ",
  failed: "تعذر النسخ. النص محدد: اضغط Ctrl+C لنسخه.",
  share: "مشاركة",
  shared: "تمت المشاركة",
  copyLink: "نسخ الرابط",
  whatsapp: "واتساب",
  x: "إكس",
}

const noop = () => () => {}
const canShare = () => typeof navigator.share === "function"
const cannotShare = () => false

type ShareButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  url: string
  title?: string
  text?: string
  labels?: Partial<ShareButtonLabels>
}

function ShareButton({ url, title, text, labels, children, ...props }: ShareButtonProps) {
  const l = { ...defaultLabels, ...labels }
  const native = React.useSyncExternalStore(noop, canShare, cannotShare)
  const [done, setDone] = React.useState(false)
  const message = encodeURIComponent([text ?? title, url].filter(Boolean).join(" "))
  const content = (
    <>
      <ShareNetworkIcon aria-hidden="true" data-icon="inline-start" />
      {children ?? l.share}
    </>
  )

  if (native) {
    return (
      <span data-slot="share-button" className="inline-flex">
        <Button
          type="button"
          variant="outline"
          onClick={async () => {
            try {
              await navigator.share({ url, title, text })
              setDone(true)
            } catch {
              // The user closed the share sheet.
            }
          }}
          {...props}
        >
          {content}
        </Button>
        <span role="status" className="sr-only">
          {done ? l.shared : ""}
        </span>
      </span>
    )
  }

  const link = buttonVariants({ variant: "ghost", className: "w-full justify-start" })
  return (
    <span data-slot="share-button" className="inline-flex">
      <Popover>
        <PopoverTrigger render={<Button type="button" variant="outline" {...props} />}>{content}</PopoverTrigger>
        <PopoverContent className="w-56 gap-1">
          <CopyButton
            value={url}
            variant="ghost"
            className="w-full justify-start"
            labels={{ copy: l.copyLink, copied: l.copied, failed: l.failed }}
          />
          <a className={link} href={`https://wa.me/?text=${message}`} target="_blank" rel="noopener noreferrer">
            <WhatsappLogoIcon aria-hidden="true" data-icon="inline-start" />
            {l.whatsapp}
          </a>
          <a
            className={link}
            href={`https://x.com/intent/post?text=${encodeURIComponent(text ?? title ?? "")}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <XLogoIcon aria-hidden="true" data-icon="inline-start" />
            {l.x}
          </a>
        </PopoverContent>
      </Popover>
    </span>
  )
}

export { ShareButton, shareButtonLabelsAr }
export type { ShareButtonLabels }
