import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { FloatingContact, floatingContactLabelsAr, whatsappHref } from "@/registry/ui/floating-contact"

test("builds a wa.me link from an international number", () => {
  expect(whatsappHref("+966 50 123 4567")).toBe("https://wa.me/966501234567")
  expect(whatsappHref("00966501234567", "Hi there")).toBe("https://wa.me/966501234567?text=Hi%20there")
})

test("renders a collapsed launcher that lifts above a sticky bar and respects safe areas", () => {
  const html = renderToString(<FloatingContact phone="+966501234567" />)
  expect(html).toContain('aria-expanded="false"')
  expect(html).toContain("Contact us")
  expect(html).toContain("var(--sticky-bar-height,0px)")
  expect(html).toContain("env(safe-area-inset-bottom,0px)")
  expect(html).toContain("env(safe-area-inset-right)")
  expect(html).not.toContain("tel:")
})

test("renders in ar", () => {
  const html = renderToString(<FloatingContact whatsapp={{ phone: "+966501234567" }} labels={floatingContactLabelsAr} />)
  expect(html).toContain("تواصل معنا")
})

test("an open launcher lists the configured actions only", () => {
  const html = renderToString(
    <FloatingContact defaultOpen whatsapp={{ phone: "+966501234567", message: "Hi" }} phone="+966 11 234 5678" />
  )
  expect(html).toContain("https://wa.me/966501234567?text=Hi")
  expect(html).toContain('href="tel:+966112345678"')
  expect(html).toContain("opens in a new tab")
  expect(html).toContain("Close contact options")
  expect(html).not.toContain("Live chat")
})
