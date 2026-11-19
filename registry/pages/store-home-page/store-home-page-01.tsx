import * as React from "react"
import { CreditCardIcon, HandCoinsIcon, ImageIcon, KeyReturnIcon, TruckIcon } from "@phosphor-icons/react/ssr"

import { Banner01, labelsAr as bannerAr, labelsEn as bannerEn } from "@/registry/blocks/banner/banner-01"
import { CategoryGrid01, demo as tilesDemo } from "@/registry/blocks/category-grid/category-grid-01"
import { CategoryGrid02, demo as pillsDemo } from "@/registry/blocks/category-grid/category-grid-02"
import { Footer04, labelsAr as footerAr, labelsEn as footerEn } from "@/registry/blocks/footer/footer-04"
import { Hero02 } from "@/registry/blocks/hero/hero-02"
import { Navbar02, labelsAr as navbarAr, labelsEn as navbarEn } from "@/registry/blocks/navbar/navbar-02"
import { ProductGrid03, demo as gridDemo } from "@/registry/blocks/product-grid/product-grid-03"
import { ProductReviews02, labelsAr as reviewsAr, labelsEn as reviewsEn } from "@/registry/blocks/product-reviews/product-reviews-02"
import { StoreTrust01, demo as trustDemo } from "@/registry/blocks/store-trust/store-trust-01"
import { cn } from "@/registry/lib/utils"
import { ProductCard, ProductCardBody, ProductCardMedia, ProductCardPrice, ProductCardTitle, ProductCardVendor } from "@/registry/ui/product-card"
import { Rating, ratingLabelsAr } from "@/registry/ui/rating"

type StoreHomePage01Props = {
  banner: React.ComponentProps<typeof Banner01>
  navbar: React.ComponentProps<typeof Navbar02>
  hero: React.ComponentProps<typeof Hero02>
  categories: React.ComponentProps<typeof CategoryGrid02>
  bestSellers: React.ComponentProps<typeof ProductGrid03>
  tiles: React.ComponentProps<typeof CategoryGrid01>
  trust: React.ComponentProps<typeof StoreTrust01>
  reviews: React.ComponentProps<typeof ProductReviews02>
  footer: React.ComponentProps<typeof Footer04>
  className?: string
}

// Layout rhythm: announcement strip, store navbar, split hero with a live product panel, a pill strip, a product rail,
// a bento of category tiles, a trust strip, one lead review with two smaller, footer. Section ids match the navbar links.
function StoreHomePage01(props: StoreHomePage01Props) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background text-foreground", props.className)}>
      <Banner01 {...props.banner} />
      <Navbar02 {...props.navbar} />
      <main id="main-content" className="flex-1">
        <Hero02 {...props.hero} />
        <CategoryGrid02 id="categories" {...props.categories} />
        <ProductGrid03 id="best" {...props.bestSellers} />
        <CategoryGrid01 id="shop" {...props.tiles} />
        <StoreTrust01 {...props.trust} />
        <ProductReviews02 id="reviews" {...props.reviews} />
      </main>
      <Footer04 {...props.footer} />
    </div>
  )
}

type Lang = "en" | "ar"

// The hero shows the store itself: this week's three best sellers with their real price and rating.
function BestSellersPanel({ lang }: { lang: Lang }) {
  const ar = lang === "ar"
  const products = gridDemo[lang].products.slice(0, 3)
  return (
    <div className="flex size-full flex-col justify-center gap-3 bg-muted p-3 sm:gap-4 sm:p-6">
      <p className="text-sm font-medium">{ar ? "الأكثر طلبًا هذا الأسبوع" : "Most ordered this week"}</p>
      <ul className="flex flex-col gap-2 sm:gap-3">
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard orientation="horizontal" className="items-center gap-3 rounded-lg border bg-card p-2">
              <ProductCardMedia className="w-14 group-data-[orientation=horizontal]/product-card:w-14 sm:group-data-[orientation=horizontal]/product-card:w-20">
                <span aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
                  <ImageIcon weight="duotone" className="size-6" />
                </span>
              </ProductCardMedia>
              <ProductCardBody className="gap-1">
                {p.vendor ? <ProductCardVendor>{p.vendor}</ProductCardVendor> : null}
                <ProductCardTitle as="h3" href={p.href}>
                  {p.name}
                </ProductCardTitle>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <ProductCardPrice amount={p.price} lang={lang} />
                  {p.rating !== undefined ? (
                    <Rating value={p.rating} count={p.reviews} lang={lang} labels={ar ? ratingLabelsAr : undefined} className="text-xs" />
                  ) : null}
                </div>
              </ProductCardBody>
            </ProductCard>
          </li>
        ))}
      </ul>
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
const featureIcons = [TruckIcon, KeyReturnIcon, HandCoinsIcon, CreditCardIcon]

