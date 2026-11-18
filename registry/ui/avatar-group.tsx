import * as React from "react"
import { formatNumber, plural, type Digits, type Lang, type PluralForms } from "@/registry/lib/format"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/registry/ui/avatar"

type AvatarStackLabels = {
  // Spoken total on the group, with {n}.
  people: PluralForms
  // Spoken overflow, with {n}.
  more: PluralForms
}

const defaultLabels: AvatarStackLabels = {
  people: { one: "{n} person", other: "{n} people" },
  more: { one: "and {n} more", other: "and {n} more" },
}

const avatarStackLabelsAr: AvatarStackLabels = {
  people: { zero: "لا أشخاص", one: "شخص واحد", two: "شخصان", few: "{n} أشخاص", many: "{n} شخصا", other: "{n} شخص" },
  more: { zero: "ولا أحد آخر", one: "وشخص آخر", two: "وشخصان آخران", few: "و{n} آخرون", many: "و{n} آخرين", other: "و{n} آخر" },
}

type AvatarStackPerson = { name: string; src?: string }

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => [...word][0])
    .join("")

type AvatarStackProps = Omit<React.ComponentProps<typeof AvatarGroup>, "children"> & {
  people: AvatarStackPerson[]
  // Avatars shown before the +N counter.
  max?: number
  size?: "sm" | "default" | "lg"
  lang?: Lang
  digits?: Digits
  labels?: Partial<AvatarStackLabels>
}

// Overlap and its RTL mirror come from AvatarGroup.
function AvatarStack({ people, max = 4, size, lang = "en", digits = "latn", labels, ...props }: AvatarStackProps) {
  const l = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  const shown = people.slice(0, max)
  const rest = people.length - shown.length
  return (
    <AvatarGroup role="group" aria-label={plural(people.length, l.people, locale)} {...props}>
      {shown.map((person, i) => (
        // Names can repeat, so the position is the key.
        <Avatar key={i} size={size}>
          {person.src && <AvatarImage src={person.src} alt={person.name} />}
          <AvatarFallback>
            <span aria-hidden="true">{initials(person.name)}</span>
            <span className="sr-only">{person.name}</span>
          </AvatarFallback>
        </Avatar>
      ))}
      {rest > 0 && (
        <AvatarGroupCount>
          <bdi dir="ltr" aria-hidden="true">
            {`+${formatNumber(rest, locale)}`}
          </bdi>
          <span className="sr-only">{plural(rest, l.more, locale)}</span>
        </AvatarGroupCount>
      )}
    </AvatarGroup>
  )
}

export { AvatarStack, avatarStackLabelsAr }
export type { AvatarStackLabels, AvatarStackPerson }
