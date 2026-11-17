import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { carouselLabelsAr } from "@/registry/ui/carousel"
import { ProductGallery, productGalleryLabelsAr } from "@/registry/ui/product-gallery"

const images = [
  { src: "/a.jpg", alt: "Front view" },
  { src: "/b.jpg", alt: "Side view", zoomSrc: "/b-large.jpg" },
  { src: "/c.jpg", alt: "Back view" },
]

test("renders slides, thumbnails and alt text in en", () => {
  const html = renderToString(<ProductGallery images={images} />)
  expect(html).toContain("Image 1 of 3")
  expect(html).toContain('alt="Front view"')
  expect(html).toContain('aria-label="Side view"')
  expect(html).toContain('aria-current="true"')
  expect(html).not.toContain("Zoom in")
})

test("zoom turns the main image into a button", () => {
  const html = renderToString(<ProductGallery images={images} zoom />)
  expect(html).toContain("Front view, Zoom in")
})

test("renders in ar", () => {
  const html = renderToString(
    <ProductGallery images={images} lang="ar" labels={productGalleryLabelsAr} carouselLabels={carouselLabelsAr} />
  )
  expect(html).toContain("الصورة 1 من 3")
  expect(html).toContain("صور المنتج")
})

test("a single image has no thumbnails or arrows", () => {
  const html = renderToString(<ProductGallery images={images.slice(0, 1)} />)
  expect(html).not.toContain("Choose an image")
  expect(html).not.toContain("Next slide")
})
