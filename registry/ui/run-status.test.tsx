import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { RunStatus, runStatusLabelsAr, type RunState } from "@/registry/ui/run-status"

const states: RunState[] = ["running", "done", "idle", "needs-you", "failed", "queued"]

test("renders every state with an icon and its text in en", () => {
  for (const state of states) {
    const html = renderToString(<RunStatus state={state} />)
    expect(html).toContain("<svg")
    expect(html).toContain(`data-state="${state}"`)
  }
  expect(renderToString(<RunStatus state="needs-you" />)).toContain("Needs you")
})

test("only needs-you is a solid warning pill, and the spinner stops for reduced motion", () => {
  expect(renderToString(<RunStatus state="needs-you" />)).toContain("bg-warning")
  expect(renderToString(<RunStatus state="done" />)).not.toContain("bg-warning")
  expect(renderToString(<RunStatus state="running" />)).toContain("motion-safe:animate-spin")
})

test("renders Arabic labels", () => {
  for (const state of states) {
    expect(renderToString(<RunStatus state={state} labels={runStatusLabelsAr} />)).toContain(runStatusLabelsAr[state])
  }
})
