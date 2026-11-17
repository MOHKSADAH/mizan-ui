"use client"

import * as React from "react"
import { WarningCircleIcon } from "@phosphor-icons/react"
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js"
import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { arabicIncludes, normalizeArabic } from "@/registry/lib/gulf/arabic-normalize"
import { Button } from "@/registry/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/registry/ui/combobox"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"

type PhoneInputLabels = {
  country: string
  searchCountry: string
  noCountry: string
  invalid: string
}

const phoneInputLabels: PhoneInputLabels = {
  country: "Country",
  searchCountry: "Search countries",
  noCountry: "No country found.",
  invalid: "Enter a valid phone number for the selected country.",
}

const phoneInputLabelsAr: PhoneInputLabels = {
  country: "الدولة",
  searchCountry: "ابحث عن دولة",
  noCountry: "لا توجد دولة مطابقة.",
  invalid: "أدخل رقماً صحيحاً للدولة المحددة.",
}

const GCC: CountryCode[] = ["SA", "AE", "KW", "QA", "BH", "OM"]

type Country = { code: CountryCode; dial: string; name: string }

function listCountries(lang: Lang): Country[] {
  const names = new Intl.DisplayNames(lang, { type: "region" })
  const all = getCountries().map((code) => ({
    code,
    dial: `+${getCountryCallingCode(code)}`,
    name: names.of(code) ?? code,
  }))
  const gcc = GCC.map((code) => all.find((c) => c.code === code)!)
  const rest = all.filter((c) => !GCC.includes(c.code)).sort((a, b) => a.name.localeCompare(b.name, lang))
  return [...gcc, ...rest]
}

type PhoneInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "defaultValue" | "onChange" | "type" | "children"
> & {
  defaultValue?: string
  defaultCountry?: CountryCode
  lang?: Lang
  label?: React.ReactNode
  onValueChange?: (e164: string | undefined, valid: boolean) => void
  labels?: Partial<PhoneInputLabels>
}

// Uncontrolled: `defaultValue` is E.164. onValueChange reports E.164 once the digits parse, with a validity flag.
function PhoneInput({
  defaultValue,
  defaultCountry = "SA",
  lang = "en",
  label,
  onValueChange,
  labels,
  className,
  id,
  onBlur,
  ...props
}: PhoneInputProps) {
  const text = { ...phoneInputLabels, ...labels }
  const countries = React.useMemo(() => listCountries(lang), [lang])
  const initial = defaultValue ? parsePhoneNumberFromString(defaultValue) : undefined
  const [code, setCode] = React.useState<CountryCode>(initial?.country ?? defaultCountry)
  const [digits, setDigits] = React.useState(initial?.formatNational().replace(/\D/g, "") ?? "")
  const [touched, setTouched] = React.useState(false)
  const autoId = React.useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`
  const country = countries.find((c) => c.code === code)!
  const phone = parsePhoneNumberFromString(digits, code)
  const invalid = touched && digits !== "" && !phone?.isValid()

  const emit = (nextCode: CountryCode, nextDigits: string) => {
    const next = parsePhoneNumberFromString(nextDigits, nextCode)
    onValueChange?.(next?.number, !!next?.isValid())
  }

  return (
    <div data-slot="phone-input" className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          <span className="sr-only">
            <bdi dir="ltr">{country.dial}</bdi>
          </span>
        </Label>
      )}
      <div className="flex w-full gap-2">
        <Combobox
          items={countries}
          value={country}
          onValueChange={(next) => {
            if (!next) return
            setCode(next.code)
            emit(next.code, digits)
          }}
          itemToStringLabel={(c) => c.name}
          itemToStringValue={(c) => c.code}
          isItemEqualToValue={(a, b) => a.code === b.code}
          filter={(c, query) => arabicIncludes(`${c.name} ${c.dial}`, query)}
        >
          <ComboboxTrigger
            render={<Button variant="outline" />}
            aria-label={`${text.country}: ${country.name}`}
            className="shrink-0 tabular-nums"
          >
            <bdi dir="ltr">{country.dial}</bdi>
          </ComboboxTrigger>
          <ComboboxContent className="w-72">
            <ComboboxInput showTrigger={false} aria-label={text.searchCountry} placeholder={text.searchCountry} />
            <ComboboxEmpty>{text.noCountry}</ComboboxEmpty>
            <ComboboxList>
              {(c: Country) => (
                <ComboboxItem key={c.code} value={c}>
                  <span>{c.name}</span>
                  <bdi dir="ltr" className="ms-auto text-muted-foreground tabular-nums">
                    {c.dial}
                  </bdi>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <Input
          id={inputId}
          type="tel"
          dir="ltr"
          inputMode="tel"
          autoComplete="tel-national"
          value={new AsYouType(code).input(digits)}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? messageId : undefined}
          className="flex-1 tabular-nums rtl:text-end"
          onChange={(e) => {
            const next = normalizeArabic(e.target.value).replace(/\D/g, "").slice(0, 15)
            setDigits(next)
            emit(code, next)
          }}
          onBlur={(e) => {
            setTouched(true)
            onBlur?.(e)
          }}
          {...props}
        />
      </div>
      <p id={messageId} aria-live="polite" className="flex items-center gap-1.5 text-sm text-destructive empty:hidden">
        {invalid && (
          <>
            <WarningCircleIcon weight="fill" aria-hidden="true" className="size-4 shrink-0" />
            {text.invalid}
          </>
        )}
      </p>
    </div>
  )
}

export { PhoneInput, phoneInputLabels, phoneInputLabelsAr }
export type { PhoneInputLabels, PhoneInputProps }
