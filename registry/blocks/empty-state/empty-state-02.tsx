import * as React from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

export type EmptyState02Labels = {
  title: string
  description: string
  tipsTitle: string
  tipSpelling: string
  tipFilters: string
  tipGeneral: string
  clear: string
}

export const labelsEn: EmptyState02Labels = {
  title: "No results for “{query}”",
  description: "We could not find anything that matches your search and filters.",
  tipsTitle: "Try this",
  tipSpelling: "Check the spelling.",
  tipFilters: "Remove some filters.",
  tipGeneral: "Use a more general word.",
  clear: "Clear filters",
}

export const labelsAr: EmptyState02Labels = {
  title: "لا توجد نتائج لـ «{query}»",
  description: "لم نعثر على ما يطابق بحثك والفلاتر المحددة.",
  tipsTitle: "جرّب ما يلي",
  tipSpelling: "تأكد من كتابة الكلمة بشكل صحيح.",
  tipFilters: "أزل بعض الفلاتر.",
  tipGeneral: "استخدم كلمة أعم.",
  clear: "مسح الفلاتر",
}

export type EmptyState02Props = {
  lang?: Lang
  labels?: Partial<EmptyState02Labels>
  className?: string
  query: string
  clearHref?: string
  onClear?: () => void
}

// FSI and PDI keep a query in the other script from reordering the sentence around it.
const isolate = (text: string) => `⁨${text}⁩`

export function EmptyState02({ lang = "en", labels, className, query, clearHref, onClear }: EmptyState02Props) {
  const t = { ...labelsEn, ...labels }
  return (
    <Container size="narrow" dir={lang === "ar" ? "rtl" : "ltr"} className={cn("py-6 md:py-8", className)}>
      <Card className="py-16">
        <Empty className="p-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MagnifyingGlassIcon aria-hidden="true" weight="regular" />
            </EmptyMedia>
            <EmptyTitle role="heading" aria-level={2} className="text-base">
              {t.title.replace("{query}", isolate(query))}
            </EmptyTitle>
            <EmptyDescription>{t.description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="w-full text-start">
              <p className="mb-1 text-sm font-medium">{t.tipsTitle}</p>
              <ul className="ms-5 list-disc text-sm text-muted-foreground">
                <li>{t.tipSpelling}</li>
                <li>{t.tipFilters}</li>
                <li>{t.tipGeneral}</li>
              </ul>
            </div>
            {clearHref ? (
              <Button nativeButton={false} render={<a href={clearHref} />}>
                {t.clear}
              </Button>
            ) : (
              <Button onClick={onClear}>{t.clear}</Button>
            )}
          </EmptyContent>
        </Empty>
      </Card>
    </Container>
  )
}

export default EmptyState02

export const demo: { en: EmptyState02Props; ar: EmptyState02Props } = {
  en: { lang: "en", labels: labelsEn, query: "leather wallet" },
  ar: { lang: "ar", labels: labelsAr, query: "محفظة جلدية" },
}
