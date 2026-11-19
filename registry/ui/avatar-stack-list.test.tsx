import { expect, test } from "bun:test"
import { renderToString } from "react-dom/server"

import { AvatarStackList, avatarStackListLabelsAr } from "@/registry/ui/avatar-stack-list"

const members = [
  { id: "1", name: "Noura Al-Otaibi", role: "Owner" },
  { id: "2", name: "Faisal Al-Qahtani", role: "Admin" },
  { id: "3", name: "Huda Al-Ghamdi", role: "Editor" },
  { id: "4", name: "Abdullah Al-Harbi", role: "Viewer" },
  { id: "5", name: "Reem Al-Dosari", role: "Viewer" },
]

test("the trigger is a button named by the member count with a +N counter", () => {
  const html = renderToString(<AvatarStackList members={members} max={3} />)
  expect(html).toContain('aria-label="View 5 members"')
  expect(html).toContain("+2")
  expect(html).toContain('aria-haspopup="dialog"')
})

test("the list stays closed until the trigger opens it", () => {
  const html = renderToString(<AvatarStackList members={members} />)
  expect(html).not.toContain("Search members")
})

test("renders the Arabic trigger name with Arabic plural forms", () => {
  const two = renderToString(<AvatarStackList lang="ar" members={members.slice(0, 2)} labels={avatarStackListLabelsAr} />)
  expect(two).toContain('aria-label="عرض عضوين"')
  const five = renderToString(<AvatarStackList lang="ar" members={members} labels={avatarStackListLabelsAr} />)
  expect(five).toContain('aria-label="عرض 5 أعضاء"')
})
