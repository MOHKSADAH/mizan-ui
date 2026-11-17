import * as React from "react"
import {
  CreditCardIcon,
  HandCoinsIcon,
  KeyReturnIcon,
  SealCheckIcon,
  TruckIcon,
} from "@phosphor-icons/react/ssr"
import type { Icon } from "@phosphor-icons/react"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"
import { WhatsAppButton } from "@/registry/ui/whatsapp-button"

type FooterLink = { label: string; href: string }

type Footer04Labels = {
  contact: string
  paymentMethods: string
  crNumber: string
  vatNumber: string
  vatNote: string
  whatsapp: string
  whatsappOpens: string
}

type Footer04Props = Omit<BlockBase, "headingLevel"> & {
  brand: { name: string; description?: string }
  features?: { icon?: Icon; title: string; description: string }[]
  columns: { title: string; links: FooterLink[] }[]
  contact?: { phone?: string; email?: string; whatsapp?: { phone: string; message: string } }
  payments?: React.ReactNode[]
  legal: {
    text: string
    links: FooterLink[]
    crNumber?: string
    vatNumber?: string
    badges?: React.ReactNode[]
  }
  labels?: Partial<Footer04Labels>
}

const labelsEn: Footer04Labels = {
  contact: "Contact us",
  paymentMethods: "Payment methods",
  crNumber: "Commercial registration",
  vatNumber: "VAT number",
  vatNote: "Prices include VAT",
  whatsapp: "Chat on WhatsApp",
  whatsappOpens: "(opens WhatsApp)",
}

const labelsAr: Footer04Labels = {
  contact: "تواصل معنا",
  paymentMethods: "طرق الدفع",
  crNumber: "السجل التجاري",
  vatNumber: "الرقم الضريبي",
  vatNote: "الأسعار شاملة ضريبة القيمة المضافة",
  whatsapp: "تواصل عبر واتساب",
  whatsappOpens: "(يفتح واتساب)",
}

const link = "inline-flex min-h-6 items-center hover:text-foreground hover:underline"

