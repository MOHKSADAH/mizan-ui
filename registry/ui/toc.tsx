"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import { useScrollspy } from "@/registry/hooks/use-scrollspy"

type TocLabels = { nav: string }

const defaultLabels: TocLabels = { nav: "On this page" }
const tocLabelsAr: TocLabels = { nav: "في هذه الصفحة" }

type TocItem = {
  // The id of the heading element. Arabic ids work as they are.
  id: string
  label: React.ReactNode
  level?: 2 | 3
}

type TocProps = Omit<React.ComponentProps<"nav">, "children"> & {
  items: TocItem[]
  labels?: Partial<TocLabels>
}

function Toc({ items, labels, className, ...props }: TocProps) {
  const l = { ...defaultLabels, ...labels }
  const active = useScrollspy(items.map((item) => item.id))
  return (
    <nav data-slot="toc" aria-label={l.nav} className={cn("text-sm", className)} {...props}>
      <p className="mb-2 font-medium">{l.nav}</p>
      <ul className="flex flex-col border-s">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === active ? "location" : undefined}
              className={cn(
                "-ms-px block border-s-2 border-transparent py-1 pe-2 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 aria-[current=location]:border-primary aria-[current=location]:font-medium aria-[current=location]:text-foreground",
                item.level === 3 ? "ps-6" : "ps-3"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { Toc, tocLabelsAr }
export type { TocItem, TocLabels }
