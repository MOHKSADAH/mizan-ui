import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { AsyncButton, asyncButtonLabelsAr } from "@/registry/ui/async-button"

test("renders every state label in one cell and exposes only the idle one", () => {
  const html = renderToString(<AsyncButton onAction={() => {}}>Save changes</AsyncButton>)
  for (const label of ["Save changes", "Saving...", "Saved", "Failed. Retry"]) expect(html).toContain(label)
  expect(html.match(/aria-hidden="true"/g)?.length).toBeGreaterThanOrEqual(3)
  expect(html.match(/invisible/g)).toHaveLength(3)
  expect(html).toContain('data-state="idle"')
  expect(html).toContain('role="status"')
})

test("renders the Arabic labels", () => {
  const html = renderToString(
    <AsyncButton onAction={() => {}} labels={asyncButtonLabelsAr}>
      حفظ التغييرات
    </AsyncButton>
  )
  expect(html).toContain("جارٍ الحفظ...")
  expect(html).toContain("تم الحفظ")
  expect(html).toContain("تعذّر الحفظ. أعد المحاولة")
})

test("the spinner stops under reduced motion", () => {
  expect(renderToString(<AsyncButton onAction={() => {}}>Save</AsyncButton>)).toContain("motion-reduce:animate-none")
})
