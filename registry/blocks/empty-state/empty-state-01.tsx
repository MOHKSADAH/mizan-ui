import * as React from "react"
import type { Icon } from "@phosphor-icons/react"
import { PackageIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import type { Lang } from "@/registry/lib/format"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Container } from "@/registry/ui/container"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

export type EmptyState01Labels = {
  title: string
  description: string
  action: string
}

export const labelsEn: EmptyState01Labels = {
  title: "No products yet",
  description: "Add your first product to start selling in your store.",
  action: "Add product",
}

export const labelsAr: EmptyState01Labels = {
  title: "لا توجد منتجات بعد",
  description: "أضف أول منتج لك لتبدأ البيع في متجرك.",
  action: "إضافة منتج",
}

export type EmptyState01Props = {
  lang?: Lang
  labels?: Partial<EmptyState01Labels>
  className?: string
  icon?: Icon
  actionHref?: string
  onAction?: () => void
}

export function EmptyState01({
  lang = "en",
  labels,
  className,
  icon: IconComponent = PackageIcon,
  actionHref,
  onAction,
}: EmptyState01Props) {
  const t = { ...labelsEn, ...labels }
  return (
    <Container size="narrow" dir={lang === "ar" ? "rtl" : "ltr"} className={cn("py-6 md:py-8", className)}>
      <Card className="py-16">
        <Empty className="p-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconComponent aria-hidden="true" weight="regular" />
            </EmptyMedia>
            <EmptyTitle role="heading" aria-level={2} className="text-base">
              {t.title}
            </EmptyTitle>
            <EmptyDescription>{t.description}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {actionHref ? (
              <Button nativeButton={false} render={<a href={actionHref} />}>
                {t.action}
              </Button>
            ) : (
              <Button onClick={onAction}>{t.action}</Button>
            )}
          </EmptyContent>
        </Empty>
      </Card>
    </Container>
  )
}

export default EmptyState01

export const demo: { en: EmptyState01Props; ar: EmptyState01Props } = {
  en: { lang: "en", labels: labelsEn },
  ar: { lang: "ar", labels: labelsAr },
}
