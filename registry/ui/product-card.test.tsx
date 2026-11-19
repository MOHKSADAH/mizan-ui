import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import {
  ProductCard,
  ProductCardBadges,
  ProductCardBody,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardSwatches,
  ProductCardTitle,
} from "@/registry/ui/product-card"

const card = (props: Parameters<typeof ProductCard>[0] = {}) =>
  renderToString(
    <ProductCard {...props}>
      <ProductCardMedia>
        <ProductCardImage src="/a.svg" alt="Leather tote" />
        <ProductCardBadges>Sale</ProductCardBadges>
      </ProductCardMedia>
      <ProductCardBody>
        <ProductCardTitle href="/p/tote">Leather tote</ProductCardTitle>
        <ProductCardSwatches swatches={[{ label: "Sand", color: "oklch(0.85 0.05 85)" }]} />
      </ProductCardBody>
    </ProductCard>,
  )

test("renders a vertical card by default with a stretched title link", () => {
  const html = card()
  expect(html).toContain('data-orientation="vertical"')
  expect(html).toContain('alt="Leather tote"')
  expect(html).toContain('href="/p/tote"')
  expect(html).toContain("after:absolute after:inset-0")
  expect(html).not.toContain("data-unavailable")
})

test("horizontal and unavailable are state attributes", () => {
  const html = card({ orientation: "horizontal", unavailable: true })
  expect(html).toContain('data-orientation="horizontal"')
  expect(html).toContain('data-unavailable=""')
})

test("the title is plain text without an href and takes the heading level", () => {
  const html = renderToString(<ProductCardTitle as="h4">Leather tote</ProductCardTitle>)
  expect(html).toContain("<h4")
  expect(html).not.toContain("<a")
})

test("swatches are named in text", () => {
  expect(card()).toContain('<span class="sr-only">Sand</span>')
})

test("the old price is a del with a spoken prefix, in en and ar", () => {
  const en = renderToString(<ProductCardPrice amount={199} compareAt={249} compareAtLabel="Original price:" />)
  expect(en).toContain("<del")
  expect(en).toContain("Original price:")
  expect(en).toContain("199 Saudi riyals")
  const ar = renderToString(<ProductCardPrice amount={199} compareAt={249} lang="ar" compareAtLabel="السعر الأصلي:" />)
  expect(ar).toContain("السعر الأصلي:")
  expect(ar).toContain("<bdi")
})

test("a price without compareAt has no del", () => {
  expect(renderToString(<ProductCardPrice amount={199} />)).not.toContain("<del")
})
