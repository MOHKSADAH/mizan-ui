import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Currency, Lang, Media } from "@/registry/lib/block-types"
import { Badge } from "@/registry/ui/badge"
import { Container } from "@/registry/ui/container"
import { Price } from "@/registry/ui/price"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

type MenuTag = "new" | "spicy" | "vegan"
type MenuItem = {
  id: string
  name: string
  description?: string
  price: number
  tags?: MenuTag[]
  image?: Media
}
type MenuCategory = { id: string; label: string; items: MenuItem[] }

type Menu01Labels = { categories: string; tags: Record<MenuTag, string> }

type Menu01Props = BlockBase & {
  lang?: Lang
  eyebrow?: string
  title: string
  description?: string
  currency?: Currency
  categories: MenuCategory[]
  // Shows an image beside each item: the item's photo, or a placeholder when it has none.
  images?: boolean
  labels?: Partial<Menu01Labels>
}

const labelsEn: Menu01Labels = {
  categories: "Menu categories",
  tags: { new: "New", spicy: "Spicy", vegan: "Vegan" },
}
const labelsAr: Menu01Labels = {
  categories: "أقسام القائمة",
  tags: { new: "جديد", spicy: "حار", vegan: "نباتي" },
}

function Menu01({
  lang = "en",
  eyebrow,
  title,
  description,
  currency = "SAR",
  categories,
  images,
  headingLevel = 2,
  labels,
  id,
  className,
}: Menu01Props) {
  const t = { ...labelsEn, ...labels, tags: { ...labelsEn.tags, ...labels?.tags } }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <Section id={sid} className={className}>
      <Container size="narrow">
        <SectionHeader
          id={sid}
          eyebrow={eyebrow}
          title={title}
          description={description}
          headingLevel={headingLevel}
          align="center"
        />
        <Tabs defaultValue={categories[0]?.id} className="gap-8">
          <div className="mx-auto max-w-full overflow-x-auto">
            <TabsList aria-label={t.categories} className="h-10 w-max">
              {categories.map((c) => (
                <TabsTrigger key={c.id} value={c.id} className="px-4 text-base">
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {categories.map((c) => (
            <TabsContent key={c.id} value={c.id}>
              <ul className="grid gap-x-12 md:grid-cols-2">
                {c.items.map((item) => (
                  <li key={item.id} className="flex gap-4 border-b py-4">
                    {images ? (
                      <div className="size-20 shrink-0 overflow-hidden rounded-lg">
                        {item.image ? (
                          <img
                            src={item.image.src}
                            alt={item.image.alt}
                            width={item.image.width}
                            height={item.image.height}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div aria-hidden="true" className="flex size-full items-center justify-center bg-muted text-muted-foreground">
                            <ImageIcon aria-hidden="true" weight="duotone" className="size-8" />
                          </div>
                        )}
                      </div>
                    ) : null}
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-4">
                        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-semibold">
                          {item.name}
                          {item.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {t.tags[tag]}
                            </Badge>
                          ))}
                        </p>
                        <Price amount={item.price} lang={lang} currency={currency} className="text-lg font-semibold" />
                      </div>
                      {item.description ? <p className="text-base text-muted-foreground">{item.description}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}

const demo: { en: Menu01Props; ar: Menu01Props } = {
  en: {
    lang: "en",
    eyebrow: "Our menu",
    title: "Coffee, pastries and breakfast",
    description: "Freshly made every morning in Riyadh. Prices include VAT.",
    images: true,
    categories: [
      {
        id: "coffee",
        label: "Coffee",
        items: [
          { id: "v60", name: "V60 filter", description: "Single-origin Ethiopian beans, brewed to order.", price: 22 },
          { id: "dirty", name: "Dirty latte", description: "Cold milk topped with a hot espresso shot.", price: 24, tags: ["new"] },
          { id: "saudi", name: "Saudi coffee", description: "Light roast with cardamom, served with dates.", price: 18 },
          { id: "spanish", name: "Spanish latte", description: "Espresso, steamed milk and condensed milk.", price: 21 },
        ],
      },
      {
        id: "breakfast",
        label: "Breakfast",
        items: [
          { id: "shakshuka", name: "Shakshuka", description: "Eggs baked in spiced tomato sauce with fresh bread.", price: 38, tags: ["spicy"] },
          { id: "foul", name: "Foul medames", description: "Fava beans with olive oil, lemon and tomato.", price: 26, tags: ["vegan"] },
          { id: "labneh", name: "Labneh plate", description: "Strained yogurt, olives, za'atar and cucumber.", price: 29 },
          { id: "omelette", name: "Cheese omelette", description: "Three eggs, halloumi and herbs.", price: 32 },
        ],
      },
      {
        id: "pastry",
        label: "Pastries",
        items: [
          { id: "croissant", name: "Butter croissant", description: "Baked fresh at 6 a.m.", price: 14 },
          { id: "date-roll", name: "Date and tahini roll", description: "Khalas dates folded in laminated dough.", price: 16, tags: ["new", "vegan"] },
          { id: "cheesecake", name: "Basque cheesecake", description: "Creamy centre with a caramelised top.", price: 28 },
          { id: "kunafa", name: "Kunafa cup", description: "Crisp pastry, cheese and warm syrup.", price: 24 },
        ],
      },
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "قائمتنا",
    title: "قهوة ومعجنات وفطور",
    description: "نحضّرها طازجة كل صباح في الرياض. الأسعار تشمل ضريبة القيمة المضافة.",
    images: true,
    categories: [
      {
        id: "coffee",
        label: "القهوة",
        items: [
          { id: "v60", name: "قهوة V60", description: "حبوب إثيوبية مختصة، تُحضَّر عند الطلب.", price: 22 },
          { id: "dirty", name: "ديرتي لاتيه", description: "حليب بارد يعلوه شوت إسبريسو ساخن.", price: 24, tags: ["new"] },
          { id: "saudi", name: "القهوة السعودية", description: "تحميص فاتح بالهيل، تُقدَّم مع التمر.", price: 18 },
          { id: "spanish", name: "سبانش لاتيه", description: "إسبريسو وحليب مبخّر وحليب مكثف محلّى.", price: 21 },
        ],
      },
      {
        id: "breakfast",
        label: "الفطور",
        items: [
          { id: "shakshuka", name: "شكشوكة", description: "بيض مخبوز في صلصة طماطم متبلة مع خبز طازج.", price: 38, tags: ["spicy"] },
          { id: "foul", name: "فول مدمس", description: "فول بزيت الزيتون والليمون والطماطم.", price: 26, tags: ["vegan"] },
          { id: "labneh", name: "طبق لبنة", description: "لبنة مع الزيتون والزعتر والخيار.", price: 29 },
          { id: "omelette", name: "أومليت بالجبن", description: "ثلاث بيضات مع حلوم وأعشاب.", price: 32 },
        ],
      },
      {
        id: "pastry",
        label: "المعجنات",
        items: [
          { id: "croissant", name: "كرواسان بالزبدة", description: "يُخبز طازجًا عند السادسة صباحًا.", price: 14 },
          { id: "date-roll", name: "رول التمر والطحينة", description: "تمر خلاص ملفوف في عجينة طبقات.", price: 16, tags: ["new", "vegan"] },
          { id: "cheesecake", name: "تشيز كيك باسك", description: "قلب كريمي وسطح مكرمل.", price: 28 },
          { id: "kunafa", name: "كوب كنافة", description: "عجينة مقرمشة وجبن وقطر دافئ.", price: 24 },
        ],
      },
    ],
    labels: labelsAr,
  },
}

export { Menu01, labelsEn, labelsAr, demo }
export type { Menu01Props, Menu01Labels, MenuCategory, MenuItem, MenuTag }
export default Menu01
