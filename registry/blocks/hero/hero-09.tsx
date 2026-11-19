import * as React from "react"
import { CheckCircleIcon, ShoppingCartSimpleIcon, StorefrontIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { formatPercent } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
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
type Product = { name: string; price: number; compareAt?: number; image: string }

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
  // A pill above the title. It can hold a stat, for example an icon, a bold number and a short sentence.
  eyebrow?: React.ReactNode
  // Mix weights with <strong>: the heading is font-normal, so the strong part stands out.
  title: React.ReactNode
  description?: string
  primaryCta: Action
  secondaryCta?: Action
  brands?: string[]
  dashboard: {
    title: string
    sales: { amount: number; delta: number; spark?: number[] }
    orders: { value: number; delta: number }
    goal: { current: number; target: number }
    // Bar heights in percent. The bars sit at the inline-end of the dashboard and are clipped with it.
    chart: number[]
    recent: Order[]
  }
  store: { name: string; products: Product[] }
  labels?: Partial<Hero09Labels>
}

const labelsEn: Hero09Labels = {
  preview: "Preview of the Rafid dashboard and a store on a phone",
  sales: "Sales",
  orders: "Orders",
  goal: "Monthly goal",
  recent: "Recent orders",
  trustedBy: "Trusted by stores such as",
  buy: "Buy now",
  originalPrice: "Original price:",
}

const labelsAr: Hero09Labels = {
  preview: "معاينة للوحة تحكم رافد ومتجر على الجوال",
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
    <Section id={sid} spacing="hero" className={cn("overflow-hidden", className)}>
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-8">
        <div className="flex flex-col items-start gap-6">
          {eyebrow ? (
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm">
              {eyebrow}
            </p>
          ) : null}
          <Heading id={`${sid}-heading`} className="text-4xl font-normal text-balance md:text-5xl">
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
                  <li key={brand} className="rounded-full border bg-card px-4 py-1.5 text-sm font-medium">
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Below lg the composition stacks inside the viewport. From lg it may run past the column and the section clips it at the inline-end edge; only the decorative chart (xl and up) can be cut. */}
        <div className="min-w-0">
          <div role="img" aria-label={t.preview} className="flex flex-col gap-6 lg:w-max lg:flex-row lg:items-start lg:gap-0">
            <div className="relative z-10 order-2 mx-auto w-60 shrink-0 overflow-hidden lg:order-1 lg:mx-0 lg:w-52 rounded-[2rem] border-[6px] border-foreground bg-background">
              <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <StorefrontIcon aria-hidden="true" weight="bold" className="size-4" />
                  {store.name}
                </span>
                <ShoppingCartSimpleIcon aria-hidden="true" weight="bold" className="size-4" />
              </div>
              <div className="flex flex-col gap-4 p-3">
                {store.products.map((product) => (
                  <ProductCard key={product.name}>
                    <ProductCardMedia className="aspect-4/3">
                      <ProductCardImage src={product.image} alt="" />
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

            <div className="order-1 flex w-full gap-6 rounded-2xl border bg-muted p-4 lg:order-2 lg:mt-14 lg:-ms-10 lg:w-max lg:ps-12">
              <div className="flex w-full flex-col gap-4 lg:w-[22rem] lg:shrink-0">
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
                <div className="flex flex-col gap-2 rounded-xl border bg-card p-4">
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
                  <ul className="flex flex-col gap-2">
                    {dashboard.recent.map((order) => (
                      <li key={order.id} className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3">
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
              </div>
              <div aria-hidden="true" className="hidden w-56 shrink-0 items-end gap-2 self-stretch overflow-hidden xl:flex">
                {dashboard.chart.map((height, i) => (
                  <span key={i} style={{ height: `${height}%` }} className="w-4 shrink-0 rounded-t-md bg-primary" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

const shop = (n: number) => `/examples/shop-${n}.svg`

const demo: { en: Hero09Props; ar: Hero09Props } = {
  en: {
    lang: "en",
    eyebrow: (
      <>
        <CheckCircleIcon aria-hidden="true" weight="fill" className="size-4 shrink-0 text-primary" />
        <span>
          <strong>
            <bdi>+12,000</bdi>
          </strong>{" "}
          stores selling on Rafid across the Kingdom
        </span>
      </>
    ),
    title: (
      <>
        <strong>Your online store</strong> ready to sell in one day
      </>
    ),
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
      chart: [22, 30, 26, 38, 34, 46, 42, 58, 52, 66, 74, 88],
      recent: [
        { id: "360243", customer: "Abdullah Al-Harbi", amount: 1240, status: "pending", when: "23 minutes ago" },
        { id: "360242", customer: "Noura Al-Qahtani", amount: 385, status: "shipped", when: "1 hour ago" },
        { id: "360241", customer: "Sara Al-Otaibi", amount: 2150, status: "delivered", when: "2 hours ago" },
      ],
    },
    store: {
      name: "Al Dar Perfumes",
      products: [
        { name: "Oud Wood Perfume 50 ml", price: 249, compareAt: 329, image: shop(1) },
        { name: "Bakhoor Burner Set", price: 89, image: shop(2) },
      ],
    },
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: (
      <>
        <CheckCircleIcon aria-hidden="true" weight="fill" className="size-4 shrink-0 text-primary" />
        <span>
          <strong>
            <bdi>+12,000</bdi>
          </strong>{" "}
          متجر يبيع على رافد في أنحاء المملكة
        </span>
      </>
    ),
    title: (
      <>
        <strong>متجرك الإلكتروني</strong> جاهز للبيع في يوم واحد
      </>
    ),
    description: "أنشئ متجرك، واربط الدفع والشحن، وتابع طلباتك ومخزونك من لوحة واحدة تعمل بالعربية والإنجليزية.",
    primaryCta: { label: "أنشئ متجرك مجانًا", href: "#start" },
    secondaryCta: { label: "شاهد عرضًا تجريبيًا", href: "#demo" },
    brands: ["عطور الدار", "قهوة الجبل", "حلويات بيتي", "نسيج للمفروشات"],
    dashboard: {
      title: "ملخص مبيعات نوفمبر",
      sales: { amount: 248339, delta: 12.4, spark: [12, 18, 15, 24, 22, 31, 29, 38] },
      orders: { value: 692, delta: 6.8 },
      goal: { current: 248339, target: 300000 },
      chart: [22, 30, 26, 38, 34, 46, 42, 58, 52, 66, 74, 88],
      recent: [
        { id: "360243", customer: "عبدالله الحربي", amount: 1240, status: "pending", when: "منذ 23 دقيقة" },
        { id: "360242", customer: "نورة القحطاني", amount: 385, status: "shipped", when: "منذ ساعة" },
        { id: "360241", customer: "سارة العتيبي", amount: 2150, status: "delivered", when: "منذ ساعتين" },
      ],
    },
    store: {
      name: "عطور الدار",
      products: [
        { name: "عطر عود الخشب 50 مل", price: 249, compareAt: 329, image: shop(1) },
        { name: "طقم مبخرة وبخور", price: 89, image: shop(2) },
      ],
    },
    labels: labelsAr,
  },
}

export { Hero09, labelsEn, labelsAr, demo }
export type { Hero09Props, Hero09Labels, Order as Hero09Order, Product as Hero09Product }
export default Hero09
