"use client"

import type { Lang } from "@/registry/lib/format"
import { FileUpload, fileUploadLabelsAr, type FileUploadProps } from "@/registry/ui/file-upload"

// The labels hold plural functions, which cannot be passed from a Server Component.
export function FileUploadDemo({ lang, ...props }: FileUploadProps & { lang: Lang }) {
  return <FileUpload labels={lang === "ar" ? fileUploadLabelsAr : undefined} {...props} />
}
