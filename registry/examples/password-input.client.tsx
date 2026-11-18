"use client"

import type { Lang } from "@/registry/lib/format"
import { PasswordInput, passwordInputLabelsAr, type PasswordInputProps } from "@/registry/ui/password-input"

// The labels hold plural functions, which cannot be passed from a Server Component.
export function PasswordInputDemo({ lang, ...props }: PasswordInputProps & { lang: Lang }) {
  return <PasswordInput labels={lang === "ar" ? passwordInputLabelsAr : undefined} {...props} />
}