// Arabic is written first. The English is a natural translation, not a word-for-word one.
const demo: { en: StoreHomePage01Props; ar: StoreHomePage01Props } = {
  ar: {
    banner: {
      message: "شحن مجاني على الطلبات فوق 200 ر.س، والدفع عند الاستلام متاح",
      action: { label: "تسوّق الآن", href: "#shop" },
      dismissible: true,
      labels: bannerAr,
    },
    navbar: {
      brand: { name: "مجلس", href: "#" },
      links: [
        { label: "الأقسام", href: "#categories" },
        { label: "الأكثر طلبًا", href: "#best" },
        { label: "تسوّق بالقسم", href: "#shop" },
        { label: "آراء العملاء", href: "#reviews" },
      ],
      cta: { label: "السلة", href: "#cart" },
      languages: [...languages],
      language: "ar",
      sticky: false,
      labels: navbarAr,
    },
    hero: {
      eyebrow: "تشكيلة الشتاء وصلت",
      title: "ثياب وعود ودلال قهوة، من الرياض إلى باب بيتك",
      description: "أكثر من 500 منتج من علامات سعودية. يصلك طلبك خلال 2 إلى 4 أيام عمل، وتدفع بمدى أو أبل باي أو تقسّطها مع تمارا.",
      primaryCta: { label: "تسوّق الآن", href: "#shop" },
      secondaryCta: { label: "الأكثر طلبًا", href: "#best" },
      media: <BestSellersPanel lang="ar" />,
    },
    categories: { ...pillsDemo.ar, title: "تسوّق حسب القسم" },
    bestSellers: {
      ...gridDemo.ar,
      eyebrow: "هذا الأسبوع",
      title: "الأكثر طلبًا من عملائنا",
      description: "من دهن العود إلى الثياب والفناجين، ما طلبه العملاء في الرياض وجدة والدمام.",
    },
    tiles: tilesDemo.ar,
    trust: trustDemo.ar,
    reviews: {
      lang: "ar",
      average: 4.8,
      count: 1240,
      allReviewsHref: "#all-reviews",
      reviews: [
        {
          id: "r1",
          author: "فهد الدوسري",
          city: "الدمام",
          rating: 5,
          title: "وصلتني الأثواب قبل العيد بيومين",
          body: "طلبت ثلاثة أثواب لي ولإخواني. المقاس مضبوط والقماش خفيف، والتغليف مرتب. والمنتج مطابق للصور تمامًا.",
          verified: true,
        },
        {
          id: "r2",
          author: "نورة الشمري",
          city: "حائل",
          rating: 5,
          title: "عود أصلي",
          body: "رائحته تثبت من الصباح إلى المساء، ووصل خلال يومين.",
          verified: true,
        },
        {
          id: "r3",
          author: "عبدالله القحطاني",
          city: "أبها",
          rating: 4,
          title: "الدلّة تستاهل سعرها",
          body: "نحاس ثقيل وتشطيب نظيف. الفناجين أصغر مما توقعت، لكن الجودة ممتازة.",
          verified: true,
        },
      ],
      labels: reviewsAr,
    },
    footer: {
      brand: { name: "مجلس", description: "ثياب وعود وضيافة من الرياض، نوصلها إلى جميع مناطق المملكة." },
      features: [
        { title: "شحن لكل مناطق المملكة", description: "يصلك طلبك خلال 2 إلى 4 أيام عمل" },
        { title: "إرجاع خلال 14 يومًا", description: "للمنتجات غير المستخدمة في عبوتها" },
        { title: "الدفع عند الاستلام", description: "ادفع للمندوب نقدًا أو بالبطاقة" },
        { title: "دفع آمن", description: "مدى وأبل باي وتابي وتمارا" },
      ].map((item, i) => ({ ...item, icon: featureIcons[i] })),
      columns: [
        {
          title: "عن مجلس",
          links: [
            { label: "من نحن", href: "#about" },
            { label: "معرض العليا", href: "#showroom" },
            { label: "الوظائف", href: "#careers" },
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
        {
          title: "الشحن والإرجاع",
          links: [
            { label: "سياسة الشحن", href: "#shipping" },
            { label: "سياسة الإرجاع", href: "#returns" },
            { label: "دليل المقاسات", href: "#sizes" },
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
      contact: { phone, email: "care@majlis.example", whatsapp: { phone: whatsapp, message: "السلام عليكم، عندي سؤال عن منتجات مجلس." } },
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
      message: "Free shipping on orders over SAR 200, and cash on delivery is available",
      action: { label: "Shop now", href: "#shop" },
      dismissible: true,
      labels: bannerEn,
    },
    navbar: {
      brand: { name: "Majlis", href: "#" },
      links: [
        { label: "Categories", href: "#categories" },
        { label: "Best sellers", href: "#best" },
        { label: "Shop by category", href: "#shop" },
        { label: "Reviews", href: "#reviews" },
      ],
      cta: { label: "Cart", href: "#cart" },
      languages: [...languages],
      language: "en",
      sticky: false,
      labels: navbarEn,
    },
    hero: {
      eyebrow: "The winter collection is in",
      title: "Thobes, oud and coffee dallahs, from Riyadh to your door",
      description:
        "Over 500 products from Saudi brands. Your order arrives in 2 to 4 working days, and you pay with mada or Apple Pay, or split it with Tamara.",
      primaryCta: { label: "Shop now", href: "#shop" },
      secondaryCta: { label: "Best sellers", href: "#best" },
      media: <BestSellersPanel lang="en" />,
    },
    categories: { ...pillsDemo.en, title: "Shop by category" },
    bestSellers: {
      ...gridDemo.en,
      eyebrow: "This week",
      title: "What our customers order most",
      description: "From oud oil to thobes and coffee cups, what customers in Riyadh, Jeddah and Dammam ordered.",
    },
    tiles: tilesDemo.en,
    trust: trustDemo.en,
    reviews: {
      lang: "en",
      average: 4.8,
      count: 1240,
      allReviewsHref: "#all-reviews",
      reviews: [
        {
          id: "r1",
          author: "Fahad Al-Dosari",
          city: "Dammam",
          rating: 5,
          title: "The thobes arrived two days before Eid",
          body: "I ordered three thobes for me and my brothers. The sizes are right, the fabric is light and the packing is neat. The products match the photos exactly.",
          verified: true,
        },
        {
          id: "r2",
          author: "Noura Al-Shammari",
          city: "Hail",
          rating: 5,
          title: "Real oud",
          body: "The scent lasts from morning to evening, and it arrived in two days.",
          verified: true,
        },
        {
          id: "r3",
          author: "Abdullah Al-Qahtani",
          city: "Abha",
          rating: 4,
          title: "The dallah is worth the price",
          body: "Heavy brass and a clean finish. The cups are smaller than I expected, but the quality is excellent.",
          verified: true,
        },
      ],
      labels: reviewsEn,
    },
    footer: {
      brand: { name: "Majlis", description: "Thobes, oud and hospitality from Riyadh, delivered across the Kingdom." },
      features: [
        { title: "Shipping to every region", description: "Your order arrives in 2 to 4 working days" },
        { title: "Return within 14 days", description: "For unused items in their packaging" },
        { title: "Cash on delivery", description: "Pay the courier in cash or by card" },
        { title: "Secure payment", description: "mada, Apple Pay, Tabby and Tamara" },
      ].map((item, i) => ({ ...item, icon: featureIcons[i] })),
      columns: [
        {
          title: "About Majlis",
          links: [
            { label: "About us", href: "#about" },
            { label: "Olaya showroom", href: "#showroom" },
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
            { label: "Size guide", href: "#sizes" },
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
      contact: { phone, email: "care@majlis.example", whatsapp: { phone: whatsapp, message: "Hello, I have a question about Majlis products." } },
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

export { StoreHomePage01, demo }
export type { StoreHomePage01Props }
export default StoreHomePage01
