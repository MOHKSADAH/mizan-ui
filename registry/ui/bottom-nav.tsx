import * as React from "react"
import { cn } from "@/registry/lib/utils"
import { formatNumber, plural, type Digits, type Lang, type PluralForms } from "@/registry/lib/format"

type BottomNavLabels = {
  nav: string
  // Spoken badge count, with {n}.
  badge: PluralForms
}

const defaultLabels: BottomNavLabels = {
  nav: "Main",
  badge: { one: "{n} new item", other: "{n} new items" },
}

const bottomNavLabelsAr: BottomNavLabels = {
  nav: "الرئيسية",
  badge: {
    zero: "لا عناصر جديدة",
    one: "عنصر جديد",
    two: "عنصران جديدان",
    few: "{n} عناصر جديدة",
    many: "{n} عنصرا جديدا",
    other: "{n} عنصر جديد",
  },
}

type BottomNavItem = {
  href: string
  icon: React.ReactNode
  label: string
  badge?: number
}

type BottomNavProps = Omit<React.ComponentProps<"nav">, "children"> & {
  // Four or five items read best on a phone.
  items: BottomNavItem[]
  // The href of the current page.
  value?: string
  // Swap the anchor for your router link.
  renderLink?: (props: React.ComponentProps<"a">) => React.ReactNode
  lang?: Lang
  digits?: Digits
  labels?: Partial<BottomNavLabels>
}

function BottomNav({
  items,
  value,
  renderLink = (props) => <a {...props} />,
  lang = "en",
  digits = "latn",
  labels,
  className,
  ...props
}: BottomNavProps) {
  const l = { ...defaultLabels, ...labels }
  const locale = { lang, digits }
  return (
    <nav
      data-slot="bottom-nav"
      aria-label={l.nav}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] text-card-foreground md:hidden",
        className
      )}
      {...props}
    >
      <ul className="flex">
        {items.map((item) => {
          const current = item.href === value
          return (
            <li key={item.href} className="flex-1">
              {renderLink({
                href: item.href,
                "aria-current": current ? "page" : undefined,
                className:
                  "flex min-h-14 flex-col items-center justify-center gap-1 border-t-2 border-transparent px-1 text-xs text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50 aria-[current=page]:border-primary aria-[current=page]:font-semibold aria-[current=page]:text-foreground [&_svg]:size-5",
                children: (
                  <>
                    <span className="relative">
                      {item.icon}
                      {!!item.badge && (
                        <>
                          <span
                            aria-hidden="true"
                            className="absolute -top-1.5 -end-2.5 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[0.625rem] leading-4 font-medium text-destructive-foreground tabular-nums"
                          >
                            {item.badge > 99 ? `${formatNumber(99, locale)}+` : formatNumber(item.badge, locale)}
                          </span>
                          <span className="sr-only">{plural(item.badge, l.badge, locale)}</span>
                        </>
                      )}
                    </span>
                    <span>{item.label}</span>
                  </>
                ),
              })}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { BottomNav, bottomNavLabelsAr }
export type { BottomNavItem, BottomNavLabels }
