"use client"

import * as React from "react"

import { cn } from "@/registry/lib/utils"
import { BottomNav } from "@/registry/ui/bottom-nav"

type DockAction = {
  id: string
  icon: React.ReactNode
  label: string
  href?: string
  onSelect?: () => void
}

// A link (href), a tray (any content, full width) or an action list (aligned to the inline end).
type DockItem = {
  id: string
  icon: React.ReactNode
  label: string
  badge?: number
  href?: string
  tray?: React.ReactNode
  actions?: DockAction[]
}

type ActionDockProps = Omit<React.ComponentProps<typeof BottomNav>, "items"> & {
  items: DockItem[]
  // The id of an item whose tray or list starts open.
  defaultOpen?: string
  // Classes for the tray and the action list. Override the position to dock inside a frame.
  trayClassName?: string
}

// The dock sits at the bottom edge: border, 3.5rem row and the safe area. Trays open right above it.
const above = "bottom-[calc(3.5rem+1px+env(safe-area-inset-bottom))]"
const enter = "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2"

// BottomNav with items that open a tray or an action list in place instead of navigating.
// Escape, a tap outside, or choosing an action closes it and focus returns to the item.
function ActionDock({
  items,
  defaultOpen,
  trayClassName,
  renderLink = (props) => <a {...props} />,
  ...props
}: ActionDockProps) {
  const uid = React.useId()
  const root = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState<string | null>(defaultOpen ?? null)
  const byUser = React.useRef(false)
  const hrefOf = (item: DockItem) => item.href ?? `#${item.id}`
  const active = items.find((item) => item.id === open && !item.href)

  React.useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(null)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [open])

  // Move focus into what the visitor just opened, not into a defaultOpen tray on first render.
  React.useEffect(() => {
    if (open && byUser.current) {
      root.current
        ?.querySelector<HTMLElement>("[data-dock-panel] :is(input, button, a[href], select, textarea)")
        ?.focus()
    }
  }, [open])

  function close(restoreFocus: boolean) {
    if (restoreFocus) root.current?.querySelector<HTMLElement>("[data-dock-trigger][aria-expanded=true]")?.focus()
    setOpen(null)
  }

  return (
    <div
      ref={root}
      data-slot="action-dock"
      className="contents"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) close(true)
      }}
    >
      <BottomNav
        {...props}
        items={items.map((item) => ({ href: hrefOf(item), icon: item.icon, label: item.label, badge: item.badge }))}
        renderLink={({ href, className, children, ...rest }) => {
          const item = items.find((i) => hrefOf(i) === href)
          if (!item || item.href) return renderLink({ href, className, children, ...rest, onClick: () => setOpen(null) })
          const expanded = open === item.id
          return (
            <button
              type="button"
              data-dock-trigger=""
              aria-expanded={expanded}
              aria-controls={expanded ? `${uid}-${item.id}` : undefined}
              onClick={() => {
                byUser.current = true
                setOpen(expanded ? null : item.id)
              }}
              className={cn(
                className,
                "w-full aria-expanded:border-primary aria-expanded:font-semibold aria-expanded:text-foreground"
              )}
            >
              {children}
            </button>
          )
        }}
      />
      {active?.tray && (
        <div
          id={`${uid}-${active.id}`}
          data-dock-panel=""
          role="region"
          aria-label={active.label}
          className={cn(
            "fixed inset-x-0 z-40 border-t bg-card p-3 text-card-foreground md:hidden",
            above,
            enter,
            trayClassName
          )}
        >
          {active.tray}
        </div>
      )}
      {active?.actions && (
        <div
          className={cn("pointer-events-none fixed inset-x-0 z-40 flex justify-end px-3 pb-2 md:hidden", above, trayClassName)}
        >
          <ul
            id={`${uid}-${active.id}`}
            data-dock-panel=""
            aria-label={active.label}
            className={cn(
              "pointer-events-auto grid w-60 gap-0.5 rounded-xl border bg-popover p-1 text-popover-foreground",
              enter
            )}
          >
            {active.actions.map((action) => {
              const className =
                "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-start text-sm outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground"
              return (
                <li key={action.id}>
                  {action.href ? (
                    <a href={action.href} className={className} onClick={() => close(false)}>
                      {action.icon}
                      {action.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      className={className}
                      onClick={() => {
                        close(true)
                        action.onSelect?.()
                      }}
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export { ActionDock }
export type { ActionDockProps, DockAction, DockItem }
