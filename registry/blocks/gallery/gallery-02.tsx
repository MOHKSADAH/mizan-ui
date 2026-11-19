import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { Container } from "@/registry/ui/container"
import { ImageLightbox, imageLightboxLabelsAr, type ImageLightboxLabels } from "@/registry/ui/image-lightbox"
import { Section, SectionHeader } from "@/registry/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

// Without a src the tile shows a muted placeholder. With a src for every photo of a tab, a tile opens in the lightbox.
type GalleryPhoto = { src?: string; alt: string; width?: number; height?: number; category: string }

type Category = { id: string; label: string }

type Gallery02Labels = {
  all: string
  lightbox: Partial<ImageLightboxLabels>
}

type Gallery02Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  categories: Category[]
  photos: GalleryPhoto[]
  labels?: Partial<Gallery02Labels>
}

const labelsEn: Gallery02Labels = { all: "All", lightbox: {} }
const labelsAr: Gallery02Labels = { all: "الكل", lightbox: imageLightboxLabelsAr }

const grid = "grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
const ALL = "all"

function Photos({ photos, lang, lightbox }: { photos: GalleryPhoto[]; lang: Lang; lightbox: Partial<ImageLightboxLabels> }) {
  const images = photos.flatMap(({ src, alt }) => (src ? [{ src, alt }] : []))
  if (images.length === photos.length) return <ImageLightbox images={images} zoom lang={lang} labels={lightbox} className={grid} />
  return (
    <ul className={`grid ${grid}`}>
      {photos.map(({ alt }) => (
        <li key={alt}>
          <div aria-hidden="true" className="flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground ring-1 ring-foreground/10">
            <ImageIcon aria-hidden="true" weight="duotone" className="size-10" />
          </div>
        </li>
      ))}
    </ul>
  )
}

function Gallery02({ lang = "en", eyebrow, title, description, categories, photos, headingLevel = 2, labels, id, className }: Gallery02Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const tabs = [{ id: ALL, label: t.all }, ...categories]
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        <Tabs defaultValue={ALL} className="gap-6">
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            <TabsList className="h-10 w-max">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="px-4">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <Photos photos={tab.id === ALL ? photos : photos.filter((p) => p.category === tab.id)} lang={lang} lightbox={t.lightbox} />
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  )
}

const photo = (alt: string, category: string): GalleryPhoto => ({ alt, category, width: 800, height: 800 })

const demo: { en: Gallery02Props; ar: Gallery02Props } = {
  en: {
    lang: "en",
    eyebrow: "Gallery",
    title: "Our work, by category",
    description: "Browse finished projects, sites in progress and the team at work.",
    categories: [
      { id: "completed", label: "Completed" },
      { id: "progress", label: "In progress" },
      { id: "team", label: "Team" },
    ],
    photos: [
      photo("Lobby of Olaya Plaza", "completed"),
      photo("Finished majlis in a Riyadh villa", "completed"),
      photo("Handover day at Diriyah Oasis", "completed"),
      photo("Facade of Corniche Towers", "completed"),
      photo("Concrete pour in Al Khobar", "progress"),
      photo("Steel frame at Abhur Front", "progress"),
      photo("Engineers reviewing drawings", "team"),
      photo("Site safety briefing", "team"),
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "المعرض",
    title: "أعمالنا حسب التصنيف",
    description: "تصفّح المشاريع المنجزة والمواقع قيد التنفيذ والفريق أثناء العمل.",
    categories: [
      { id: "completed", label: "منجزة" },
      { id: "progress", label: "قيد التنفيذ" },
      { id: "team", label: "الفريق" },
    ],
    photos: [
      photo("ردهة بلازا العليا", "completed"),
      photo("مجلس مكتمل في فيلا بالرياض", "completed"),
      photo("يوم التسليم في واحة الدرعية", "completed"),
      photo("واجهة أبراج الكورنيش", "completed"),
      photo("صب خرسانة في الخبر", "progress"),
      photo("هيكل حديدي في واجهة أبحر", "progress"),
      photo("مهندسون يراجعون المخططات", "team"),
      photo("إحاطة السلامة في الموقع", "team"),
    ],
    labels: labelsAr,
  },
}

export { Gallery02, labelsEn, labelsAr, demo }
export type { Gallery02Props, Gallery02Labels, GalleryPhoto, Category }
export default Gallery02
