"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { XIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { arabicIncludes } from "@/registry/lib/gulf/arabic-normalize"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/registry/ui/combobox"

type MultiSelectOption = { value: string; label: string; group?: string }

type MultiSelectLabels = { empty: string; remove: string }

const multiSelectLabels: MultiSelectLabels = { empty: "No results found", remove: "Remove {label}" }

const multiSelectLabelsAr: MultiSelectLabels = { empty: "لا توجد نتائج", remove: "إزالة {label}" }

type MultiSelectProps = {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  name?: string
  labels?: Partial<MultiSelectLabels>
  className?: string
  "aria-label"?: string
}

// Ungrouped options keep their place in an unlabeled group; groups keep first-seen order.
function groupOptions(options: MultiSelectOption[]) {
  const groups = new Map<string, MultiSelectOption[]>()
  for (const o of options) groups.set(o.group ?? "", [...(groups.get(o.group ?? "") ?? []), o])
  return [...groups].map(([value, items]) => ({ value, items }))
}

function MultiSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  name,
  labels,
  className,
  "aria-label": ariaLabel,
}: MultiSelectProps) {
  const l = { ...multiSelectLabels, ...labels }
  const anchor = useComboboxAnchor()
  const grouped = options.some((o) => o.group)
  const byValue = (values?: string[]) =>
    values?.flatMap((v) => options.find((o) => o.value === v) ?? [])
  const items = grouped ? groupOptions(options) : options

  return (
    <Combobox
      multiple
      autoHighlight
      items={items}
      filter={(item: MultiSelectOption, query: string) => arabicIncludes(item.label, query, { taMarbuta: true, hamzaOnWaw: true, hamzaOnYa: true })}
      isItemEqualToValue={(a: MultiSelectOption, b: MultiSelectOption) => a.value === b.value}
      value={byValue(value)}
      defaultValue={byValue(defaultValue)}
      onValueChange={(next: MultiSelectOption[]) => onValueChange?.(next.map((o) => o.value))}
      disabled={disabled}
      name={name}
    >
      <ComboboxChips ref={anchor} data-slot="multi-select" className={cn("w-full", className)}>
        <ComboboxValue>
          {(selected: MultiSelectOption[]) => (
            <>
              {selected.map((o) => (
                <ComboboxChip key={o.value} showRemove={false} className="ps-1.5 pe-0">
                  <bdi dir="auto">{o.label}</bdi>
                  <ComboboxPrimitive.ChipRemove
                    aria-label={l.remove.replace("{label}", o.label)}
                    className="inline-flex size-6 items-center justify-center rounded-sm opacity-60 outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <XIcon aria-hidden="true" className="size-3" />
                  </ComboboxPrimitive.ChipRemove>
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                aria-label={ariaLabel}
                placeholder={selected.length ? undefined : placeholder}
              />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{l.empty}</ComboboxEmpty>
        <ComboboxList>
          {grouped
            ? (group: { value: string; items: MultiSelectOption[] }) => (
                <ComboboxGroup key={group.value} items={group.items}>
                  {group.value && <ComboboxLabel>{group.value}</ComboboxLabel>}
                  <ComboboxCollection>
                    {(o: MultiSelectOption) => (
                      <ComboboxItem key={o.value} value={o}>
                        {o.label}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
              )
            : (o: MultiSelectOption) => (
                <ComboboxItem key={o.value} value={o}>
                  {o.label}
                </ComboboxItem>
              )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export { MultiSelect, multiSelectLabels, multiSelectLabelsAr, groupOptions }
export type { MultiSelectLabels, MultiSelectOption, MultiSelectProps }
