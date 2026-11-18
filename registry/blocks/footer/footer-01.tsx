import * as React from "react"
import { CubeIcon, InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react/ssr"
import type { Icon } from "@phosphor-icons/react"

import type { BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Container } from "@/registry/ui/container"

type FooterLink = { label: string; href: string }

type Footer01Labels = { phone: string; email: string; address: string; contact: string; social: string }

type Footer01Props = Omit<BlockBase, "headingLevel"> & {
  brand: { name: string; description?: string; logo?: React.ReactNode }
  columns: { title: string; links: FooterLink[] }[]
  contact?: { phone?: string; email?: string; address?: string }
  social?: { label: string; href: string; icon: Icon }[]
  legal: { text: string; links: FooterLink[] }
  labels?: Partial<Footer01Labels>
}

const labelsEn: Footer01Labels = {
  phone: "Phone",
  email: "Email",
  address: "Address",
  contact: "Contact",
  social: "Social media",
}

const labelsAr: Footer01Labels = {
  phone: "الهاتف",
  email: "البريد الإلكتروني",
  address: "العنوان",
  contact: "تواصل معنا",
  social: "وسائل التواصل الاجتماعي",
}

function Footer01({ brand, columns, contact, social, legal, labels, className }: Footer01Props) {
  const t = { ...labelsEn, ...labels }
  return (
    <footer className={cn("border-t bg-background", className)}>
      <Container className="py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-4">
            <p className="flex items-center gap-2 text-lg font-semibold">
              {brand.logo}
              {brand.name}
            </p>
            {brand.description ? <p className="max-w-sm text-sm text-muted-foreground">{brand.description}</p> : null}
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <p className="mb-3 text-sm font-semibold">{column.title}</p>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="inline-flex min-h-6 items-center hover:text-foreground hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          {contact ? (
            <div className="lg:col-span-2">
              <p className="mb-3 text-sm font-semibold">{t.contact}</p>
              <dl className="flex flex-col gap-3 text-sm text-muted-foreground">
                {contact.phone ? (
                  <div>
                    <dt className="sr-only">{t.phone}</dt>
                    <dd>
                      <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:text-foreground hover:underline">
                        <bdi dir="ltr" className="tabular-nums">
                          {contact.phone}
                        </bdi>
                      </a>
                    </dd>
                  </div>
                ) : null}
                {contact.email ? (
                  <div>
                    <dt className="sr-only">{t.email}</dt>
                    <dd className="break-words">
                      <a href={`mailto:${contact.email}`} className="hover:text-foreground hover:underline">
                        <bdi dir="ltr">{contact.email}</bdi>
                      </a>
                    </dd>
                  </div>
                ) : null}
                {contact.address ? (
                  <div>
                    <dt className="sr-only">{t.address}</dt>
                    <dd dir="auto">{contact.address}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ) : null}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-6">
            <p>{legal.text}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {legal.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-6 items-center hover:text-foreground hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {social ? (
            <ul aria-label={t.social} className="flex gap-1">
              {social.map(({ label, href, icon: SocialIcon }) => (
                <li key={href}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener"
                    className="flex size-10 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <SocialIcon aria-hidden="true" className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </footer>
  )
}

const logo = (
  <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
    <CubeIcon aria-hidden="true" weight="fill" />
  </span>
)

const social = (labels: [string, string, string]) => [
  { label: labels[0], href: "#x", icon: XLogoIcon },
  { label: labels[1], href: "#instagram", icon: InstagramLogoIcon },
  { label: labels[2], href: "#linkedin", icon: LinkedinLogoIcon },
]

const demo: { en: Footer01Props; ar: Footer01Props } = {
  en: {
    brand: {
      name: "Rafid",
      logo,
      description: "Invoices, inventory and customers in one platform built for businesses in Saudi Arabia.",
    },
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Integrations", href: "#integrations" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About us", href: "#about" },
          { label: "Careers", href: "#careers" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "#blog" },
          { label: "Help center", href: "#help" },
          { label: "Service status", href: "#status" },
        ],
      },
    ],
    contact: { phone: "+966 11 555 0142", email: "hello@rafid.example", address: "King Fahd Road, Riyadh" },
    social: social(["X", "Instagram", "LinkedIn"]),
    legal: {
      text: "© 2026 Rafid. All rights reserved.",
      links: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ],
    },
    labels: labelsEn,
  },
  ar: {
    brand: {
      name: "رافد",
      logo,
      description: "الفواتير والمخزون والعملاء في منصة واحدة مصممة للشركات في المملكة العربية السعودية.",
    },
    columns: [
      {
        title: "المنتج",
        links: [
          { label: "المزايا", href: "#features" },
          { label: "الأسعار", href: "#pricing" },
          { label: "التكاملات", href: "#integrations" },
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
        title: "المصادر",
        links: [
          { label: "المدونة", href: "#blog" },
          { label: "مركز المساعدة", href: "#help" },
          { label: "حالة الخدمة", href: "#status" },
        ],
      },
    ],
    contact: { phone: "+966 11 555 0142", email: "hello@rafid.example", address: "طريق الملك فهد، الرياض" },
    social: social(["إكس", "إنستغرام", "لينكدإن"]),
    legal: {
      text: "© 2026 رافد. جميع الحقوق محفوظة.",
      links: [
        { label: "الخصوصية", href: "#privacy" },
        { label: "الشروط والأحكام", href: "#terms" },
      ],
    },
    labels: labelsAr,
  },
}

export { Footer01, labelsEn, labelsAr, demo }
export type { Footer01Props, Footer01Labels, FooterLink }
export default Footer01
