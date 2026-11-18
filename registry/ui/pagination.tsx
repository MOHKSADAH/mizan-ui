import * as React from "react"
import { cn } from "@/registry/lib/utils"

import { Button } from "@/registry/ui/button"
import { CaretLeftIcon, CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react/ssr"

type PaginationLabels = {
  label: string
  previous: string
  next: string
  goToPrevious: string
  goToNext: string
  morePages: string
}

const defaultLabels: PaginationLabels = {
  label: "pagination",
  previous: "Previous",
  next: "Next",
  goToPrevious: "Go to previous page",
  goToNext: "Go to next page",
  morePages: "More pages",
}
const paginationLabelsAr: PaginationLabels = {
  label: "التنقل بين الصفحات",
  previous: "السابق",
  next: "التالي",
  goToPrevious: "الانتقال إلى الصفحة السابقة",
  goToNext: "الانتقال إلى الصفحة التالية",
  morePages: "المزيد من الصفحات",
}

function Pagination({
  className,
  labels,
  ...props
}: React.ComponentProps<"nav"> & {
  labels?: Partial<Pick<PaginationLabels, "label">>
}) {
  return (
    <nav
      role="navigation"
      aria-label={labels?.label ?? defaultLabels.label}
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({
  className,
  text,
  labels,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  text?: string
  labels?: Partial<Pick<PaginationLabels, "previous" | "goToPrevious">>
}) {
  return (
    <PaginationLink
      aria-label={labels?.goToPrevious ?? defaultLabels.goToPrevious}
      size="default"
      className={cn("ps-1.5!", className)}
      {...props}
    >
      <CaretLeftIcon data-icon="inline-start" className="rtl:rotate-180" />
      <span className="hidden sm:block">
        {text ?? labels?.previous ?? defaultLabels.previous}
      </span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text,
  labels,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  text?: string
  labels?: Partial<Pick<PaginationLabels, "next" | "goToNext">>
}) {
  return (
    <PaginationLink
      aria-label={labels?.goToNext ?? defaultLabels.goToNext}
      size="default"
      className={cn("pe-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">
        {text ?? labels?.next ?? defaultLabels.next}
      </span>
      <CaretRightIcon data-icon="inline-end" className="rtl:rotate-180" />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  labels,
  ...props
}: React.ComponentProps<"span"> & {
  labels?: Partial<Pick<PaginationLabels, "morePages">>
}) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <DotsThreeIcon
      />
      <span className="sr-only">{labels?.morePages ?? defaultLabels.morePages}</span>
    </span>
  )
}

export {
  type PaginationLabels,
  paginationLabelsAr,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
