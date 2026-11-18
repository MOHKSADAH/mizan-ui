"use client"

import { normalizeArabic } from "@/registry/lib/gulf/arabic-normalize"
import { isSaudiVatFormat } from "@/registry/lib/gulf/validators"
import { GroupedInput, type GroupedInputLabels, type GroupedInputProps } from "@/registry/ui/iban-input"

type VatInputLabels = GroupedInputLabels

const vatInputLabels: VatInputLabels = {
  invalid: "Enter a valid 15-digit VAT number that starts and ends with 3.",
  copy: "Copy VAT number",
  copied: "VAT number copied",
}

const vatInputLabelsAr: VatInputLabels = {
  invalid: "أدخل رقماً ضريبياً صحيحاً من 15 رقماً يبدأ وينتهي بالرقم 3.",
  copy: "نسخ الرقم الضريبي",
  copied: "تم نسخ الرقم الضريبي",
}

type VatInputProps = Omit<GroupedInputProps, "clean" | "validate" | "labels"> & {
  labels?: Partial<VatInputLabels>
}

// A passing value is well-formed. It does not prove the VAT registration exists.
function VatInput({ labels, ...props }: VatInputProps) {
  return (
    <GroupedInput
      inputMode="numeric"
      clean={(text) => normalizeArabic(text).replace(/\D/g, "").slice(0, 15)}
      validate={isSaudiVatFormat}
      labels={{ ...vatInputLabels, ...labels }}
      {...props}
    />
  )
}

export { VatInput, vatInputLabels, vatInputLabelsAr }
export type { VatInputLabels, VatInputProps }
