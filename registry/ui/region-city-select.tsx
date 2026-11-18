"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { arabicIncludes } from "@/registry/lib/gulf/arabic-normalize"
import { saudiRegions } from "@/registry/lib/gulf/saudi-regions"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/registry/ui/combobox"
import { Field, FieldLabel } from "@/registry/ui/field"

type RegionCitySelectLabels = {
  region: string
  city: string
  selectRegion: string
  selectCity: string
  noResults: string
}

const regionCitySelectLabels: RegionCitySelectLabels = {
  region: "Region",
  city: "City",
  selectRegion: "Select a region",
  selectCity: "Select a city",
  noResults: "No results found.",
}

const regionCitySelectLabelsAr: RegionCitySelectLabels = {
  region: "المنطقة",
  city: "المدينة",
  selectRegion: "اختر المنطقة",
  selectCity: "اختر المدينة",
  noResults: "لا توجد نتائج.",
}

// `region` is an ISO 3166-2:SA code (SA-01). `city` is the English city name, which is unique inside a region.
type RegionCityValue = { region: string | null; city: string | null }

type Option = { value: string; name: string; search: string }

const option = (value: string, nameEn: string, nameAr: string, lang: Lang): Option => ({
  value,
  name: lang === "ar" ? nameAr : nameEn,
  search: `${nameEn} ${nameAr}`,
})

type RegionCitySelectProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  lang?: Lang
  value?: RegionCityValue
  defaultValue?: RegionCityValue
  onValueChange?: (value: RegionCityValue) => void
  labels?: Partial<RegionCitySelectLabels>
}

function RegionCitySelect({
  lang = "en",
  value: valueProp,
  defaultValue = { region: null, city: null },
  onValueChange,
  labels,
  className,
  ...props
}: RegionCitySelectProps) {
  const text = { ...regionCitySelectLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue)
  const value = valueProp ?? inner
  const id = React.useId()

  const regions = React.useMemo(() => saudiRegions.map((r) => option(r.code, r.nameEn, r.nameAr, lang)), [lang])
  const region = saudiRegions.find((r) => r.code === value.region)
  const cities = React.useMemo(
    () => region?.cities.map((c) => option(c.nameEn, c.nameEn, c.nameAr, lang)) ?? [],
    [region, lang],
  )

  const change = (next: RegionCityValue) => {
    setInner(next)
    onValueChange?.(next)
  }

  const filter = (item: Option, query: string) => arabicIncludes(item.search, query, { taMarbuta: true })
  const toLabel = (item: Option) => item.name
  const same = (a: Option, b: Option) => a.value === b.value

  return (
    <div data-slot="region-city-select" className={cn("grid gap-4 sm:grid-cols-2", className)} {...props}>
      <Field>
        <FieldLabel htmlFor={`${id}-region`}>{text.region}</FieldLabel>
        <Combobox
          items={regions}
          value={regions.find((r) => r.value === value.region) ?? null}
          onValueChange={(next) => change({ region: next?.value ?? null, city: null })}
          filter={filter}
          itemToStringLabel={toLabel}
          itemToStringValue={(r) => r.value}
          isItemEqualToValue={same}
        >
          <ComboboxInput id={`${id}-region`} placeholder={text.selectRegion} showClear />
          <ComboboxContent>
            <ComboboxEmpty>{text.noResults}</ComboboxEmpty>
            <ComboboxList>
              {(r: Option) => (
                <ComboboxItem key={r.value} value={r}>
                  {r.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${id}-city`}>{text.city}</FieldLabel>
        <Combobox
          items={cities}
          value={cities.find((c) => c.value === value.city) ?? null}
          onValueChange={(next) => change({ region: value.region, city: next?.value ?? null })}
          disabled={!region}
          filter={filter}
          itemToStringLabel={toLabel}
          itemToStringValue={(c) => c.value}
          isItemEqualToValue={same}
        >
          <ComboboxInput id={`${id}-city`} placeholder={text.selectCity} showClear disabled={!region} />
          <ComboboxContent>
            <ComboboxEmpty>{text.noResults}</ComboboxEmpty>
            <ComboboxList>
              {(c: Option) => (
                <ComboboxItem key={c.value} value={c}>
                  {c.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  )
}

export { RegionCitySelect, regionCitySelectLabels, regionCitySelectLabelsAr }
export type { RegionCityValue, RegionCitySelectLabels, RegionCitySelectProps }
