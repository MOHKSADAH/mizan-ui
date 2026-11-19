"use client"

import * as React from "react"
import { WarningCircleIcon } from "@phosphor-icons/react"

import { cn } from "@/registry/lib/utils"
import { luhn } from "@/registry/lib/gulf/validators"
import { toAsciiDigits } from "@/registry/lib/mask"
import { InputGroup, InputGroupAddon } from "@/registry/ui/input-group"
import { InputMask } from "@/registry/ui/input-mask"
import { Label } from "@/registry/ui/label"

type CardBrand = "visa" | "mastercard" | "amex" | "mada"

type CardValue = {
  // Digits only, no spaces.
  number: string
  // MMYY, digits only.
  expiry: string
  cvc: string
}

type CardInputState = {
  brand?: CardBrand
  // True when the number, expiry and CVC all pass.
  valid: boolean
}

type CardInputLabels = {
  number: string
  expiry: string
  cvc: string
  expiryFormat: string
  numberInvalid: string
  expiryInvalid: string
  expired: string
  cvcInvalid: string
  brands: Record<CardBrand, string>
}

const defaultLabels: CardInputLabels = {
  number: "Card number",
  expiry: "Expiry date",
  cvc: "Security code",
  expiryFormat: "MM/YY",
  numberInvalid: "Check the card number.",
  expiryInvalid: "Enter the expiry date as MM/YY.",
  expired: "This card has expired.",
  cvcInvalid: "Check the security code.",
  brands: { visa: "Visa", mastercard: "Mastercard", amex: "American Express", mada: "mada" },
}

const cardInputLabelsAr: CardInputLabels = {
  number: "رقم البطاقة",
  expiry: "تاريخ الانتهاء",
  cvc: "رمز الأمان",
  expiryFormat: "MM/YY",
  numberInvalid: "تحقق من رقم البطاقة.",
  expiryInvalid: "أدخل تاريخ الانتهاء بصيغة MM/YY.",
  expired: "انتهت صلاحية هذه البطاقة.",
  cvcInvalid: "تحقق من رمز الأمان.",
  brands: { visa: "فيزا", mastercard: "ماستركارد", amex: "أمريكان إكسبريس", mada: "مدى" },
}

const digitsOf = (text: string) => toAsciiDigits(text).replace(/\D/g, "")

// 51-55 and 2221-2720.
const MASTERCARD = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)/

// mada BINs overlap the Visa and Mastercard ranges and the list changes, so Mizan ships none.
// Pass the current prefixes from your acquirer in `madaBins`: a card that starts with one is mada.
function detectCardBrand(number: string, madaBins: readonly string[] = []): CardBrand | undefined {
  const digits = digitsOf(number)
  if (madaBins.some((bin) => bin !== "" && digits.startsWith(bin))) return "mada"
  if (/^3[47]/.test(digits)) return "amex"
  if (digits.startsWith("4")) return "visa"
  if (MASTERCARD.test(digits)) return "mastercard"
  return undefined
}

// Unknown brands (Maestro, UnionPay, Discover) pass the Luhn check with 13 to 19 digits.
function cardNumberLengths(brand?: CardBrand) {
  if (brand === "amex") return [15]
  if (brand === "mastercard" || brand === "mada") return [16]
  if (brand === "visa") return [13, 16, 19]
  return [13, 14, 15, 16, 17, 18, 19]
}

const cardCvcLength = (brand?: CardBrand) => (brand === "amex" ? 4 : 3)

function isValidCardNumber(number: string, brand = detectCardBrand(number)) {
  const digits = digitsOf(number)
  return cardNumberLengths(brand).includes(digits.length) && luhn(digits)
}

type ExpiryStatus = "ok" | "incomplete" | "invalid" | "expired"

// A card is valid through the end of its expiry month.
function cardExpiryStatus(expiry: string, now = new Date()): ExpiryStatus {
  const digits = digitsOf(expiry)
  if (digits.length < 4) return "incomplete"
  const month = Number(digits.slice(0, 2))
  if (month < 1 || month > 12) return "invalid"
  const year = 2000 + Number(digits.slice(2, 4))
  return year * 12 + month - 1 < now.getFullYear() * 12 + now.getMonth() ? "expired" : "ok"
}

const numberMask = (brand?: CardBrand) =>
  brand === "amex"
    ? "9999 999999 99999"
    : brand === "mastercard" || brand === "mada"
      ? "9999 9999 9999 9999"
      : "9999 9999 9999 9999 999"

// The mask already draws the field edge on the group, so the input itself is bare.
const bare =
  "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 rtl:text-end dark:bg-transparent"
const groupFocus = "has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-3 has-[input:focus-visible]:ring-ring/50"

type CardInputProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange" | "children"> & {
  value?: CardValue
  defaultValue?: Partial<CardValue>
  onValueChange?: (value: CardValue, state: CardInputState) => void
  // Current mada BIN prefixes. Without them a mada card reads as Visa or Mastercard.
  madaBins?: readonly string[]
  // Your own brand logos. Mizan ships none, they are trademarks. The brand name always shows as text.
  brandIcons?: Partial<Record<CardBrand, React.ReactNode>>
  // The date the expiry is checked against. Defaults to today.
  now?: Date
  disabled?: boolean
  labels?: Partial<Omit<CardInputLabels, "brands"> & { brands: Partial<CardInputLabels["brands"]> }>
}

