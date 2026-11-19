"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import { plural, type Digits, type Lang, type PluralForms } from "@/registry/lib/format"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { AvatarStack, avatarStackLabelsAr, type AvatarStackLabels } from "@/registry/ui/avatar-group"
import { Badge } from "@/registry/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

type AvatarStackListMember = {
  id: string
  name: string
  src?: string
  // The role label shown as a badge, already translated.
  role: string
}

type AvatarStackListLabels = AvatarStackLabels & {
  // The trigger name. {n} is the member count.
  view: PluralForms
  // The list heading. {n} is the member count.
  members: PluralForms
  search: string
  empty: string
}

const defaultLabels: AvatarStackListLabels = {
  people: { one: "{n} person", other: "{n} people" },
  more: { one: "and {n} more", other: "and {n} more" },
  view: { one: "View {n} member", other: "View {n} members" },
  members: { one: "{n} member", other: "{n} members" },
  search: "Search members",
  empty: "No members found.",
}

const avatarStackListLabelsAr: AvatarStackListLabels = {
  ...avatarStackLabelsAr,
  view: {
    zero: "عرض الأعضاء",
    one: "عرض عضو واحد",
    two: "عرض عضوين",
    few: "عرض {n} أعضاء",
    many: "عرض {n} عضوا",
    other: "عرض {n} عضو",
  },
  members: { zero: "لا أعضاء", one: "عضو واحد", two: "عضوان", few: "{n} أعضاء", many: "{n} عضوا", other: "{n} عضو" },
  search: "ابحث عن عضو",
  empty: "لا يوجد أعضاء مطابقون.",
}

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => [...word][0])
    .join("")

type AvatarStackListProps = {
  members: AvatarStackListMember[]
  // Avatars shown on the trigger before the +N counter.
  max?: number
  size?: "sm" | "default" | "lg"
  align?: "start" | "center" | "end"
  onSelect?: (member: AvatarStackListMember) => void
  lang?: Lang
  digits?: Digits
  labels?: Partial<AvatarStackListLabels>
  className?: string
}

// Overlapping avatars on a button. The popover holds a searchable list with a role badge on each row.
function AvatarStackList({
  members,
  max = 4,
  size,
  align = "start",
  onSelect,
  lang = "en",
  digits = "latn",
  labels,
  className,
}: AvatarStackListProps) {
  const l = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  return (
    <Popover>
      <PopoverTrigger
        data-slot="avatar-stack-list"
        aria-label={plural(members.length, l.view, locale)}
        className={cn(
          "inline-flex rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          className
        )}
      >
        <AvatarStack
          aria-hidden="true"
          people={members}
          max={max}
          size={size}
          lang={lang}
          digits={digits}
          labels={l}
        />
      </PopoverTrigger>
      <PopoverContent align={align} className="w-72 gap-0 p-0">
        <Command>
          <CommandInput placeholder={l.search} aria-label={l.search} />
          <CommandList>
            <CommandEmpty>{l.empty}</CommandEmpty>
            <CommandGroup heading={plural(members.length, l.members, locale)}>
              {members.map((member) => (
                <CommandItem
                  key={member.id}
                  value={`${member.name} ${member.role}`}
                  onSelect={() => onSelect?.(member)}
                  className="[&>svg:last-child]:hidden"
                >
                  <Avatar size="sm">
                    {member.src && <AvatarImage src={member.src} alt="" />}
                    <AvatarFallback>{initials(member.name)}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1 truncate">{member.name}</span>
                  <Badge variant="secondary">{member.role}</Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { AvatarStackList, avatarStackListLabelsAr }
export type { AvatarStackListLabels, AvatarStackListMember }
