import * as React from "react"

import { Checkout01, demo as checkoutDemo } from "@/registry/blocks/checkout/checkout-01"
import { Footer04, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-04"
import { Navbar05, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-05"
import { OrderSummary01, demo as summaryDemo } from "@/registry/blocks/order-summary/order-summary-01"
import { cn } from "@/registry/lib/utils"

type CheckoutPage01Props = {
  navbar: React.ComponentProps<typeof Navbar05>
  checkout: React.ComponentProps<typeof Checkout01>
  summary: React.ComponentProps<typeof OrderSummary01>
  footer: React.ComponentProps<typeof Footer04>
  className?: string
}

// One page checkout. Below lg the order summary sits first, collapsed behind its total. From lg it is a second column that stays in view.
function CheckoutPage01(props: CheckoutPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar05 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[minmax(0,1fr)_28rem]">
          <div className="lg:col-start-2 lg:row-start-1 lg:self-start lg:sticky lg:top-6">
            <OrderSummary01 {...props.summary} />
          </div>
          <div className="lg:col-start-1 lg:row-start-1">
            <Checkout01 {...props.checkout} />
          </div>
        </div>
      </main>
      <Footer04 {...props.footer} />
    </div>
  )
}

const chip = (label: string) => (
  <span className="inline-flex h-8 items-center rounded-md border bg-card px-3 text-sm font-medium text-card-foreground">{label}</span>
)

const payments = ["mada", "Apple Pay", "STC Pay", "Tabby", "Tamara"].map(chip)
const whatsapp = "966505550142"

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: CheckoutPage01Props; ar: CheckoutPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "مجلس", href: "#" },
      cta: { label: "العودة إلى السلة", href: "#cart" },
      whatsapp: { phone: whatsapp, message: "السلام عليكم، أحتاج مساعدة في إتمام طلبي." },
      sticky: false,
      labels: navbarAr,
    },
    checkout: checkoutDemo.ar,
    summary: summaryDemo.ar,
    footer: {
      brand: { name: "مجلس", description: "ثياب وعود وضيافة من الرياض، نوصلها إلى جميع مناطق المملكة." },
      columns: [
        {
          title: "المساعدة",
          links: [
            { label: "سياسة الشحن", href: "#shipping" },
            { label: "سياسة الإرجاع", href: "#returns" },
            { label: "تواصل معنا", href: "#contact" },
          ],
        },
      ],
      payments,
      legal: {
        text: "© 2026 مؤسسة مجلس للتجارة. جميع الحقوق محفوظة.",
        crNumber: "1010987654",
        vatNumber: "300098765400003",
        links: [
          { label: "الخصوصية", href: "#privacy" },
          { label: "الشروط والأحكام", href: "#terms" },
        ],
      },
      labels: footerAr,
    },
  },
  en: {
    navbar: {
      brand: { name: "Majlis", href: "#" },
      cta: { label: "Back to cart", href: "#cart" },
      whatsapp: { phone: whatsapp, message: "Hello, I need help to complete my order." },
      sticky: false,
      labels: navbarEn,
    },
    checkout: checkoutDemo.en,
    summary: summaryDemo.en,
    footer: {
      brand: { name: "Majlis", description: "Thobes, oud and hospitality from Riyadh, delivered across the Kingdom." },
      columns: [
        {
          title: "Help",
          links: [
            { label: "Shipping policy", href: "#shipping" },
            { label: "Return policy", href: "#returns" },
            { label: "Contact us", href: "#contact" },
          ],
        },
      ],
      payments,
      legal: {
        text: "© 2026 Majlis Trading Est. All rights reserved.",
        crNumber: "1010987654",
        vatNumber: "300098765400003",
        links: [
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
        ],
      },
      labels: footerEn,
    },
  },
}

export { CheckoutPage01, demo }
export type { CheckoutPage01Props }
export default CheckoutPage01
