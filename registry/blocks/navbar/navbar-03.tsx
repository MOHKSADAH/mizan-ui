"use client"

import * as React from "react"
import { CubeIcon, GlobeIcon, ListIcon } from "@phosphor-icons/react"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
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
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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

type NavChild = { label: string; href: string; description?: string }
type NavLink = { label: string; href: string; current?: boolean; children?: NavChild[] }

type Navbar03Labels = {
  openMenu: string
  closeMenu: string
  language: string
  skipToContent: string
  primaryNav: string
  mobileNav: string
}

type Navbar03Props = BlockBase & {
  brand: { name: string; href: string; logo?: React.ReactNode }
  links: NavLink[]
  cta?: Action
  languages?: { code: Lang; label: string }[]
  language?: Lang
  onLanguageChange?: (code: Lang) => void
  sticky?: boolean
  mainId?: string
  labels?: Partial<Navbar03Labels>
}

const labelsEn: Navbar03Labels = {
  openMenu: "Open menu",
  closeMenu: "Close menu",
  language: "Language",
  skipToContent: "Skip to content",
  primaryNav: "Primary",
  mobileNav: "Mobile",
}

const labelsAr: Navbar03Labels = {
  openMenu: "فتح القائمة",
  closeMenu: "إغلاق القائمة",
  language: "اللغة",
  skipToContent: "تخطَّ إلى المحتوى",
  primaryNav: "التنقل الرئيسي",
  mobileNav: "قائمة الجوال",
}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

const mobileLink =
  "flex min-h-11 items-center rounded-lg px-3 text-base font-medium hover:bg-muted aria-[current=page]:bg-muted"

function Navbar03({
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
}: Navbar03Props) {
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
      <Container className="flex h-16 items-center gap-6">
        <a href={brand.href} className="flex items-center gap-2 text-lg font-semibold">
          {brand.logo}
          {brand.name}
        </a>
        <NavigationMenu aria-label={t.primaryNav} className="hidden max-w-none lg:flex">
          <NavigationMenuList className="gap-1">
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                {link.children?.length ? (
                  <>
                    <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[48rem] max-w-full grid-cols-3 gap-1 p-2">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink href={child.href} className="h-full flex-col items-start gap-1 p-3">
                              <span className="font-medium">{child.label}</span>
                              {child.description ? (
                                <span className="text-sm text-muted-foreground">{child.description}</span>
                              ) : null}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    href={link.href}
                    active={link.current}
                    aria-current={link.current ? "page" : undefined}
                    className={navigationMenuTriggerStyle()}
                  >
                    {link.label}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ms-auto flex items-center gap-2">
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
              <nav aria-label={t.mobileNav} className="flex flex-col gap-1 overflow-y-auto px-4">
                {links.map((link) =>
                  link.children?.length ? (
                    <Accordion key={link.href}>
                      <AccordionItem value={link.href} className="border-b-0">
                        <AccordionTrigger className="min-h-11 items-center px-3 text-base">{link.label}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="flex flex-col gap-1 ps-3">
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <SheetClose
                                  nativeButton={false}
                                  render={<a href={child.href} className={cn(mobileLink, "flex-col items-start justify-center py-2")} />}
                                >
                                  <span>{child.label}</span>
                                  {child.description ? (
                                    <span className="text-sm font-normal text-muted-foreground">{child.description}</span>
                                  ) : null}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <SheetClose
                      key={link.href}
                      nativeButton={false}
                      render={<a href={link.href} aria-current={link.current ? "page" : undefined} className={mobileLink} />}
                    >
                      {link.label}
                    </SheetClose>
                  )
                )}
              </nav>
              {cta ? (
                <SheetFooter>
                  <a href={cta.href} {...external(cta)} className={cn(buttonVariants({ size: "lg" }), "h-11 w-full text-base")}>
                    {cta.label}
                  </a>
                </SheetFooter>
              ) : null}
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

const demo: { en: Navbar03Props; ar: Navbar03Props } = {
  en: {
    brand: { name: "Rafid", href: "#", logo },
    links: [
      {
        label: "Products",
        href: "#products",
        children: [
          { label: "Invoicing", href: "#invoicing", description: "Compliant e-invoices in one click." },
          { label: "Inventory", href: "#inventory", description: "Stock across every warehouse and branch." },
          { label: "Payments", href: "#payments", description: "Accept mada, Apple Pay and bank transfer." },
          { label: "Reports", href: "#reports", description: "Live sales and profit dashboards." },
          { label: "Payroll", href: "#payroll", description: "Salaries and WPS files without spreadsheets." },
          { label: "Integrations", href: "#integrations", description: "Connect your store and accounting tools." },
        ],
      },
      { label: "Pricing", href: "#pricing", current: true },
      {
        label: "Resources",
        href: "#resources",
        children: [
          { label: "Help center", href: "#help", description: "Guides and answers to common questions." },
          { label: "Blog", href: "#blog", description: "Tips for growing your business." },
          { label: "API docs", href: "#api", description: "Build on top of Rafid." },
        ],
      },
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
      {
        label: "المنتجات",
        href: "#products",
        children: [
          { label: "الفوترة", href: "#invoicing", description: "فواتير إلكترونية متوافقة بضغطة واحدة." },
          { label: "المخزون", href: "#inventory", description: "تابع الكميات في كل مستودع وفرع." },
          { label: "المدفوعات", href: "#payments", description: "اقبل مدى وأبل باي والتحويل البنكي." },
          { label: "التقارير", href: "#reports", description: "لوحات فورية للمبيعات والأرباح." },
          { label: "الرواتب", href: "#payroll", description: "رواتب وملفات حماية الأجور دون جداول يدوية." },
          { label: "التكاملات", href: "#integrations", description: "اربط متجرك وأدوات المحاسبة." },
        ],
      },
      { label: "الأسعار", href: "#pricing", current: true },
      {
        label: "المصادر",
        href: "#resources",
        children: [
          { label: "مركز المساعدة", href: "#help", description: "أدلة وإجابات عن الأسئلة الشائعة." },
          { label: "المدونة", href: "#blog", description: "نصائح لتنمية أعمالك." },
          { label: "وثائق الواجهة البرمجية", href: "#api", description: "ابنِ حلولك فوق رافد." },
        ],
      },
      { label: "عملاؤنا", href: "#customers" },
    ],
    cta: { label: "ابدأ الآن", href: "#start" },
    languages: [...languages],
    language: "ar",
    sticky: false,
    labels: labelsAr,
  },
}

export { Navbar03, labelsEn, labelsAr, demo }
export type { Navbar03Props, Navbar03Labels, NavLink, NavChild }
export default Navbar03
