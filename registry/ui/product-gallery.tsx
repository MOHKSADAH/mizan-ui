"use client"

import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react"

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
  // Without a src the gallery shows a muted placeholder with an image icon.
  src?: string
  // Required: it names the image for screen readers and for the thumbnail button.
  alt: string
  width?: number
  height?: number
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

// One product image, or the placeholder when it has no src. It fills its parent box.
function ProductImage({
  image,
  priority,
  className,
}: {
  image: GalleryImage
  priority?: boolean
  className?: string
}) {
  if (!image.src) {
    return (
      <div
        role={image.alt ? "img" : undefined}
        aria-label={image.alt || undefined}
        aria-hidden={image.alt ? undefined : true}
        className={cn("flex size-full items-center justify-center bg-muted text-muted-foreground", className)}
      >
        <ImageIcon aria-hidden="true" weight="duotone" className="size-1/4 max-h-16 max-w-16" />
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      draggable={false}
      className={cn("size-full object-cover", className)}
    />
  )
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
      // Scroll only the strip: scrollIntoView would also scroll the page on every swipe.
      // Screen-rect deltas are physical, so the same code is right in LTR and RTL.
      const thumb = thumbs.current[index]
      const strip = thumb?.closest("ul")
      if (!thumb || !strip) return
      const box = strip.getBoundingClientRect()
      const rect = thumb.getBoundingClientRect()
      if (rect.left < box.left) strip.scrollBy({ left: rect.left - box.left }) // mizan-allow-physical
      else if (rect.right > box.right) strip.scrollBy({ left: rect.right - box.right }) // mizan-allow-physical
    }
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

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
              key={index}
              aria-label={t.slide(formatNumber(index + 1, locale), formatNumber(images.length, locale))}
              className="ps-0"
            >
              {zoom && item.src ? (
                <button
                  type="button"
                  aria-label={`${item.alt}, ${t.zoom}`}
                  onClick={() => setZoomed(index)}
                  className="block aspect-square w-full cursor-zoom-in outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
                >
                  <ProductImage image={item} priority={index === 0} />
                </button>
              ) : (
                <div className="aspect-square w-full">
                  <ProductImage image={item} priority={index === 0} />
                </div>
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
            <li key={index} className="shrink-0">
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
                <ProductImage image={{ ...item, alt: "" }} />
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

export { ProductGallery, ProductImage, productGalleryLabelsAr }
export type { GalleryImage, ProductGalleryLabels }
