import * as React from "react"
import { ImageIcon, StorefrontIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import {
  ProductCard,
  ProductCardBody,
  ProductCardFooter,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardTitle,
} from "@/registry/ui/product-card"
import { Progress } from "@/registry/ui/progress"
import { Section } from "@/registry/ui/section"
import { StatCard, statCardLabelsAr } from "@/registry/ui/stat-card"
import { StatusBadge, statusBadgeLabelsAr, type OrderStatus } from "@/registry/ui/status-badge"

type Order = { id: string; customer: string; amount: number; status: OrderStatus; when: string }
// Without an image the product shows the placeholder.
type Product = { name: string; price: number; compareAt?: number; image?: string }

type Hero09Labels = {
  preview: string
  sales: string
  orders: string
  goal: string
  recent: string
  trustedBy: string
  buy: string
  originalPrice: string
}

type Hero09Props = Omit<BlockBase, "headingLevel"> & {
  headingLevel?: 1 | 2 | 3
  lang?: Lang
  eyebrow?: React.ReactNode
  title: string
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  brands?: string[]
  dashboard: {
    title: string
    sales: { amount: number; delta: number; spark?: number[] }
    orders: { value: number; delta: number }
    goal: { current: number; target: number }
    recent: Order[]
  }
  store: { name: string; products: Product[] }
  labels?: Partial<Hero09Labels>
}

const labelsEn: Hero09Labels = {
  preview: "Preview of the Rafid dashboard and a store",
  sales: "Sales",
  orders: "Orders",
  goal: "Monthly goal",
  recent: "Recent orders",
  trustedBy: "Trusted by stores such as",
  buy: "Buy now",
  originalPrice: "Original price:",
}

const labelsAr: Hero09Labels = {
  preview: "معاينة للوحة تحكم رافد ومتجر",
  sales: "المبيعات",
  orders: "الطلبات",
  goal: "هدف الشهر",
  recent: "آخر الطلبات",
  trustedBy: "يثق بنا تجّار مثل",
  buy: "اشترِ الآن",
  originalPrice: "السعر قبل الخصم:",
}

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})
const cta = "h-12 w-full px-6 text-base sm:w-auto"

