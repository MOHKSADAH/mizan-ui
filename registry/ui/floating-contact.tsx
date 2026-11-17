"use client"

import * as React from "react"
import { ChatIcon, HeadsetIcon, PhoneIcon, WhatsappLogoIcon, XIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { Button, buttonVariants } from "@/registry/ui/button"

type FloatingContactLabels = {
  open: string
  close: string
  whatsapp: string
  call: string
  chat: string
  newTab: string
}

const defaultLabels: FloatingContactLabels = {
  open: "Contact us",
  close: "Close contact options",
  whatsapp: "WhatsApp",
  call: "Call us",
  chat: "Live chat",
  newTab: "opens in a new tab",
}

const floatingContactLabelsAr: FloatingContactLabels = {
  open: "تواصل معنا",
  close: "إغلاق خيارات التواصل",
  whatsapp: "واتساب",
  call: "اتصل بنا",
  chat: "محادثة مباشرة",
  newTab: "يفتح في تبويب جديد",
}

// International format in, wa.me out: digits only, no plus and no leading zeros.
function whatsappHref(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "")
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`
}

type FloatingContactProps = Omit<React.ComponentProps<"div">, "children"> & {
  // International format, for example "+966501234567".
  whatsapp?: { phone: string; message?: string }
  phone?: string
  onChat?: () => void
  defaultOpen?: boolean
  labels?: Partial<FloatingContactLabels>
}

// Sits at the inline end and lifts by --sticky-bar-height so it clears a sticky buy bar.
function FloatingContact({ whatsapp, phone, onChat, defaultOpen = false, labels, className, ...props }: FloatingContactProps) {
  const t = { ...defaultLabels, ...labels }
  const [open, setOpen] = React.useState(defaultOpen)
  const root = React.useRef<HTMLDivElement>(null)
  const toggle = React.useRef<HTMLButtonElement>(null)
  const listId = React.useId()

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  const action = "justify-start rounded-full shadow-md"
  return (
    <div
      ref={root}
      data-slot="floating-contact"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false)
          toggle.current?.focus()
        }
      }}
      className={cn(
        "fixed end-[max(1rem,env(safe-area-inset-left),env(safe-area-inset-right))] bottom-[calc(1rem+var(--sticky-bar-height,0px)+env(safe-area-inset-bottom,0px))] z-40 flex flex-col items-end gap-2",
        className
      )}
      {...props}
    >
      {open && (
        <ul id={listId} className="flex flex-col items-end gap-2">
          {whatsapp && (
            <li>
              <a
                href={whatsappHref(whatsapp.phone, whatsapp.message)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), action)}
              >
                <WhatsappLogoIcon aria-hidden="true" />
                {t.whatsapp}
                <span className="sr-only">({t.newTab})</span>
              </a>
            </li>
          )}
          {phone && (
            <li>
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), action)}
              >
                <PhoneIcon aria-hidden="true" />
                {t.call}
              </a>
            </li>
          )}
          {onChat && (
            <li>
              <Button
                variant="secondary"
                size="lg"
                className={action}
                onClick={() => {
                  toggle.current?.focus()
                  setOpen(false)
                  onChat()
                }}
              >
                <ChatIcon aria-hidden="true" />
                {t.chat}
              </Button>
            </li>
          )}
        </ul>
      )}
      <Button
        ref={toggle}
        size="icon-lg"
        className="size-12 rounded-full shadow-lg"
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <XIcon aria-hidden="true" className="size-5" /> : <HeadsetIcon aria-hidden="true" className="size-5" />}
      </Button>
    </div>
  )
}

export { FloatingContact, floatingContactLabelsAr, whatsappHref }
export type { FloatingContactLabels }
