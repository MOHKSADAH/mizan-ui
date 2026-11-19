import * as React from "react"
import { ArrowRightIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Card, CardContent } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"

type FooterLink = { label: string; href: string }

type Footer07Labels = { crNumber: string; vatNumber: string }

type Footer07Props = Omit<BlockBase, "headingLevel"> & {
  title: React.ReactNode
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  brand: { name: string; description?: string }
  columns: { title: string; links: FooterLink[] }[]
  legal: { text: string; links: FooterLink[]; crNumber?: string; vatNumber?: string }
  labels?: Partial<Footer07Labels>
}

const labelsEn: Footer07Labels = { crNumber: "CR", vatNumber: "VAT" }
const labelsAr: Footer07Labels = { crNumber: "السجل التجاري", vatNumber: "الرقم الضريبي" }

const link = "inline-flex min-h-6 items-center hover:text-foreground hover:underline"
const cta = "h-12 w-full px-6 text-base sm:w-auto"

function Footer07({
  title,
  description,
  primaryCta,
  secondaryCta,
  brand,
  columns,
  legal,
  labels,
  className,
}: Footer07Props) {
  const t = { ...labelsEn, ...labels }
  return (
    <footer className={cn("bg-background pt-12 pb-6 lg:pt-16", className)}>
      <Container>
        <Card className="md:[--card-spacing:--spacing(10)]">
          <CardContent className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-3">
              <p className="text-2xl font-semibold text-balance md:text-3xl lg:text-4xl">{title}</p>
              {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={primaryCta.href} className={cn(buttonVariants(), cta, "gap-2")}>
                {primaryCta.label}
                <ArrowRightIcon aria-hidden="true" weight="bold" className="rtl:rotate-180" />
              </a>
              {secondaryCta ? (
                <a href={secondaryCta.href} className={cn(buttonVariants({ variant: "outline" }), cta)}>
                  {secondaryCta.label}
                </a>
              ) : null}
            </div>
          </CardContent>
        </Card>
        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
            <div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
              <p className="text-lg font-semibold">{brand.name}</p>
              {brand.description ? <p className="max-w-xs text-sm text-muted-foreground">{brand.description}</p> : null}
            </div>
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="mb-3 text-sm font-semibold">{column.title}</p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className={link}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-4">
              <p>{legal.text}</p>
              {legal.crNumber ? (
                <p>
                  {t.crNumber}: <bdi className="tabular-nums">{legal.crNumber}</bdi>
                </p>
              ) : null}
              {legal.vatNumber ? (
                <p>
                  {t.vatNumber}: <bdi className="tabular-nums">{legal.vatNumber}</bdi>
                </p>
              ) : null}
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {legal.links.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={link}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}

const demo: { en: Footer07Props; ar: Footer07Props } = {
  en: {
    title: "Send your first e-invoice today",
    description: "ZATCA-compliant invoicing. Set up in ten minutes, no accountant needed.",
    primaryCta: { label: "Start free", href: "#start" },
    secondaryCta: { label: "Book a demo", href: "#demo" },
    brand: { name: "Qayd", description: "Accounting and e-invoicing for small businesses in the Kingdom." },
    columns: [
      {
        title: "Product",
        links: [
          { label: "E-invoicing", href: "#invoicing" },
          { label: "Expenses", href: "#expenses" },
          { label: "VAT returns", href: "#vat" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About us", href: "#about" },
          { label: "Careers", href: "#careers" },
          { label: "Contact us", href: "#contact" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Guides", href: "#guides" },
          { label: "Pricing", href: "#pricing" },
          { label: "Service status", href: "#status" },
        ],
      },
    ],
    legal: {
      text: "© 2026 Qayd. All rights reserved.",
      crNumber: "1010456789",
      vatNumber: "300045678900003",
      links: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ],
    },
    labels: labelsEn,
  },
  ar: {
    title: "أصدر أول فاتورة إلكترونية لك اليوم",
    description: "فوترة متوافقة مع هيئة الزكاة والضريبة والجمارك. تجهّز حسابك في عشر دقائق، ولا تحتاج محاسبًا.",
    primaryCta: { label: "ابدأ مجانًا", href: "#start" },
    secondaryCta: { label: "احجز عرضًا", href: "#demo" },
    brand: { name: "قيد", description: "محاسبة وفوترة إلكترونية للمنشآت الصغيرة في المملكة." },
    columns: [
      {
        title: "المنتج",
        links: [
          { label: "الفوترة الإلكترونية", href: "#invoicing" },
          { label: "المصروفات", href: "#expenses" },
          { label: "إقرارات الضريبة", href: "#vat" },
        ],
      },
      {
        title: "الشركة",
        links: [
          { label: "من نحن", href: "#about" },
          { label: "الوظائف", href: "#careers" },
          { label: "تواصل معنا", href: "#contact" },
        ],
      },
      {
        title: "المساعدة",
        links: [
          { label: "الأدلة", href: "#guides" },
          { label: "الأسعار", href: "#pricing" },
          { label: "حالة الخدمة", href: "#status" },
        ],
      },
    ],
    legal: {
      text: "© 2026 قيد. جميع الحقوق محفوظة.",
      crNumber: "1010456789",
      vatNumber: "300045678900003",
      links: [
        { label: "الخصوصية", href: "#privacy" },
        { label: "الشروط والأحكام", href: "#terms" },
      ],
    },
    labels: labelsAr,
  },
}

export { Footer07, labelsEn, labelsAr, demo }
export type { Footer07Props, Footer07Labels, FooterLink }
export default Footer07