function Part({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <p id={`${id}-error`} aria-live="polite" className="flex items-center gap-1.5 text-sm text-destructive empty:hidden">
        {error && (
          <>
            <WarningCircleIcon weight="fill" aria-hidden="true" className="size-4 shrink-0" />
            {error}
          </>
        )}
      </p>
    </div>
  )
}

// Card number, expiry and CVC as three LTR fields. A passing value is well-formed, not proof the card works.
function CardInput({
  value: valueProp,
  defaultValue,
  onValueChange,
  madaBins,
  brandIcons,
  now,
  disabled,
  labels,
  className,
  ...props
}: CardInputProps) {
  const t = { ...defaultLabels, ...labels, brands: { ...defaultLabels.brands, ...labels?.brands } }
  const id = React.useId()
  const [inner, setInner] = React.useState<CardValue>({ number: "", expiry: "", cvc: "", ...defaultValue })
  const [touched, setTouched] = React.useState({ number: false, expiry: false, cvc: false })
  const value = valueProp ?? inner
  const brand = detectCardBrand(value.number, madaBins)
  const cvcLength = cardCvcLength(brand)
  const expiry = cardExpiryStatus(value.expiry, now)
  const ok = {
    number: isValidCardNumber(value.number, brand),
    expiry: expiry === "ok",
    cvc: digitsOf(value.cvc).length === cvcLength,
  }
  const error = {
    number: touched.number && value.number !== "" && !ok.number ? t.numberInvalid : undefined,
    expiry: touched.expiry && value.expiry !== "" && !ok.expiry ? (expiry === "expired" ? t.expired : t.expiryInvalid) : undefined,
    cvc: touched.cvc && value.cvc !== "" && !ok.cvc ? t.cvcInvalid : undefined,
  }
  const ids = { number: `${id}-number`, expiry: `${id}-expiry`, cvc: `${id}-cvc` }
  const brandId = `${id}-brand`

  function change(patch: Partial<CardValue>) {
    const next = { ...value, ...patch }
    const nextBrand = detectCardBrand(next.number, madaBins)
    // Amex takes 4 digits and the rest take 3, so a longer code is cut when the brand changes.
    next.cvc = next.cvc.slice(0, cardCvcLength(nextBrand))
    setInner(next)
    onValueChange?.(next, {
      brand: nextBrand,
      valid: isValidCardNumber(next.number, nextBrand) && cardExpiryStatus(next.expiry, now) === "ok" && next.cvc.length === cardCvcLength(nextBrand),
    })
  }

  const field = (name: keyof CardValue) => ({
    id: ids[name],
    disabled,
    "aria-invalid": error[name] ? true : undefined,
    onBlur: () => setTouched((previous) => ({ ...previous, [name]: true })),
  })

  return (
    <div data-slot="card-input" className={cn("flex w-full flex-col gap-4", className)} {...props}>
      <Part id={ids.number} label={t.number} error={error.number}>
        <InputGroup className={groupFocus}>
          <InputMask
            {...field("number")}
            mask={numberMask(brand)}
            value={value.number}
            autoComplete="cc-number"
            placeholder="1234 1234 1234 1234"
            aria-describedby={[brand && brandId, error.number && `${ids.number}-error`].filter(Boolean).join(" ") || undefined}
            className={bare}
            onValueChange={(raw) => change({ number: raw })}
          />
          {brand && (
            <InputGroupAddon align="inline-end">
              <span aria-hidden="true" className="flex shrink-0 items-center">
                {brandIcons?.[brand]}
              </span>
              <span id={brandId}>{t.brands[brand]}</span>
            </InputGroupAddon>
          )}
        </InputGroup>
      </Part>
      <div className="grid grid-cols-2 gap-3">
        <Part id={ids.expiry} label={t.expiry} error={error.expiry}>
          <InputMask
            {...field("expiry")}
            mask="99/99"
            value={value.expiry}
            autoComplete="cc-exp"
            placeholder={t.expiryFormat}
            aria-describedby={error.expiry ? `${ids.expiry}-error` : undefined}
            className="rtl:text-end"
            onValueChange={(raw) => change({ expiry: raw })}
          />
        </Part>
        <Part id={ids.cvc} label={t.cvc} error={error.cvc}>
          <InputMask
            {...field("cvc")}
            mask={"9".repeat(cvcLength)}
            value={value.cvc}
            autoComplete="cc-csc"
            placeholder={"•".repeat(cvcLength)}
            aria-describedby={error.cvc ? `${ids.cvc}-error` : undefined}
            className="rtl:text-end"
            onValueChange={(raw) => change({ cvc: raw })}
          />
        </Part>
      </div>
    </div>
  )
}

export {
  CardInput,
  cardCvcLength,
  cardExpiryStatus,
  cardInputLabelsAr,
  cardNumberLengths,
  detectCardBrand,
  isValidCardNumber,
}
export type { CardBrand, CardInputLabels, CardInputProps, CardInputState, CardValue, ExpiryStatus }
