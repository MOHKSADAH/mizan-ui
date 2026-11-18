"use client"

import * as React from "react"
import { WarningCircleIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { normalizeArabic } from "@/registry/lib/gulf/arabic-normalize"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/registry/ui/field"
import { Input } from "@/registry/ui/input"
import {
  RegionCitySelect,
  regionCitySelectLabels,
  regionCitySelectLabelsAr,
  type RegionCitySelectLabels,
} from "@/registry/ui/region-city-select"

type SaudiAddressFormLabels = RegionCitySelectLabels & {
  district: string
  street: string
  buildingNumber: string
  postalCode: string
  additionalNumber: string
  shortAddress: string
  buildingNumberInvalid: string
  postalCodeInvalid: string
  additionalNumberInvalid: string
  shortAddressInvalid: string
  shortAddressHint: string
}

const saudiAddressFormLabels: SaudiAddressFormLabels = {
  ...regionCitySelectLabels,
  district: "District",
  street: "Street",
  buildingNumber: "Building number",
  postalCode: "Postal code",
  additionalNumber: "Additional number",
  shortAddress: "National short address",
  buildingNumberInvalid: "Enter a 4-digit building number.",
  postalCodeInvalid: "Enter a 5-digit postal code.",
  additionalNumberInvalid: "Enter a 4-digit additional number.",
  shortAddressInvalid: "Enter 4 letters followed by 4 digits.",
  shortAddressHint: "4 letters and 4 digits, for example RRRD2929. Format check only.",
}

const saudiAddressFormLabelsAr: SaudiAddressFormLabels = {
  ...regionCitySelectLabelsAr,
  district: "الحي",
  street: "الشارع",
  buildingNumber: "رقم المبنى",
  postalCode: "الرمز البريدي",
  additionalNumber: "الرقم الإضافي",
  shortAddress: "العنوان الوطني المختصر",
  buildingNumberInvalid: "أدخل رقم مبنى من 4 أرقام.",
  postalCodeInvalid: "أدخل رمزاً بريدياً من 5 أرقام.",
  additionalNumberInvalid: "أدخل رقماً إضافياً من 4 أرقام.",
  shortAddressInvalid: "أدخل 4 أحرف يليها 4 أرقام.",
  shortAddressHint: "4 أحرف و4 أرقام، مثل RRRD2929. تحقق من الصيغة فقط.",
}

type SaudiAddress = {
  region: string | null
  city: string | null
  district: string
  street: string
  buildingNumber: string
  postalCode: string
  additionalNumber: string
  shortAddress: string
}

const emptyAddress: SaudiAddress = {
  region: null,
  city: null,
  district: "",
  street: "",
  buildingNumber: "",
  postalCode: "",
  additionalNumber: "",
  shortAddress: "",
}

const digits = (max: number) => (text: string) => normalizeArabic(text).replace(/\D/g, "").slice(0, max)

type CheckedKey = "buildingNumber" | "postalCode" | "additionalNumber" | "shortAddress"

const checked: Record<CheckedKey, { clean: (text: string) => string; test: RegExp; numeric: boolean }> = {
  buildingNumber: { clean: digits(4), test: /^\d{4}$/, numeric: true },
  postalCode: { clean: digits(5), test: /^\d{5}$/, numeric: true },
  additionalNumber: { clean: digits(4), test: /^\d{4}$/, numeric: true },
  shortAddress: {
    clean: (text) => normalizeArabic(text).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8),
    test: /^[A-Z]{4}\d{4}$/,
    numeric: false,
  },
}

const isAddressValid = (a: SaudiAddress) =>
  (Object.keys(checked) as CheckedKey[]).every((key) => a[key] === "" || checked[key].test.test(a[key]))

type SaudiAddressFormProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  lang?: Lang
  value?: SaudiAddress
  defaultValue?: Partial<SaudiAddress>
  onValueChange?: (address: SaudiAddress, valid: boolean) => void
  labels?: Partial<SaudiAddressFormLabels>
}

// `valid` is true when every filled number field passes its format. Which fields are required is left to the form.
// The short address is a format check only: it does not look the address up.
function SaudiAddressForm({
  lang = "en",
  value: valueProp,
  defaultValue,
  onValueChange,
  labels,
  className,
  ...props
}: SaudiAddressFormProps) {
  const text = { ...saudiAddressFormLabels, ...labels }
  const [inner, setInner] = React.useState<SaudiAddress>({ ...emptyAddress, ...defaultValue })
  const [touched, setTouched] = React.useState<Partial<Record<CheckedKey, boolean>>>({})
  const value = valueProp ?? inner
  const id = React.useId()

  const change = (patch: Partial<SaudiAddress>) => {
    const next = { ...value, ...patch }
    setInner(next)
    onValueChange?.(next, isAddressValid(next))
  }

  const checkedField = (key: CheckedKey) => {
    const { clean, test, numeric } = checked[key]
    const invalid = !!touched[key] && value[key] !== "" && !test.test(value[key])
    return (
      <Field data-invalid={invalid || undefined}>
        <FieldLabel htmlFor={`${id}-${key}`}>{text[key]}</FieldLabel>
        <Input
          id={`${id}-${key}`}
          dir="ltr"
          autoComplete={key === "postalCode" ? "postal-code" : "off"}
          inputMode={numeric ? "numeric" : "text"}
          spellCheck={false}
          value={value[key]}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid || key === "shortAddress" ? `${id}-${key}-message` : undefined}
          className="tabular-nums rtl:text-end"
          onChange={(e) => change({ [key]: clean(e.target.value) })}
          onBlur={() => setTouched((t) => ({ ...t, [key]: true }))}
        />
        <div id={`${id}-${key}-message`} className="flex flex-col gap-1.5">
          {key === "shortAddress" && <FieldDescription>{text.shortAddressHint}</FieldDescription>}
          <FieldError>
            {invalid && (
              <span className="flex items-center gap-1.5">
                <WarningCircleIcon weight="fill" aria-hidden="true" className="size-4 shrink-0" />
                {text[`${key}Invalid`]}
              </span>
            )}
          </FieldError>
        </div>
      </Field>
    )
  }

  return (
    <div data-slot="saudi-address-form" className={cn("w-full", className)} {...props}>
      <FieldGroup>
        <RegionCitySelect
          lang={lang}
          labels={text}
          value={{ region: value.region, city: value.city }}
          onValueChange={(next) => change(next)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor={`${id}-district`}>{text.district}</FieldLabel>
            <Input
              id={`${id}-district`}
              value={value.district}
              onChange={(e) => change({ district: e.target.value })}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${id}-street`}>{text.street}</FieldLabel>
            <Input
              id={`${id}-street`}
              autoComplete="address-line1"
              value={value.street}
              onChange={(e) => change({ street: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {checkedField("buildingNumber")}
          {checkedField("postalCode")}
          {checkedField("additionalNumber")}
        </div>
        <div className="sm:max-w-xs">{checkedField("shortAddress")}</div>
      </FieldGroup>
    </div>
  )
}

export { SaudiAddressForm, saudiAddressFormLabels, saudiAddressFormLabelsAr }
export type { SaudiAddress, SaudiAddressFormLabels, SaudiAddressFormProps }