function Hero09({
  lang = "en",
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  brands,
  dashboard,
  store,
  labels,
  headingLevel = 1,
  id,
  className,
}: Hero09Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const Heading = `h${headingLevel}` as const
  const goal = dashboard.goal.current / dashboard.goal.target
  const ar = lang === "ar"
  return (
    <Section id={sid} spacing="hero" className={className}>
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
          <Heading id={`${sid}-heading`} className="text-4xl font-semibold text-balance md:text-5xl lg:text-6xl">
            {title}
          </Heading>
          {description ? <p className="max-w-xl text-lg text-muted-foreground md:text-xl">{description}</p> : null}
          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
            <a href={primaryCta.href} {...external(primaryCta)} className={cn(buttonVariants(), cta)}>
              {primaryCta.label}
            </a>
            {secondaryCta ? (
              <a
                href={secondaryCta.href}
                {...external(secondaryCta)}
                className={cn(buttonVariants({ variant: "outline" }), cta)}
              >
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
          {brands?.length ? (
            <div className="flex flex-col gap-3 pt-4">
              <p className="text-sm text-muted-foreground">{t.trustedBy}</p>
              <ul className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <li key={brand} className="rounded-full border px-4 py-1.5 text-sm text-muted-foreground">
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <Card role="img" aria-label={t.preview} className="min-w-0 gap-6 border p-4 md:p-6">
          <p className="text-sm font-medium">{dashboard.title}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard
              label={t.sales}
              value={<Price amount={dashboard.sales.amount} lang={lang} />}
              delta={dashboard.sales.delta}
              spark={dashboard.sales.spark}
              lang={lang}
              labels={ar ? statCardLabelsAr : undefined}
            />
            <StatCard
              label={t.orders}
              value={dashboard.orders.value}
              delta={dashboard.orders.delta}
              lang={lang}
              labels={ar ? statCardLabelsAr : undefined}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium">{t.goal}</span>
              <span className="tabular-nums">{formatPercent(goal, { lang }, { max: 0 })}</span>
            </div>
            <Progress value={Math.round(goal * 100)} aria-label={t.goal} />
            <p className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <Price amount={dashboard.goal.current} lang={lang} />
              <Price amount={dashboard.goal.target} lang={lang} />
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">{t.recent}</p>
            <ul className="flex flex-col divide-y">
              {dashboard.recent.map((order) => (
                <li key={order.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-sm font-medium">{order.customer}</span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <bdi dir="ltr">{`#${order.id}`}</bdi>
                      <bdi>{order.when}</bdi>
                    </span>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Price amount={order.amount} lang={lang} className="text-sm font-semibold" />
                    <StatusBadge status={order.status} labels={ar ? statusBadgeLabelsAr : undefined} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm font-medium">
              <StorefrontIcon aria-hidden="true" weight="bold" className="size-4" />
              {store.name}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {store.products.map((product) => (
                <ProductCard key={product.name}>
                  <ProductCardMedia className="aspect-4/3">
                    {product.image ? (
                      <ProductCardImage src={product.image} alt="" />
                    ) : (
                      <div aria-hidden="true" className="flex size-full items-center justify-center text-muted-foreground">
                        <ImageIcon aria-hidden="true" weight="duotone" className="size-10" />
                      </div>
                    )}
                  </ProductCardMedia>
                  <ProductCardBody>
                    <ProductCardTitle as="h4">{product.name}</ProductCardTitle>
                    <ProductCardPrice
                      amount={product.price}
                      compareAt={product.compareAt}
                      compareAtLabel={t.originalPrice}
                      lang={lang}
                    />
                    <ProductCardFooter className="pt-1">
                      <span className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}>{t.buy}</span>
                    </ProductCardFooter>
                  </ProductCardBody>
                </ProductCard>
              ))}
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  )
}

const demo: { en: Hero09Props; ar: Hero09Props } = {
  en: {
    lang: "en",
    eyebrow: (
      <>
        <bdi>+12,000</bdi> stores selling on Rafid across the Kingdom
      </>
    ),
    title: "Your online store, ready to sell in one day",
    description:
      "Build your store, connect payments and shipping, and follow orders and stock from one dashboard in Arabic and English.",
    primaryCta: { label: "Create your free store", href: "#start" },
    secondaryCta: { label: "Watch a demo", href: "#demo" },
    brands: ["Al Dar Perfumes", "Jabal Coffee", "Bayti Sweets", "Naseej Home"],
    dashboard: {
      title: "November sales summary",
      sales: { amount: 248339, delta: 12.4, spark: [12, 18, 15, 24, 22, 31, 29, 38] },
      orders: { value: 692, delta: 6.8 },
      goal: { current: 248339, target: 300000 },
      recent: [
        { id: "360243", customer: "Abdullah Al-Harbi", amount: 1240, status: "pending", when: "23 minutes ago" },
        { id: "360242", customer: "Noura Al-Qahtani", amount: 385, status: "shipped", when: "1 hour ago" },
        { id: "360241", customer: "Sara Al-Otaibi", amount: 2150, status: "delivered", when: "2 hours ago" },
      ],
    },
    store: {
      name: "Al Dar Perfumes",
      products: [
        { name: "Oud Wood Perfume 50 ml", price: 249, compareAt: 329 },
        { name: "Bakhoor Burner Set", price: 89 },
      ],
    },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: (
      <>
        <bdi>+12,000</bdi> متجر يبيع على رافد في أنحاء المملكة
      </>
    ),
    title: "متجرك الإلكتروني جاهز للبيع في يوم واحد",
    description: "أنشئ متجرك، واربط الدفع والشحن، وتابع طلباتك ومخزونك من لوحة واحدة تعمل بالعربية والإنجليزية.",
    primaryCta: { label: "أنشئ متجرك مجانًا", href: "#start" },
    secondaryCta: { label: "شاهد عرضًا تجريبيًا", href: "#demo" },
    brands: ["عطور الدار", "قهوة الجبل", "حلويات بيتي", "نسيج للمفروشات"],
    dashboard: {
      title: "ملخص مبيعات نوفمبر",
      sales: { amount: 248339, delta: 12.4, spark: [12, 18, 15, 24, 22, 31, 29, 38] },
      orders: { value: 692, delta: 6.8 },
      goal: { current: 248339, target: 300000 },
      recent: [
        { id: "360243", customer: "عبدالله الحربي", amount: 1240, status: "pending", when: "منذ 23 دقيقة" },
        { id: "360242", customer: "نورة القحطاني", amount: 385, status: "shipped", when: "منذ ساعة" },
        { id: "360241", customer: "سارة العتيبي", amount: 2150, status: "delivered", when: "منذ ساعتين" },
      ],
    },
    store: {
      name: "عطور الدار",
      products: [
        { name: "عطر عود الخشب 50 مل", price: 249, compareAt: 329 },
        { name: "طقم مبخرة وبخور", price: 89 },
      ],
    },
    labels: labelsAr,
  },
}

export { Hero09, labelsEn, labelsAr, demo }
export type { Hero09Props, Hero09Labels, Order as Hero09Order, Product as Hero09Product }
export default Hero09
