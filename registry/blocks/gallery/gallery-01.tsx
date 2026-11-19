import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import type { BlockBase, Lang } from "@/registry/lib/block-types"
import { ImageLightbox, imageLightboxLabelsAr, type ImageLightboxLabels } from "@/registry/ui/image-lightbox"
import { Container } from "@/registry/ui/container"
import { Section, SectionHeader } from "@/registry/ui/section"

// Without a src the tile shows a muted placeholder. With a src for every photo, a tile opens in the lightbox.
type GalleryPhoto = { src?: string; alt: string; width?: number; height?: number }

type Gallery01Labels = {
  lightbox: Partial<ImageLightboxLabels>
}

type Gallery01Props = BlockBase & {
  lang?: Lang
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  photos: GalleryPhoto[]
  labels?: Partial<Gallery01Labels>
}

const labelsEn: Gallery01Labels = { lightbox: {} }
const labelsAr: Gallery01Labels = { lightbox: imageLightboxLabelsAr }

const grid = "grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"

function Gallery01({ lang = "en", eyebrow, title, description, photos, headingLevel = 2, labels, id, className }: Gallery01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  const images = photos.flatMap(({ src, alt }) => (src ? [{ src, alt }] : []))
  return (
    <Section id={sid} className={className}>
      <Container>
        <SectionHeader id={sid} eyebrow={eyebrow} title={title} description={description} headingLevel={headingLevel} />
        {images.length === photos.length ? (
          <ImageLightbox images={images} zoom lang={lang} labels={t.lightbox} className={grid} />
        ) : (
          <ul className={`grid ${grid}`}>
            {photos.map(({ alt }) => (
              <li key={alt}>
                <div aria-hidden="true" className="flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground ring-1 ring-foreground/10">
                  <ImageIcon aria-hidden="true" weight="duotone" className="size-10" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}

const photo = (alt: string): GalleryPhoto => ({ alt, width: 800, height: 800 })

const demo: { en: Gallery01Props; ar: Gallery01Props } = {
  en: {
    lang: "en",
    eyebrow: "Gallery",
    title: "Moments from our sites",
    description: "Handover days, site visits and finished interiors across the Kingdom.",
    photos: [
      photo("Handover day at Diriyah Oasis"),
      photo("Site visit at Corniche Towers"),
      photo("Finished majlis in a Riyadh villa"),
      photo("Concrete pour in Al Khobar"),
      photo("Lobby of Olaya Plaza"),
      photo("Engineers reviewing drawings"),
      photo("Kitchen fit-out in Jeddah"),
      photo("Rooftop view in Abhur"),
    ],
    labels: labelsEn,
  },
  ar: {
    lang: "ar",
    eyebrow: "المعرض",
    title: "لقطات من مواقعنا",
    description: "أيام تسليم وزيارات موقع وتشطيبات منجزة في أنحاء المملكة.",
    photos: [
      photo("يوم التسليم في واحة الدرعية"),
      photo("زيارة موقع أبراج الكورنيش"),
      photo("مجلس مكتمل في فيلا بالرياض"),
      photo("صب خرسانة في الخبر"),
      photo("ردهة بلازا العليا"),
      photo("مهندسون يراجعون المخططات"),
      photo("تشطيب مطبخ في جدة"),
      photo("إطلالة من سطح مبنى في أبحر"),
    ],
    labels: labelsAr,
  },
}

export { Gallery01, labelsEn, labelsAr, demo }
export type { Gallery01Props, Gallery01Labels, GalleryPhoto }
export default Gallery01
