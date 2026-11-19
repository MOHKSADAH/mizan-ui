import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { DirectionProvider } from "@/registry/ui/direction"
import { FormWizard, formWizardLabelsAr } from "@/registry/ui/form-wizard"

const steps = [
  { id: "store", label: "Store details", description: "The store name.", content: <input aria-label="Name" /> },
  { id: "address", label: "Address", content: <input aria-label="City" /> },
  { id: "review", label: "Review", content: <p>Done?</p> },
]

test("renders the first step only, with the numbered header and a disabled Back", () => {
  const html = renderToString(<FormWizard steps={steps} />)
  expect(html).toContain('aria-current="step"')
  expect(html).toContain('role="group"')
  expect(html).toContain("Store details")
  expect(html).toContain('aria-label="Name"')
  expect(html).not.toContain('aria-label="City"')
  expect(html).toContain("Next")
  expect(html).toMatch(/<button[^>]*disabled[^>]*>[^]*?Back/)
})

test("starts on another step and shows Finish on the last", () => {
  const html = renderToString(<FormWizard steps={steps} defaultStep={2} />)
  expect(html).toContain("Done?")
  expect(html).toContain("Finish")
  expect(html).not.toContain("Next")
})

test("dots show the spoken position", () => {
  const html = renderToString(<FormWizard steps={steps} indicator="dots" defaultStep={1} />)
  expect(html).toContain("Step 2 of 3")
  expect(html).not.toContain("<ol class=\"flex items-center text-sm")
})

test("renders in Arabic with Arabic digits and mirrored arrows", () => {
  const html = renderToString(
    <DirectionProvider direction="rtl">
      <FormWizard steps={steps} indicator="dots" lang="ar" digits="arab" labels={formWizardLabelsAr} />
    </DirectionProvider>
  )
  expect(html).toContain("الخطوة ١ من ٣")
  expect(html).toContain("التالي")
  expect(html).toContain("rtl:rotate-180")
  expect(html).toContain("slide-in-from-end-4")
  expect(html).toContain("motion-reduce:animate-none")
})
