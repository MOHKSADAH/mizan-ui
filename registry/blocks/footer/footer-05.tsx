"use client"

import * as React from "react"
import { PhoneIcon } from "@phosphor-icons/react"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { useDirection } from "@/registry/ui/direction"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { WhatsAppButton } from "@/registry/ui/whatsapp-button"

type FooterLink = { label: string; href: string }

type Footer05Labels = {
  support: string
  country: string
  getApp: string
  downloadFrom: string
  crNumber: string
  vatNumber: string
  whatsapp: string
  whatsappOpens: string
}

type Footer05Props = Omit<BlockBase, "headingLevel"> & {
  brand: { name: string; description?: string }
  columns: { title: string; links: FooterLink[] }[]
  support?: { phone: string; hours?: string; whatsapp?: { phone: string; message: string } }
  // Each option shows its country code as text, never a flag emoji.
  country?: { options: { code: string; name: string }[]; defaultValue: string; onValueChange?: (code: string) => void }
  apps?: { store: string; href: string }[]
  legal: {
    text: string
    links: FooterLink[]
    crNumber?: string
    vatNumber?: string
    licence?: { text: string; number?: string }
  }
  labels?: Partial<Footer05Labels>
}

const labelsEn: Footer05Labels = {
  support: "Customer support",
  country: "Country or region",
  getApp: "Get the app",
  downloadFrom: "Download from",
  crNumber: "Commercial registration",
  vatNumber: "VAT number",
  whatsapp: "Chat on WhatsApp",
  whatsappOpens: "(opens WhatsApp)",
}

const labelsAr: Footer05Labels = {
  support: "خدمة العملاء",
  country: "الدولة أو المنطقة",
  getApp: "حمّل التطبيق",
  downloadFrom: "حمّل من",
  crNumber: "السجل التجاري",
  vatNumber: "الرقم الضريبي",
  whatsapp: "تواصل عبر واتساب",
  whatsappOpens: "(يفتح واتساب)",
}

const link = "inline-flex min-h-6 items-center hover:text-foreground hover:underline"

const code = "inline-flex h-5 min-w-8 items-center justify-center rounded-sm border px-1 text-xs font-medium tabular-nums"

