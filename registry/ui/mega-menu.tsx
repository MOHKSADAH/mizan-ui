"use client"

import * as React from "react"
import { cn } from "@/registry/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"

type MegaMenuLabels = { nav: string }

const defaultLabels: MegaMenuLabels = { nav: "Main" }
const megaMenuLabelsAr: MegaMenuLabels = { nav: "الرئيسية" }

type MegaMenuLink = { label: string; href: string; description?: string }
type MegaMenuColumn = { title?: string; links: MegaMenuLink[] }
type MegaMenuItem = {
  label: string
  // A plain link when there are no columns.
  href?: string
  columns?: MegaMenuColumn[]
  // Shown as the last column of the panel, for example a promoted collection.
  featured?: React.ReactNode
}

function Columns({ columns, featured, mobile }: Pick<MegaMenuItem, "columns" | "featured"> & { mobile?: boolean }) {
  const Link = mobile ? "a" : NavigationMenuLink
  return (
    <div
      className={cn("grid gap-4", mobile ? "grid-cols-1" : "w-[min(90vw,44rem)] p-3")}
      style={mobile ? undefined : { gridTemplateColumns: `repeat(${(columns?.length ?? 0) + (featured ? 1 : 0)}, minmax(0, 1fr))` }}
    >
      {columns?.map((column, i) => (
        <div key={i}>
          {column.title && <p className="px-2 pb-1 text-xs font-medium text-muted-foreground">{column.title}</p>}
          <ul>
            {column.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex flex-col items-start gap-0.5 rounded-md p-2 text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="font-medium">{link.label}</span>
                  {link.description && <span className="text-muted-foreground">{link.description}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {featured && <div className="rounded-lg bg-muted p-4 text-sm">{featured}</div>}
    </div>
  )
}

type MegaMenuProps = {
  items: MegaMenuItem[]
  labels?: Partial<MegaMenuLabels>
  className?: string
}

// Wide screens: a navigation menu with panels. Narrow screens: an accordion of the same links.
function MegaMenu({ items, labels, className }: MegaMenuProps) {
  const l = { ...defaultLabels, ...labels }
  return (
    <>
      <NavigationMenu
        data-slot="mega-menu"
        aria-label={l.nav}
        className={cn("hidden md:flex", className)}
      >
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.columns ? (
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Columns columns={item.columns} featured={item.featured} />
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink href={item.href} className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <nav data-slot="mega-menu-mobile" aria-label={l.nav} className={cn("md:hidden", className)}>
        <Accordion>
          {items.map((item) =>
            item.columns ? (
              <AccordionItem key={item.label} value={item.label}>
                <AccordionTrigger>{item.label}</AccordionTrigger>
                <AccordionContent>
                  <Columns columns={item.columns} featured={item.featured} mobile />
                </AccordionContent>
              </AccordionItem>
            ) : (
              <a key={item.label} href={item.href} className="block border-b py-2.5 text-sm font-medium">
                {item.label}
              </a>
            )
          )}
        </Accordion>
      </nav>
    </>
  )
}

export { MegaMenu, megaMenuLabelsAr }
export type { MegaMenuColumn, MegaMenuItem, MegaMenuLabels, MegaMenuLink }
