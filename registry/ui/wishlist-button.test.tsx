import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { WishlistButton, wishlistButtonLabelsAr } from "@/registry/ui/wishlist-button"

test("renders an unpressed toggle with a constant name in en", () => {
  const html = renderToString(<WishlistButton />)
  expect(html).toContain('aria-pressed="false"')
  expect(html).toContain('aria-label="Save to wishlist"')
  expect(html).toContain('aria-live="polite"')
})

test("renders pressed in ar with the same name", () => {
  const html = renderToString(<WishlistButton defaultPressed labels={wishlistButtonLabelsAr} />)
  expect(html).toContain('aria-pressed="true"')
  expect(html).toContain('aria-label="حفظ في المفضلة"')
})

test("a controlled value wins over the default", () => {
  expect(renderToString(<WishlistButton pressed defaultPressed={false} />)).toContain('aria-pressed="true"')
})