function Footer05({ brand, columns, support, country, apps, legal, labels, className }: Footer05Props) {
  const t = { ...labelsEn, ...labels }
  const dir = useDirection()
  const names = new Map(country?.options.map((o) => [o.code, o.name]))
  return (
    <footer className={cn("border-t bg-background", className)}>
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col items-start gap-6 lg:col-span-4">
            <div className="flex flex-col gap-3">
              <p className="text-xl font-semibold">{brand.name}</p>
              {brand.description ? <p className="max-w-sm text-sm text-muted-foreground">{brand.description}</p> : null}
            </div>
            {support ? (
              <div className="flex flex-col items-start gap-3">
                <p className="text-sm text-muted-foreground">{t.support}</p>
                <a
                  href={`tel:${support.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex min-h-6 items-center gap-2 text-2xl font-semibold"
                >
                  <PhoneIcon aria-hidden="true" weight="bold" className="size-5 shrink-0" />
                  <bdi dir="ltr" className="tabular-nums">
                    {support.phone}
                  </bdi>
                </a>
                {support.hours ? <p className="text-sm text-muted-foreground">{support.hours}</p> : null}
                {support.whatsapp ? (
                  <WhatsAppButton
                    phone={support.whatsapp.phone}
                    message={support.whatsapp.message}
                    variant="outline"
                    className="h-10 px-4"
                    labels={{ label: t.whatsapp, opens: t.whatsappOpens }}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-8 lg:col-span-8">
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
        </div>
        {country || apps?.length ? (
          <div className="mt-10 flex flex-col gap-6 border-t pt-6 md:flex-row md:items-center md:justify-between">
            {country ? (
              <Select
                defaultValue={country.defaultValue}
                items={country.options.map((o) => ({ value: o.code, label: o.name }))}
                onValueChange={(value) => value && country.onValueChange?.(value)}
              >
                <SelectTrigger aria-label={t.country} className="h-10 w-full min-w-52 md:w-fit">
                  <SelectValue>
                    {(value: string) => (
                      <>
                        <span className={code}>{value}</span>
                        {names.get(value)}
                      </>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent dir={dir} alignItemWithTrigger={false} className="min-w-52">
                  {country.options.map((o) => (
                    <SelectItem key={o.code} value={o.code}>
                      <span className={code}>{o.code}</span>
                      {o.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : null}
            {apps?.length ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <p className="text-sm font-semibold">{t.getApp}</p>
                <ul className="flex flex-wrap gap-2">
                  {apps.map((app) => (
                    <li key={app.store}>
                      <a
                        href={app.href}
                        className={cn(buttonVariants({ variant: "outline" }), "h-12 flex-col items-start gap-0 px-4")}
                      >
                        <span className="text-xs font-normal text-muted-foreground">{t.downloadFrom}</span>
                        <bdi dir="ltr" className="text-sm font-semibold">
                          {app.store}
                        </bdi>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
        <div className="mt-6 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2">
            <p>{legal.text}</p>
            {legal.crNumber || legal.vatNumber ? (
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                {legal.crNumber ? (
                  <span>
                    {t.crNumber}: <bdi className="tabular-nums">{legal.crNumber}</bdi>
                  </span>
                ) : null}
                {legal.vatNumber ? (
                  <span>
                    {t.vatNumber}: <bdi className="tabular-nums">{legal.vatNumber}</bdi>
                  </span>
                ) : null}
              </p>
            ) : null}
            {legal.licence ? (
              <p className="max-w-xl">
                {legal.licence.text}
                {legal.licence.number ? (
                  <>
                    {" "}
                    <bdi className="tabular-nums">{legal.licence.number}</bdi>
                  </>
                ) : null}
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
      </Container>
    </footer>
  )
}

const demo: { en: Footer05Props; ar: Footer05Props } = {
  en: {
    brand: {
      name: "Marsa Payments",
      description: "Payment and installment solutions for merchants across the Kingdom and the Gulf.",
    },
    columns: [
      {
        title: "Products",
        links: [
          { label: "Payment gateway", href: "#gateway" },
          { label: "Payment links", href: "#links" },
          { label: "Buy now, pay later", href: "#bnpl" },
          { label: "Point of sale", href: "#pos" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About us", href: "#about" },
          { label: "Careers", href: "#careers" },
          { label: "News", href: "#news" },
          { label: "Contact us", href: "#contact" },
        ],
      },
      {
        title: "Developers",
        links: [
          { label: "Documentation", href: "#docs" },
          { label: "API reference", href: "#api" },
          { label: "Service status", href: "#status" },
          { label: "Changelog", href: "#changelog" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Help center", href: "#help" },
          { label: "Report fraud", href: "#fraud" },
          { label: "Complaints", href: "#complaints" },
          { label: "Fees", href: "#fees" },
        ],
      },
    ],
    support: {
      phone: "920 012 345",
      hours: "Every day, around the clock",
      whatsapp: { phone: "+966 50 555 0142", message: "Hello, I need help with my account." },
    },
    country: {
      defaultValue: "SA",
      options: [
        { code: "SA", name: "Saudi Arabia" },
        { code: "AE", name: "United Arab Emirates" },
        { code: "KW", name: "Kuwait" },
        { code: "BH", name: "Bahrain" },
        { code: "QA", name: "Qatar" },
        { code: "OM", name: "Oman" },
      ],
    },
    apps: [
      { store: "App Store", href: "#app-store" },
      { store: "Google Play", href: "#google-play" },
    ],
    legal: {
      text: "© 2026 Marsa Payments Company. All rights reserved.",
      crNumber: "1010987654",
      vatNumber: "300098765400003",
      licence: { text: "Licensed by the Saudi Central Bank as a payment company under licence no.", number: "61/202401" },
      links: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
        { label: "Cookies", href: "#cookies" },
      ],
    },
    labels: labelsEn,
  },
  ar: {
    brand: {
      name: "مرسى للمدفوعات",
      description: "حلول دفع وتقسيط للتجّار في المملكة والخليج، بخطوات واضحة ورسوم معلنة.",
    },
    columns: [
      {
        title: "المنتجات",
        links: [
          { label: "بوابة الدفع", href: "#gateway" },
          { label: "روابط الدفع", href: "#links" },
          { label: "اشترِ الآن وادفع لاحقًا", href: "#bnpl" },
          { label: "نقاط البيع", href: "#pos" },
        ],
      },
      {
        title: "الشركة",
        links: [
          { label: "من نحن", href: "#about" },
          { label: "الوظائف", href: "#careers" },
          { label: "الأخبار", href: "#news" },
          { label: "تواصل معنا", href: "#contact" },
        ],
      },
      {
        title: "المطوّرون",
        links: [
          { label: "التوثيق", href: "#docs" },
          { label: "مرجع واجهة البرمجة", href: "#api" },
          { label: "حالة الخدمة", href: "#status" },
          { label: "سجل التحديثات", href: "#changelog" },
        ],
      },
      {
        title: "الدعم",
        links: [
          { label: "مركز المساعدة", href: "#help" },
          { label: "الإبلاغ عن احتيال", href: "#fraud" },
          { label: "الشكاوى", href: "#complaints" },
          { label: "الرسوم", href: "#fees" },
        ],
      },
    ],
    support: {
      phone: "920 012 345",
      hours: "كل يوم، على مدار الساعة",
      whatsapp: { phone: "+966 50 555 0142", message: "السلام عليكم، أحتاج مساعدة بخصوص حسابي." },
    },
    country: {
      defaultValue: "SA",
      options: [
        { code: "SA", name: "السعودية" },
        { code: "AE", name: "الإمارات" },
        { code: "KW", name: "الكويت" },
        { code: "BH", name: "البحرين" },
        { code: "QA", name: "قطر" },
        { code: "OM", name: "عُمان" },
      ],
    },
    apps: [
      { store: "App Store", href: "#app-store" },
      { store: "Google Play", href: "#google-play" },
    ],
    legal: {
      text: "© 2026 شركة مرسى للمدفوعات. جميع الحقوق محفوظة.",
      crNumber: "1010987654",
      vatNumber: "300098765400003",
      licence: { text: "شركة مدفوعات مرخّصة من البنك المركزي السعودي بترخيص رقم", number: "61/202401" },
      links: [
        { label: "الخصوصية", href: "#privacy" },
        { label: "الشروط والأحكام", href: "#terms" },
        { label: "ملفات الارتباط", href: "#cookies" },
      ],
    },
    labels: labelsAr,
  },
}

export { Footer05, labelsEn, labelsAr, demo }
export type { Footer05Props, Footer05Labels, FooterLink }
export default Footer05
