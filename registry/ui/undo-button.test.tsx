import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { UndoButton, undoButtonLabelsAr } from "@/registry/ui/undo-button"

test("renders the idle, countdown and done labels in one cell with a destructive idle button", () => {
  const html = renderToString(<UndoButton onConfirm={() => {}}>Delete account</UndoButton>)
  expect(html).toContain("Delete account")
  expect(html).toContain("Undo (5)")
  expect(html).toContain("Deleted")
  expect(html).toContain("bg-destructive/10")
  expect(html).toContain('data-state="idle"')
  expect(html).toContain('role="status"')
  expect(html.match(/invisible/g)).toHaveLength(2)
})

test("starts the countdown from the seconds prop", () => {
  expect(renderToString(<UndoButton seconds={3} onConfirm={() => {}}>Delete</UndoButton>)).toContain("Undo (3)")
})

test("renders Arabic labels and digits", () => {
  const html = renderToString(
    <UndoButton lang="ar" digits="arab" labels={undoButtonLabelsAr} onConfirm={() => {}}>
      حذف الحساب
    </UndoButton>
  )
  expect(html).toContain("تراجع (٥)")
  expect(html).toContain("تم الحذف")
  expect(html).toContain("rtl:-scale-x-100")
})
