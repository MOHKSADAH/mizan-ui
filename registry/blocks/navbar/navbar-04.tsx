"use client"

import * as React from "react"
import { CubeIcon, GlobeIcon, ListIcon, PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { whatsappUrl } from "@/registry/lib/whatsapp"
import { Button, buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { useDirection } from "@/registry/ui/direction"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet"
import { WhatsAppButton } from "@/registry/ui/whatsapp-button"

type NavLink = { label: string; href: string; current?: boolean }

type Navbar04Labels = {
  openMenu: string
  closeMenu: string
  language: string
  skipToContent: string
  primaryNav: string
  mobileNav: string
  utilityBar: string
  whatsapp: string
  whatsappOpens: string
}

type Navbar04Props = BlockBase & {
  brand: { name: string; href: string; logo?: React.ReactNode }
  links: NavLink[]
  utility: { phone: string; whatsapp: { phone: string; message: string } }
  cta?: Action
  languages?: { code: Lang; label: string }[]
  language?: Lang
  onLanguageChange?: (code: Lang) => void
  sticky?: boolean
  mainId?: string
  labels?: Partial<Navbar04Labels>
}

const labelsEn: Navbar04Labels = {
  openMenu: "Open menu",
  closeMenu: "Close menu",
  language: "Language",
  skipToContent: "Skip to content",
  primaryNav: "Primary",
  mobileNav: "Mobile",
  utilityBar: "Contact",
  whatsapp: "WhatsApp",
  whatsappOpens: "(opens WhatsApp)",
}

const labelsAr: Navbar04Labels = {
  openMenu: "فتح القائمة",
  closeMenu: "إغلاق القائمة",
  language: "اللغة",
  skipToContent: "تخطَّ إلى المحتوى",
  primaryNav: "التنقل الرئيسي",
  mobileNav: "قائمة الجوال",
  utilityBar: "التواصل",
  whatsapp: "واتساب",
  whatsappOpens: "(يفتح واتساب)",
}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`

type LanguageMenuProps = Pick<Navbar04Props, "languages" | "language" | "onLanguageChange"> & {
  label: string
  className?: string
}

function LanguageMenu({ languages, language, onLanguageChange, label, className }: LanguageMenuProps) {
  if (!languages) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className={className} aria-label={label} />}>
        <GlobeIcon aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-36">
        <DropdownMenuRadioGroup value={language} onValueChange={(code) => onLanguageChange?.(code as Lang)}>
          {languages.map((l) => (
            <DropdownMenuRadioItem key={l.code} value={l.code} lang={l.code}>
              {l.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Navbar04({
  brand,
  links,
  utility,
  cta,
  languages,
  language,
  onLanguageChange,
  sticky = true,
  mainId = "main-content",
  labels,
  className,
}: Navbar04Props) {
  const t = { ...labelsEn, ...labels }
  const dir = useDirection()
  const phone = (
    <bdi dir="ltr" className="tabular-nums">
      {utility.phone}
    </bdi>
  )
  return (
    <header className={cn("border-b bg-background", sticky && "sticky top-0 z-40", className)}>
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-3 focus:ring-ring/50"
      >
        {t.skipToContent}
      </a>
      <div className="hidden h-9 border-b bg-muted text-sm md:block">
        <Container className="flex h-full items-center justify-between gap-4">
          <ul aria-label={t.utilityBar} className="flex items-center gap-4">
            <li>
              <a href={tel(utility.phone)} className="flex items-center gap-1.5 hover:underline">
                <PhoneIcon aria-hidden="true" className="size-4" />
                {phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(utility.whatsapp.phone, utility.whatsapp.message)}
                target="_blank"
                rel="noopener"
                aria-label={`${t.whatsapp} ${t.whatsappOpens}`}
                className="flex items-center gap-1.5 hover:underline"
              >
                <WhatsappLogoIcon aria-hidden="true" className="size-4" />
                {t.whatsapp}
              </a>
            </li>
          </ul>
          <LanguageMenu
            languages={languages}
            language={language}
            onLanguageChange={onLanguageChange}
            label={t.language}
            className="size-7"
          />
        </Container>
      </div>
      <Container className="flex h-16 items-center gap-6">
        <a href={brand.href} className="flex items-center gap-2 text-lg font-semibold">
          {brand.logo}
          {brand.name}
        </a>
        <NavigationMenu aria-label={t.primaryNav} className="hidden max-w-none lg:flex">
          <NavigationMenuList className="gap-1">
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  active={link.current}
                  aria-current={link.current ? "page" : undefined}
                  className={navigationMenuTriggerStyle()}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ms-auto flex items-center gap-2">
          <LanguageMenu
            languages={languages}
            language={language}
            onLanguageChange={onLanguageChange}
            label={t.language}
            className="size-11 md:hidden"
          />
          {cta ? (
            <a
              href={cta.href}
              {...external(cta)}
              className={cn(buttonVariants({ size: "lg" }), "hidden h-10 px-4 lg:inline-flex")}
            >
              {cta.label}
            </a>
          ) : null}
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="size-11 lg:hidden" aria-label={t.openMenu} />}
            >
              <ListIcon aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side={dir === "rtl" ? "right" : "left"} labels={{ close: t.closeMenu }}>
              <SheetHeader>
                <SheetTitle>{brand.name}</SheetTitle>
              </SheetHeader>
              <nav aria-label={t.mobileNav} className="flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <SheetClose
                    key={link.href}
                    nativeButton={false}
                    render={
                      <a
                        href={link.href}
                        aria-current={link.current ? "page" : undefined}
                        className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium hover:bg-muted aria-[current=page]:bg-muted"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <SheetFooter>
                <a
                  href={tel(utility.phone)}
                  className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-base hover:bg-muted"
                >
                  <PhoneIcon aria-hidden="true" />
                  {phone}
                </a>
                <WhatsAppButton
                  phone={utility.whatsapp.phone}
                  message={utility.whatsapp.message}
                  variant="outline"
                  className="h-11 w-full text-base"
                  labels={{ label: t.whatsapp, opens: t.whatsappOpens }}
                />
                {cta ? (
                  <a
                    href={cta.href}
                    {...external(cta)}
                    className={cn(buttonVariants({ size: "lg" }), "h-11 w-full text-base")}
                  >
                    {cta.label}
                  </a>
                ) : null}
              </SheetFooter>
            </SheetContent>
          </Sheet>
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

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const

const demo: { en: Navbar04Props; ar: Navbar04Props } = {
  en: {
    brand: { name: "Rafid", href: "#", logo },
    links: [
      { label: "Services", href: "#services", current: true },
      { label: "Pricing", href: "#pricing" },
      { label: "Branches", href: "#branches" },
      { label: "Contact", href: "#contact" },
    ],
    utility: {
      phone: "+966 11 555 0142",
      whatsapp: { phone: "+966 50 555 0142", message: "Hello, I would like to ask about your services." },
    },
    cta: { label: "Book a visit", href: "#book" },
    languages: [...languages],
    language: "en",
    sticky: false,
    labels: labelsEn,
  },
  ar: {
    brand: { name: "رافد", href: "#", logo },
    links: [
      { label: "خدماتنا", href: "#services", current: true },
      { label: "الأسعار", href: "#pricing" },
      { label: "فروعنا", href: "#branches" },
      { label: "تواصل معنا", href: "#contact" },
    ],
    utility: {
      phone: "+966 11 555 0142",
      whatsapp: { phone: "+966 50 555 0142", message: "السلام عليكم، أرغب في الاستفسار عن خدماتكم." },
    },
    cta: { label: "احجز زيارتك", href: "#book" },
    languages: [...languages],
    language: "ar",
    sticky: false,
    labels: labelsAr,
  },
}

export { Navbar04, labelsEn, labelsAr, demo }
export type { Navbar04Props, Navbar04Labels, NavLink }
export default Navbar04
