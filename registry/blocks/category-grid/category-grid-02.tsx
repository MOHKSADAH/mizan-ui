import * as React from "react"
import {
  ArmchairIcon,
  HandbagIcon,
  HeadphonesIcon,
  FlowerLotusIcon,
  SquaresFourIcon,
  SunglassesIcon,
  TagIcon,
  TShirtIcon,
  WatchIcon,
} from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Category = {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  current?: boolean
}

type CategoryGrid02Labels = {
  nav: string
}

type CategoryGrid02Props = BlockBase & {
  lang?: Lang
  title: string
  viewAll?: Action
  categories: Category[]
  labels?: Partial<CategoryGrid02Labels>
}

const labelsEn: CategoryGrid02Labels = { nav: "Product categories" }
const labelsAr: CategoryGrid02Labels = { nav: "أقسام المتجر" }

function CategoryGrid02({ title, viewAll, categories, headingLevel = 2, labels, id, className }: CategoryGrid02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} spacing="compact" className={className}>
      <Container>
        <SectionHeader
          id={sid}
          title={title}
          headingLevel={headingLevel}
          className="mb-5 md:mb-5"
          actions={
            viewAll ? (
              <a href={viewAll.href} className={cn(buttonVariants({ variant: "link" }), "h-auto px-0")}>
                {viewAll.label}
              </a>
            ) : undefined
          }
        />
        <nav aria-label={t.nav}>
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <li key={c.id} className="shrink-0">
                <a
                  href={c.href}
                  aria-current={c.current ? "page" : undefined}
                  className="inline-flex h-11 items-center gap-2 rounded-full border bg-background px-4 text-sm font-medium whitespace-nowrap outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=page]:border-primary aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground [&_svg]:size-5 [&_svg]:shrink-0"
                >
                  {c.icon}
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  )
}

const catalog = [
  { id: "all", icon: <SquaresFourIcon aria-hidden="true" weight="regular" />, en: "All products", ar: "كل المنتجات", current: true },
  { id: "deals", icon: <TagIcon aria-hidden="true" weight="regular" />, en: "Today's deals", ar: "عروض اليوم" },
  { id: "fragrance", icon: <FlowerLotusIcon aria-hidden="true" weight="regular" />, en: "Fragrance", ar: "العطور" },
  { id: "bags", icon: <HandbagIcon aria-hidden="true" weight="regular" />, en: "Bags", ar: "الحقائب" },
  { id: "watches", icon: <WatchIcon aria-hidden="true" weight="regular" />, en: "Watches", ar: "الساعات" },
  { id: "eyewear", icon: <SunglassesIcon aria-hidden="true" weight="regular" />, en: "Eyewear", ar: "النظارات" },
  { id: "clothing", icon: <TShirtIcon aria-hidden="true" weight="regular" />, en: "Clothing", ar: "الملابس" },
  { id: "home", icon: <ArmchairIcon aria-hidden="true" weight="regular" />, en: "Home", ar: "المنزل" },
  { id: "electronics", icon: <HeadphonesIcon aria-hidden="true" weight="regular" />, en: "Electronics", ar: "الإلكترونيات" },
] as const

const build = (lang: Lang): CategoryGrid02Props => ({
  lang,
  title: lang === "ar" ? "تصفح الأقسام" : "Browse categories",
  viewAll: { label: lang === "ar" ? "كل الأقسام" : "All categories", href: "#all" },
  categories: catalog.map((c) => ({ id: c.id, label: c[lang], href: `#${c.id}`, icon: c.icon, current: "current" in c })),
  labels: lang === "ar" ? labelsAr : labelsEn,
})

const demo: { en: CategoryGrid02Props; ar: CategoryGrid02Props } = { en: build("en"), ar: build("ar") }

export { CategoryGrid02, labelsEn, labelsAr, demo }
export type { CategoryGrid02Props, CategoryGrid02Labels, Category }
export default CategoryGrid02
