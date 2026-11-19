import * as React from "react"

import { Footer04, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-04"
import { Navbar02, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-02"
import { ProductDetail01, demo as detailDemo } from "@/registry/blocks/product-detail/product-detail-01"
import { ProductGrid03, demo as gridDemo } from "@/registry/blocks/product-grid/product-grid-03"
import { ProductReviews01, demo as reviewsDemo } from "@/registry/blocks/product-reviews/product-reviews-01"
import { StoreTrust01, demo as trustDemo } from "@/registry/blocks/store-trust/store-trust-01"
import { cn } from "@/registry/lib/utils"

type ProductPage01Props = {
  navbar: React.ComponentProps<typeof Navbar02>
  product: React.ComponentProps<typeof ProductDetail01>
  reviews: React.ComponentProps<typeof ProductReviews01>
  related: React.ComponentProps<typeof ProductGrid03>
  trust: React.ComponentProps<typeof StoreTrust01>
  footer: React.ComponentProps<typeof Footer04>
  className?: string
}

// Layout rhythm: store navbar, a split product view, a review list, a product rail, a trust strip, footer.
// The product's rating link points at the reviews section id.
function ProductPage01(props: ProductPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Navbar02 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <ProductDetail01 {...props.product} />
        <ProductReviews01 id="reviews" {...props.reviews} />
        <ProductGrid03 id="related" {...props.related} />
        <StoreTrust01 {...props.trust} />
      </main>
      <Footer04 {...props.footer} />
    </div>
  )
}

const chip = (label: string) => (
  <span className="inline-flex h-8 items-center rounded-md border bg-card px-3 text-sm font-medium text-card-foreground">{label}</span>
)

const payments = ["mada", "Apple Pay", "STC Pay", "Tabby", "Tamara"].map(chip)
const phone = "+966 11 555 0142"
const whatsapp = "+966 50 555 0142"
const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
] as const
// The rail shows other products: not the thobe on this page, and not the headphones.
const related = {
  ar: gridDemo.ar.products.filter((p) => p.id !== "thobe" && p.id !== "phones"),
  en: gridDemo.en.products.filter((p) => p.id !== "thobe" && p.id !== "phones"),
}

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: ProductPage01Props; ar: ProductPage01Props } = {
  ar: {
    navbar: {
      brand: { name: "مجلس", href: "#" },
      links: [
        { label: "الثياب", href: "#thobes", current: true },
        { label: "العود والعطور", href: "#fragrance" },
        { label: "القهوة والضيافة", href: "#hospitality" },
        { label: "العروض", href: "#offers" },
      ],
      cta: { label: "السلة", href: "#cart" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    product: detailDemo.ar,
    reviews: reviewsDemo.ar,
    related: {
      lang: "ar",
      title: "منتجات تكمّل ثوبك",
      description: "عود وعطر وهدايا يختارها عملاؤنا مع الثوب.",
      viewAll: { href: "#all" },
      products: related.ar,
      labels: gridDemo.ar.labels,
    },
    trust: trustDemo.ar,
    footer: {
      brand: { name: "مجلس", description: "ثياب وعود وضيافة من الرياض، نوصلها إلى جميع مناطق المملكة." },
      columns: [
        {
          title: "الشحن والإرجاع",
          links: [
            { label: "سياسة الشحن", href: "#shipping" },
            { label: "سياسة الإرجاع", href: "#returns" },
            { label: "دليل المقاسات", href: "#sizes" },
          ],
        },
        {
          title: "المساعدة",
          links: [
            { label: "الأسئلة الشائعة", href: "#faq" },
            { label: "تتبّع الطلب", href: "#track" },
            { label: "تواصل معنا", href: "#contact" },
          ],
        },
      ],
      contact: { phone, whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن مقاسات الثوب." } },
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
      links: [
        { label: "Thobes", href: "#thobes", current: true },
        { label: "Oud and fragrance", href: "#fragrance" },
        { label: "Coffee and hospitality", href: "#hospitality" },
        { label: "Offers", href: "#offers" },
      ],
      cta: { label: "Cart", href: "#cart" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    product: detailDemo.en,
    reviews: reviewsDemo.en,
    related: {
      lang: "en",
      title: "To go with your thobe",
      description: "Oud, fragrance and gifts our customers pick with a thobe.",
      viewAll: { href: "#all" },
      products: related.en,
      labels: gridDemo.en.labels,
    },
    trust: trustDemo.en,
    footer: {
      brand: { name: "Majlis", description: "Thobes, oud and hospitality from Riyadh, delivered across the Kingdom." },
      columns: [
        {
          title: "Shipping and returns",
          links: [
            { label: "Shipping policy", href: "#shipping" },
            { label: "Return policy", href: "#returns" },
            { label: "Size guide", href: "#sizes" },
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
      ],
      contact: { phone, whatsapp: { phone: whatsapp, message: "Hello, I have a question about thobe sizes." } },
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

export { ProductPage01, demo }
export type { ProductPage01Props }
export default ProductPage01
