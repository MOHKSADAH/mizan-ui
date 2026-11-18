"use client"

import type { Lang } from "@/registry/lib/format"
import { TagsInput, tagsInputLabelsAr, type TagsInputProps } from "@/registry/ui/tags-input"

// The labels hold plural functions, which cannot be passed from a Server Component.
export function TagsInputDemo({ lang, ...props }: TagsInputProps & { lang: Lang }) {
  return <TagsInput labels={lang === "ar" ? tagsInputLabelsAr : undefined} {...props} />
}
