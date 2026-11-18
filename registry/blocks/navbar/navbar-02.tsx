"use client"

import * as React from "react"
import { CubeIcon, GlobeIcon, ListIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
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

type NavLink = { label: string; href: string; current?: boolean }

type Navbar02Labels = {
  openMenu: string
  closeMenu: string
  language: string
  skipToContent: string
  primaryNav: string
  mobileNav: string
}

type Navbar02Props = BlockBase & {
  brand: { name: string; href: string; logo?: React.ReactNode }
  links: NavLink[]
  cta?: Action
  languages?: { code: Lang; label: string }[]
  language?: Lang
  onLanguageChange?: (code: Lang) => void
  sticky?: boolean
  mainId?: string
  labels?: Partial<Navbar02Labels>
}

const labelsEn: Navbar02Labels = {
  openMenu: "Open menu",
  closeMenu: "Close menu",
  language: "Language",
  skipToContent: "Skip to content",
  primaryNav: "Primary",
  mobileNav: "Mobile",
}

const labelsAr: Navbar02Labels = {
  openMenu: "فتح القائمة",
  closeMenu: "إغلاق القائمة",
  language: "اللغة",
  skipToContent: "تخطَّ إلى المحتوى",
  primaryNav: "التنقل الرئيسي",
  mobileNav: "قائمة الجوال",
}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function Navbar02({
  brand,
  links,
  cta,
  languages,
  language,
  onLanguageChange,
  sticky = true,
  mainId = "main-content",
  labels,
  className,
}: Navbar02Props) {
  const t = { ...labelsEn, ...labels }
  const dir = useDirection()
  return (
    <header className={cn("border-b bg-background", sticky && "sticky top-0 z-40", className)}>
      <a
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-3 focus:ring-ring/50"
      >
        {t.skipToContent}
      </a>
      <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center justify-start">
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
              {cta ? (
                <SheetFooter>
                  <a
                    href={cta.href}
                    {...external(cta)}
                    className={cn(buttonVariants({ size: "lg" }), "h-11 w-full text-base")}
                  >
                    {cta.label}
                  </a>
                </SheetFooter>
              ) : null}
            </SheetContent>
          </Sheet>
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
        </div>
        <a href={brand.href} className="flex items-center gap-2 text-lg font-semibold">
          {brand.logo}
          {brand.name}
        </a>
        <div className="flex items-center justify-end gap-2">
          {languages ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" className="size-11 lg:size-9" aria-label={t.language} />}
              >
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
          ) : null}
          {cta ? (
            <a
              href={cta.href}
              {...external(cta)}
              className={cn(buttonVariants({ size: "lg" }), "hidden h-10 px-4 lg:inline-flex")}
            >
              {cta.label}
            </a>
          ) : null}
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

const demo: { en: Navbar02Props; ar: Navbar02Props } = {
  en: {
    brand: { name: "Rafid", href: "#", logo },
    links: [
      { label: "Features", href: "#features", current: true },
      { label: "Pricing", href: "#pricing" },
      { label: "Customers", href: "#customers" },
    ],
    cta: { label: "Get started", href: "#start" },
    languages: [...languages],
    language: "en",
    sticky: false,
    labels: labelsEn,
  },
  ar: {
    brand: { name: "رافد", href: "#", logo },
    links: [
      { label: "المزايا", href: "#features", current: true },
      { label: "الأسعار", href: "#pricing" },
      { label: "عملاؤنا", href: "#customers" },
    ],
    cta: { label: "ابدأ الآن", href: "#start" },
    languages: [...languages],
    language: "ar",
    sticky: false,
    labels: labelsAr,
  },
}

export { Navbar02, labelsEn, labelsAr, demo }
export type { Navbar02Props, Navbar02Labels, NavLink }
export default Navbar02
