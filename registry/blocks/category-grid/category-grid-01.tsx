import * as React from "react"
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase, Lang, Plural } from "@/registry/lib/block-types"
import { plural } from "@/registry/lib/format"
import { cn } from "@/registry/lib/utils"
import { buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

type Category = {
  id: string
  name: string
  count: number
  href: string
  image: { src: string; alt: string }
}

type CategoryGrid01Labels = {
  items: Plural
}

type CategoryGrid01Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  viewAll?: Action
  // The first category is the large lead tile.
  categories: Category[]
  labels?: Partial<CategoryGrid01Labels>
}

const labelsEn: CategoryGrid01Labels = {
  items: (n) => plural(n, { one: "{n} item", other: "{n} items" }, { lang: "en" }),
}

const labelsAr: CategoryGrid01Labels = {
  items: (n) =>
    plural(n, { zero: "لا منتجات", one: "منتج واحد", two: "منتجان", few: "{n} منتجات", many: "{n} منتجًا", other: "{n} منتج" }, { lang: "ar" }),
}

function CategoryGrid01({
  eyebrow,
  title,
  description,
  viewAll,
  categories,
  headingLevel = 2,
  labels,
  id,
  className,
}: CategoryGrid01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const ItemHeading = `h${headingLevel + 1}` as "h3" | "h4"
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          actions={
            viewAll ? (
              <a href={viewAll.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}>
                {viewAll.label}
              </a>
            ) : undefined
          }
        />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-x-4">
          {categories.map((c, i) => {
            const lead = i === 0
            return (
              <li key={c.id} className={cn(lead && "col-span-2 md:row-span-2")}>
                <a
                  href={c.href}
                  className="group flex h-full flex-col gap-3 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <div className={cn("relative aspect-square overflow-hidden rounded-xl bg-muted", lead && "md:aspect-auto md:min-h-0 md:flex-1")}>
                    <img src={c.image.src} alt={c.image.alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <ItemHeading className={cn("truncate font-semibold", lead ? "text-lg" : "text-base")}>{c.name}</ItemHeading>
                      <p className="text-sm text-muted-foreground">{t.items(c.count)}</p>
                    </div>
                    <ArrowUpRightIcon aria-hidden="true" weight="bold" className="size-4 shrink-0 text-muted-foreground rtl:-scale-x-100" />
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

const catalog = [
  { id: "fragrance", img: 2, count: 86, en: "Fragrance and oud", ar: "العطور والعود" },
  { id: "watches", img: 3, count: 54, en: "Watches", ar: "الساعات" },
  { id: "bags", img: 1, count: 63, en: "Bags", ar: "الحقائب" },
  { id: "home", img: 4, count: 120, en: "Home and hospitality", ar: "المنزل والضيافة" },
  { id: "clothing", img: 6, count: 210, en: "Clothing", ar: "الملابس" },
] as const

const build = (lang: Lang): CategoryGrid01Props => ({
  lang,
  title: lang === "ar" ? "تسوّق حسب القسم" : "Shop by category",
  description: lang === "ar" ? "من دهن العود إلى فناجين القهوة، كل ما تحتاجه من علامات سعودية." : "From oud oil to coffee cups, everything from Saudi brands.",
  viewAll: { label: lang === "ar" ? "كل الأقسام" : "All categories", href: "#all" },
  categories: catalog.map((c) => ({
    id: c.id,
    name: c[lang],
    count: c.count,
    href: `#${c.id}`,
    image: { src: `/examples/shop-${c.img}.svg`, alt: c[lang] },
  })),
  labels: lang === "ar" ? labelsAr : labelsEn,
})

const demo: { en: CategoryGrid01Props; ar: CategoryGrid01Props } = { en: build("en"), ar: build("ar") }

export { CategoryGrid01, labelsEn, labelsAr, demo }
export type { CategoryGrid01Props, CategoryGrid01Labels, Category }
export default CategoryGrid01
