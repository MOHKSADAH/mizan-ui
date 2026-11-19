import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { runStatusLabelsAr } from "@/registry/ui/run-status"
import { StepList } from "@/registry/ui/step-list"

const steps = [
  { id: "a", title: "Read orders", status: "done" as const, meta: "40" },
  { id: "b", title: "Create invoices", status: "running" as const, meta: "18 / 38" },
  { id: "c", title: "Submit", status: "queued" as const },
]

test("renders an ordered list with the status read before each title", () => {
  const html = renderToString(<StepList steps={steps} />)
  expect(html).toContain("<ol")
  expect(html).toContain('<span class="sr-only">Done: </span>Read orders')
  expect(html).toContain('<span class="sr-only">Running: </span>Create invoices')
  expect(html).toContain("18 / 38")
})

test("joins the steps with a line but not after the last one", () => {
  const html = renderToString(<StepList steps={steps} />)
  expect(html.match(/my-1 w-px/g)).toHaveLength(2)
})

test("renders Arabic status labels", () => {
  const html = renderToString(<StepList steps={steps} labels={runStatusLabelsAr} />)
  expect(html).toContain("اكتمل")
  expect(html).toContain("قيد التشغيل")
})
