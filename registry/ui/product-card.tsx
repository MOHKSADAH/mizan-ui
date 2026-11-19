import * as React from "react"
import { ImageIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import type { Digits, Lang } from "@/registry/lib/format"
import { Price } from "@/registry/ui/price"

type ProductCardProps = React.ComponentProps<"article"> & {
  orientation?: "vertical" | "horizontal"
  unavailable?: boolean
}

// The root is the positioning context of the stretched title link. Slots that must stay clickable use z-10.
function ProductCard({ orientation = "vertical", unavailable, className, ...props }: ProductCardProps) {
  return (
    <article
      data-slot="product-card"
      data-orientation={orientation}
      data-unavailable={unavailable ? "" : undefined}
      className={cn("group/product-card relative flex min-w-0 flex-col gap-3 data-[orientation=horizontal]:flex-row", className)}
      {...props}
    />
  )
}

function ProductCardMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="product-card-media"
      className={cn(
        "relative aspect-4/5 shrink-0 overflow-hidden rounded-xl bg-muted group-data-[orientation=horizontal]/product-card:aspect-square group-data-[orientation=horizontal]/product-card:w-28 sm:group-data-[orientation=horizontal]/product-card:w-36",
        className
      )}
      {...props}
    />
  )
}

// Without a src it shows the muted placeholder of the media box.
function ProductCardImage({ alt, src, className, ...props }: React.ComponentProps<"img"> & { alt: string }) {
  if (!src) {
    return (
      <div
        data-slot="product-card-image"
        aria-hidden="true"
        className={cn(
          "flex size-full items-center justify-center text-muted-foreground group-data-[unavailable]/product-card:opacity-60",
          className
        )}
      >
        <ImageIcon aria-hidden="true" weight="duotone" className="size-1/4 max-h-16 max-w-16" />
      </div>
    )
  }
  return (
    <img
      data-slot="product-card-image"
      src={src}
      alt={alt}
      loading="lazy"
      className={cn("size-full object-cover group-data-[unavailable]/product-card:opacity-60", className)}
      {...props}
    />
  )
}

function ProductCardBadges({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="product-card-badges" className={cn("absolute start-2 top-2 flex flex-wrap gap-1", className)} {...props} />
}

function ProductCardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="product-card-action"
      className={cn("absolute end-2 top-2 z-10 inline-flex rounded-full bg-background", className)}
      {...props}
    />
  )
}

function ProductCardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="product-card-body" className={cn("flex min-w-0 flex-1 flex-col gap-1.5", className)} {...props} />
}

function ProductCardVendor({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="product-card-vendor" className={cn("text-xs text-muted-foreground", className)} {...props} />
}

type ProductCardTitleProps = React.ComponentProps<"h3"> & {
  as?: "h2" | "h3" | "h4"
  // With an href the whole card becomes the link target.
  href?: string
}

function ProductCardTitle({ as: Heading = "h3", href, className, children, ...props }: ProductCardTitleProps) {
  return (
    <Heading data-slot="product-card-title" className={cn("text-sm leading-snug font-semibold text-balance", className)} {...props}>
      {href ? (
        <a
          href={href}
          className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </Heading>
  )
}

type ProductCardPriceProps = Omit<React.ComponentProps<"div">, "children"> & {
  amount: number
  compareAt?: number
  currency?: string
  lang?: Lang
  digits?: Digits
  // Spoken before the old price, for example "Original price:". Required with compareAt.
  compareAtLabel?: string
}

function ProductCardPrice({ amount, compareAt, currency, lang, digits, compareAtLabel, className, ...props }: ProductCardPriceProps) {
  return (
    <div data-slot="product-card-price" className={cn("flex flex-wrap items-baseline gap-x-2 text-sm", className)} {...props}>
      <Price amount={amount} currency={currency} lang={lang} digits={digits} className="font-semibold" />
      {compareAt !== undefined && (
        <del className="text-xs text-muted-foreground">
          <span className="sr-only">{compareAtLabel} </span>
          <Price amount={compareAt} currency={currency} lang={lang} digits={digits} />
        </del>
      )}
    </div>
  )
}

type Swatch = { label: string; color: string }

// A static preview of the colors a product comes in. Choosing one belongs on the product page (SwatchSelect).
function ProductCardSwatches({ swatches, className, ...props }: Omit<React.ComponentProps<"ul">, "children"> & { swatches: Swatch[] }) {
  return (
    <ul data-slot="product-card-swatches" className={cn("flex items-center gap-1", className)} {...props}>
      {swatches.map((swatch) => (
        <li key={swatch.label} className="size-3.5 rounded-full border border-border" style={{ backgroundColor: swatch.color }}>
          <span className="sr-only">{swatch.label}</span>
        </li>
      ))}
    </ul>
  )
}

function ProductCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="product-card-footer" className={cn("relative z-10 mt-auto flex items-center gap-2 pt-2", className)} {...props} />
}

export {
  ProductCard,
  ProductCardAction,
  ProductCardBadges,
  ProductCardBody,
  ProductCardFooter,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardSwatches,
  ProductCardTitle,
  ProductCardVendor,
}
export type { ProductCardProps, ProductCardTitleProps, ProductCardPriceProps, Swatch as ProductCardSwatch }
