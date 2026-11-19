import * as React from "react"

import { Banner01, labelsAr as bannerAr, labelsEn as bannerEn } from "@/registry/blocks/banner/banner-01"
import { Footer04, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-04"
import { Navbar02, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-02"
import { OrderSummary03, demo as receiptDemo } from "@/registry/blocks/order-summary/order-summary-03"
import { OrderTracking01, labelsAr as trackingAr, labelsEn as trackingEn } from "@/registry/blocks/order-tracking/order-tracking-01"
import { ProductGrid03, demo as gridDemo } from "@/registry/blocks/product-grid/product-grid-03"
import { cn } from "@/registry/lib/utils"

type OrderConfirmationPage01Props = {
  banner: React.ComponentProps<typeof Banner01>
  navbar: React.ComponentProps<typeof Navbar02>
  receipt: React.ComponentProps<typeof OrderSummary03>
  tracking: React.ComponentProps<typeof OrderTracking01>
  more: React.ComponentProps<typeof ProductGrid03>
  footer: React.ComponentProps<typeof Footer04>
  className?: string
}

// Layout rhythm: account strip, store navbar, a narrow receipt, a two column tracking panel, a product rail, footer.
// The tracking section id matches the receipt's "Track order" link.
function OrderConfirmationPage01(props: OrderConfirmationPage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Banner01 {...props.banner} />
      <Navbar02 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <OrderSummary03 {...props.receipt} />
        <OrderTracking01 id="track" {...props.tracking} />
        <ProductGrid03 id="more" {...props.more} />
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
// The rail leaves out the headphones: the store sells thobes, oud and hospitality.
const alsoLike = { ar: gridDemo.ar.products.filter((p) => p.id !== "phones"), en: gridDemo.en.products.filter((p) => p.id !== "phones") }

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: OrderConfirmationPage01Props; ar: OrderConfirmationPage01Props } = {
  ar: {
    banner: {
      message: "أنشئ حسابًا برقم جوالك لحفظ بياناتك وتتبّع طلباتك",
      action: { label: "أنشئ حسابًا", href: "#account" },
      dismissible: true,
      labels: bannerAr,
    },
    navbar: {
      brand: { name: "مجلس", href: "#" },
      links: [
        { label: "الثياب", href: "#thobes" },
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
    receipt: receiptDemo.ar,
    tracking: {
      lang: "ar",
      labels: trackingAr,
      order: { number: "360251", status: "paid" },
      steps: [
        { id: "confirmed", title: "تم استلام طلبك", description: "تم الدفع، وطلبك مؤكد.", date: "2026-11-19T10:42:00+03:00", state: "done" },
        { id: "preparing", title: "جارٍ تجهيز الطلب", description: "نجهّز منتجاتك في مستودع الرياض.", date: "2026-11-19T11:05:00+03:00", state: "current" },
        { id: "courier", title: "تسليمه لشركة الشحن", state: "upcoming" },
        { id: "out", title: "مع المندوب", state: "upcoming" },
        { id: "delivered", title: "تم التسليم", state: "upcoming" },
      ],
      estimate: { date: "2026-11-24", city: "الرياض، حي الياسمين" },
      helpHref: "#help",
    },
    more: {
      lang: "ar",
      title: "قد يعجبك أيضًا",
      description: "منتجات اختارها عملاؤنا مع طلبهم، وتصل معه في الشحنة نفسها.",
      viewAll: { href: "#all" },
      products: alsoLike.ar,
      labels: gridDemo.ar.labels,
    },
    footer: {
      brand: { name: "مجلس", description: "ثياب وعود وضيافة من الرياض، نوصلها إلى جميع مناطق المملكة." },
      columns: [
        {
          title: "المساعدة",
          links: [
            { label: "تتبّع الطلب", href: "#track" },
            { label: "سياسة الإرجاع", href: "#returns" },
            { label: "تواصل معنا", href: "#contact" },
          ],
        },
        {
          title: "حسابي",
          links: [
            { label: "طلباتي", href: "#orders" },
            { label: "المفضلة", href: "#wishlist" },
          ],
        },
      ],
      contact: { phone, whatsapp: { phone: whatsapp, message: "السلام عليكم، أحتاج مساعدة بخصوص طلبي 360251." } },
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
    banner: {
      message: "Create an account with your mobile number to save your details and track your orders",
      action: { label: "Create an account", href: "#account" },
      dismissible: true,
      labels: bannerEn,
    },
    navbar: {
      brand: { name: "Majlis", href: "#" },
      links: [
        { label: "Thobes", href: "#thobes" },
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
    receipt: receiptDemo.en,
    tracking: {
      lang: "en",
      labels: trackingEn,
      order: { number: "360251", status: "paid" },
      steps: [
        { id: "confirmed", title: "Order received", description: "Payment is done and your order is confirmed.", date: "2026-11-19T10:42:00+03:00", state: "done" },
        { id: "preparing", title: "Packing your order", description: "We are packing your items at the Riyadh warehouse.", date: "2026-11-19T11:05:00+03:00", state: "current" },
        { id: "courier", title: "Handed to the courier", state: "upcoming" },
        { id: "out", title: "Out for delivery", state: "upcoming" },
        { id: "delivered", title: "Delivered", state: "upcoming" },
      ],
      estimate: { date: "2026-11-24", city: "Riyadh, Al Yasmin district" },
      helpHref: "#help",
    },
    more: {
      lang: "en",
      title: "You may also like",
      description: "Items other customers added to their order. They ship in the same parcel.",
      viewAll: { href: "#all" },
      products: alsoLike.en,
      labels: gridDemo.en.labels,
    },
    footer: {
      brand: { name: "Majlis", description: "Thobes, oud and hospitality from Riyadh, delivered across the Kingdom." },
      columns: [
        {
          title: "Help",
          links: [
            { label: "Track your order", href: "#track" },
            { label: "Return policy", href: "#returns" },
            { label: "Contact us", href: "#contact" },
          ],
        },
        {
          title: "My account",
          links: [
            { label: "My orders", href: "#orders" },
            { label: "Wishlist", href: "#wishlist" },
          ],
        },
      ],
      contact: { phone, whatsapp: { phone: whatsapp, message: "Hello, I need help with my order 360251." } },
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

export { OrderConfirmationPage01, demo }
export type { OrderConfirmationPage01Props }
export default OrderConfirmationPage01