function Footer04({ brand, features, columns, contact, payments, legal, labels, className }: Footer04Props) {
  const t = { ...labelsEn, ...labels }
  return (
    <footer className={cn("border-t bg-background", className)}>
      {features ? (
        <div className="border-b">
          <Container className="py-6">
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {features.map(({ icon: FeatureIcon, title, description }) => (
                <li key={title} className="flex flex-col items-start gap-2 sm:flex-row sm:gap-3">
                  {FeatureIcon ? (
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                      <FeatureIcon aria-hidden="true" className="size-5" />
                    </span>
                  ) : null}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-base font-semibold">{title}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      ) : null}
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col items-start gap-4 sm:col-span-2">
            <p className="text-lg font-semibold">{brand.name}</p>
            {brand.description ? <p className="max-w-sm text-sm text-muted-foreground">{brand.description}</p> : null}
            {contact ? (
              <div className="flex flex-col items-start gap-3 text-sm">
                <p className="font-semibold">{t.contact}</p>
                {contact.phone ? (
                  <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={link}>
                    <bdi dir="ltr" className="tabular-nums">
                      {contact.phone}
                    </bdi>
                  </a>
                ) : null}
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className={link}>
                    <bdi dir="ltr">{contact.email}</bdi>
                  </a>
                ) : null}
                {contact.whatsapp ? (
                  <WhatsAppButton
                    phone={contact.whatsapp.phone}
                    message={contact.whatsapp.message}
                    variant="outline"
                    className="h-10 px-4"
                    labels={{ label: t.whatsapp, opens: t.whatsappOpens }}
                  />
                ) : null}
              </div>
            ) : null}
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
        {payments?.length ? (
          <div className="mt-10 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-center md:gap-6">
            <p className="text-sm font-semibold">{t.paymentMethods}</p>
            <ul className="flex flex-wrap gap-2">
              {payments.map((payment, i) => (
                <li key={i}>{payment}</li>
              ))}
            </ul>
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
            <p>{t.vatNote}</p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            {legal.badges?.length ? (
              <ul className="flex flex-wrap gap-2">
                {legal.badges.map((badge, i) => (
                  <li key={i}>{badge}</li>
                ))}
              </ul>
            ) : null}
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

const chip = (label: string) => (
  <span className="inline-flex h-8 items-center rounded-md border bg-card px-3 text-sm font-medium text-card-foreground">
    {label}
  </span>
)

const payments = ["mada", "Apple Pay", "STC Pay", "Tabby", "Tamara"].map(chip)

const badge = (label: string) => (
  <span className="inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-3 text-sm font-medium text-card-foreground">
    <SealCheckIcon aria-hidden="true" weight="fill" className="size-4" />
    {label}
  </span>
)

const icons = [TruckIcon, KeyReturnIcon, HandCoinsIcon, CreditCardIcon]

const demo: { en: Footer04Props; ar: Footer04Props } = {
  en: {
    brand: { name: "Rafid Store", description: "Quality home and office essentials, delivered across the Kingdom." },
    features: [
      { title: "Fast shipping", description: "Your order arrives in a few days" },
      { title: "Easy returns", description: "Exchange or return with no hassle" },
      { title: "Cash on delivery", description: "Pay in cash when your order arrives" },
      { title: "Secure payment", description: "mada, Apple Pay and credit cards" },
    ].map((item, i) => ({ ...item, icon: icons[i] })),
    columns: [
      {
        title: "About the store",
        links: [
          { label: "About us", href: "#about" },
          { label: "Our branches", href: "#branches" },
          { label: "Careers", href: "#careers" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "FAQ", href: "#faq" },
          { label: "Track your order", href: "#track" },
          { label: "Contact us", href: "#contact" },
        ],
      },
      {
        title: "Shipping and returns",
        links: [
          { label: "Shipping policy", href: "#shipping" },
          { label: "Return policy", href: "#returns" },
          { label: "Exchanges", href: "#exchanges" },
        ],
      },
      {
        title: "My account",
        links: [
          { label: "Sign in", href: "#signin" },
          { label: "My orders", href: "#orders" },
          { label: "Wishlist", href: "#wishlist" },
        ],
      },
    ],
    contact: {
      phone: "+966 11 555 0142",
      email: "care@rafid.example",
      whatsapp: { phone: "+966 50 555 0142", message: "Hello, I need help with my order." },
    },
    payments,
    legal: {
      text: "© 2026 Rafid Store. All rights reserved.",
      crNumber: "1010123456",
      vatNumber: "300012345600003",
      badges: [badge("Verified store")],
      links: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ],
    },
    labels: labelsEn,
  },
  ar: {
    brand: { name: "متجر رافد", description: "مستلزمات منزلية ومكتبية بجودة عالية، نوصلها إلى جميع مناطق المملكة." },
    features: [
      { title: "شحن سريع", description: "يصلك طلبك خلال أيام قليلة" },
      { title: "إرجاع سهل", description: "استبدل أو أرجع منتجك بكل سهولة" },
      { title: "الدفع عند الاستلام", description: "ادفع نقدًا عند وصول طلبك" },
      { title: "دفع آمن", description: "مدى وأبل باي وبطاقات الائتمان" },
    ].map((item, i) => ({ ...item, icon: icons[i] })),
    columns: [
      {
        title: "عن المتجر",
        links: [
          { label: "من نحن", href: "#about" },
          { label: "فروعنا", href: "#branches" },
          { label: "الوظائف", href: "#careers" },
        ],
      },
      {
        title: "المساعدة",
        links: [
          { label: "الأسئلة الشائعة", href: "#faq" },
          { label: "تتبع الطلب", href: "#track" },
          { label: "تواصل معنا", href: "#contact" },
        ],
      },
      {
        title: "الشحن والإرجاع",
        links: [
          { label: "سياسة الشحن", href: "#shipping" },
          { label: "سياسة الاسترجاع", href: "#returns" },
          { label: "الاستبدال", href: "#exchanges" },
        ],
      },
      {
        title: "حسابي",
        links: [
          { label: "تسجيل الدخول", href: "#signin" },
          { label: "طلباتي", href: "#orders" },
          { label: "المفضلة", href: "#wishlist" },
        ],
      },
    ],
    contact: {
      phone: "+966 11 555 0142",
      email: "care@rafid.example",
      whatsapp: { phone: "+966 50 555 0142", message: "السلام عليكم، أحتاج مساعدة بخصوص طلبي." },
    },
    payments,
    legal: {
      text: "© 2026 متجر رافد. جميع الحقوق محفوظة.",
      crNumber: "1010123456",
      vatNumber: "300012345600003",
      badges: [badge("متجر موثّق")],
      links: [
        { label: "الخصوصية", href: "#privacy" },
        { label: "الشروط والأحكام", href: "#terms" },
      ],
    },
    labels: labelsAr,
  },
}

export { Footer04, labelsEn, labelsAr, demo }
export type { Footer04Props, Footer04Labels, FooterLink }
export default Footer04
