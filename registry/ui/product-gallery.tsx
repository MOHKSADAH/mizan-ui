"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import { formatNumber, type Digits, type Lang } from "@/registry/lib/format"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
  type CarouselLabels,
} from "@/registry/ui/carousel"
import { Dialog, DialogContent, DialogTitle, type DialogLabels } from "@/registry/ui/dialog"

type GalleryImage = {
  src: string
  // Required: it names the image for screen readers and for the thumbnail button.
  alt: string
  // A larger file for the zoom dialog. Defaults to src.
  zoomSrc?: string
}

type ProductGalleryLabels = {
  gallery: string
  thumbnails: string
  slide: (n: string, total: string) => string
  zoom: string
}

const defaultLabels: ProductGalleryLabels = {
  gallery: "Product images",
  thumbnails: "Choose an image",
  slide: (n, total) => `Image ${n} of ${total}`,
  zoom: "Zoom in",
}

const productGalleryLabelsAr: ProductGalleryLabels = {
  gallery: "صور المنتج",
  thumbnails: "اختر صورة",
  slide: (n, total) => `الصورة ${n} من ${total}`,
  zoom: "تكبير",
}

type ProductGalleryProps = Omit<React.ComponentProps<"div">, "children"> & {
  images: GalleryImage[]
  // Clicking the main image opens it larger in a dialog.
  zoom?: boolean
  lang?: Lang
  digits?: Digits
  labels?: Partial<ProductGalleryLabels>
  carouselLabels?: Partial<CarouselLabels>
  dialogLabels?: Partial<DialogLabels>
}

function ProductGallery({
  images,
  zoom,
  lang = "en",
  digits,
  labels,
  carouselLabels,
  dialogLabels,
  className,
  ...props
}: ProductGalleryProps) {
  const t = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const [api, setApi] = React.useState<CarouselApi>()
  const [selected, setSelected] = React.useState(0)
  const [zoomed, setZoomed] = React.useState<number>()
  const thumbs = React.useRef<(HTMLButtonElement | null)[]>([])

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => {
      const index = api.selectedScrollSnap()
      setSelected(index)
      thumbs.current[index]?.scrollIntoView({ block: "nearest", inline: "nearest" })
    }
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const image = (item: GalleryImage, index: number, className: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.src} alt={item.alt} loading={index === 0 ? "eager" : "lazy"} draggable={false} className={className} />
  )

  return (
    <div data-slot="product-gallery" className={cn("flex min-w-0 flex-col gap-3", className)} {...props}>
      <Carousel
        setApi={setApi}
        aria-label={t.gallery}
        labels={carouselLabels}
        className="overflow-hidden rounded-xl border border-border"
      >
        <CarouselContent className="ms-0">
          {images.map((item, index) => (
            <CarouselItem
              key={item.src}
              aria-label={t.slide(formatNumber(index + 1, locale), formatNumber(images.length, locale))}
              className="ps-0"
            >
              {zoom ? (
                <button
                  type="button"
                  aria-label={`${item.alt}, ${t.zoom}`}
                  onClick={() => setZoomed(index)}
                  className="block aspect-square w-full cursor-zoom-in outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
                >
                  {image(item, index, "size-full object-cover")}
                </button>
              ) : (
                <div className="aspect-square w-full">{image(item, index, "size-full object-cover")}</div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="start-2" />
            <CarouselNext className="end-2" />
          </>
        )}
      </Carousel>
      {images.length > 1 && (
        <ul
          aria-label={t.thumbnails}
          className="flex gap-2 overflow-x-auto p-1 [scrollbar-width:thin]"
        >
          {images.map((item, index) => (
            <li key={item.src} className="shrink-0">
              <button
                type="button"
                ref={(node) => {
                  thumbs.current[index] = node
                }}
                aria-label={item.alt}
                aria-current={index === selected ? "true" : undefined}
                onClick={() => api?.scrollTo(index)}
                className="block size-16 overflow-hidden rounded-lg border border-border outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=true]:border-foreground aria-[current=true]:outline-2 aria-[current=true]:outline-offset-2 aria-[current=true]:outline-solid aria-[current=true]:outline-foreground"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt="" loading="lazy" draggable={false} className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {zoom && (
        <Dialog open={zoomed !== undefined} onOpenChange={(open) => !open && setZoomed(undefined)}>
          <DialogContent labels={dialogLabels} className="p-2 sm:max-w-3xl">
            {zoomed !== undefined && images[zoomed] && (
              <>
                <DialogTitle className="sr-only">{images[zoomed].alt}</DialogTitle>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[zoomed].zoomSrc ?? images[zoomed].src}
                  alt={images[zoomed].alt}
                  className="max-h-[80vh] w-full rounded-lg object-contain"
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export { ProductGallery, productGalleryLabelsAr }
export type { GalleryImage, ProductGalleryLabels }
