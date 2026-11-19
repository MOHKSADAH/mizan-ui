import * as React from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr"

import type { Action, BlockBase } from "@/registry/lib/block-types"
import { cn } from "@/registry/lib/utils"
import { Button, buttonVariants } from "@/registry/ui/button"
import { Container } from "@/registry/ui/container"
import { Input } from "@/registry/ui/input"

type Utility01Labels = { search: string; searchPlaceholder: string }

type Utility01Props = Omit<BlockBase, "headingLevel"> & {
  code?: string
  title: string
  description?: string
  primaryAction: Action
  secondaryAction?: Action
  search?: { action: string; name: string }
  mainId?: string
  labels?: Partial<Utility01Labels>
}

const labelsEn: Utility01Labels = { search: "Search", searchPlaceholder: "Search the site" }
const labelsAr: Utility01Labels = { search: "بحث", searchPlaceholder: "ابحث في الموقع" }

const external = (a: Action) => (a.external ? ({ target: "_blank", rel: "noopener" } as const) : {})

function Utility01({
  code,
  title,
  description,
  primaryAction,
  secondaryAction,
  search,
  mainId = "main-content",
  labels,
  id,
  className,
}: Utility01Props) {
  const t = { ...labelsEn, ...labels }
  const uid = React.useId()
  const sid = id ?? uid
  return (
    <main id={mainId} aria-labelledby={`${sid}-heading`} className={className}>
      <Container size="prose" className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 text-center">
        {code ? (
          <p dir="ltr" className="text-6xl font-semibold text-muted-foreground tabular-nums">
            {code}
          </p>
        ) : null}
        <div className="flex flex-col gap-3">
          <h1 id={`${sid}-heading`} className="text-3xl font-semibold text-balance md:text-4xl">
            {title}
          </h1>
          {description ? <p className="text-lg text-muted-foreground">{description}</p> : null}
        </div>
        {search ? (
          <form action={search.action} method="get" role="search" className="flex w-full max-w-md gap-2">
            <label htmlFor={`${sid}-search`} className="sr-only">
              {t.search}
            </label>
            <Input
              id={`${sid}-search`}
              name={search.name}
              type="search"
              placeholder={t.searchPlaceholder}
              className="h-10 flex-1"
            />
            <Button type="submit" size="lg" className="h-10 px-4">
              <MagnifyingGlassIcon aria-hidden="true" />
              {t.search}
            </Button>
          </form>
        ) : null}
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={primaryAction.href}
            {...external(primaryAction)}
            className={cn(buttonVariants({ size: "lg" }), "h-11 w-full px-6 text-base sm:w-auto")}
          >
            {primaryAction.label}
          </a>
          {secondaryAction ? (
            <a
              href={secondaryAction.href}
              {...external(secondaryAction)}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 w-full px-6 text-base sm:w-auto")}
            >
              {secondaryAction.label}
            </a>
          ) : null}
        </div>
      </Container>
    </main>
  )
}

const demo: { en: Utility01Props; ar: Utility01Props } = {
  en: {
    code: "404",
    title: "Page not found",
    description: "The page may have moved, or the link is wrong. Try searching or go back to the home page.",
    search: { action: "/search", name: "q" },
    primaryAction: { label: "Back to home", href: "/" },
    labels: labelsEn,
  },
  ar: {
    code: "404",
    title: "الصفحة غير موجودة",
    description: "ربما نُقلت الصفحة أو أن الرابط غير صحيح. جرّب البحث أو عد إلى الصفحة الرئيسية.",
    search: { action: "/search", name: "q" },
    primaryAction: { label: "العودة إلى الرئيسية", href: "/" },
    labels: labelsAr,
  },
}

export { Utility01, labelsEn, labelsAr, demo }
export type { Utility01Props, Utility01Labels }
export default Utility01
