"use client"

import * as React from "react"
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"
import { findByFirstChar, flattenTree } from "@/registry/lib/tree"

type TreeNode = {
  id: string
  label: React.ReactNode
  children?: TreeNode[]
}

type TreeViewProps = Omit<React.ComponentProps<"ul">, "children" | "role" | "onSelect"> & {
  nodes: TreeNode[]
  // Required: names the tree for screen readers.
  label: string
  defaultExpanded?: string[]
  defaultSelected?: string
  onSelect?: (id: string) => void
}

// APG tree pattern: one tab stop, arrow keys move, Right and Left open and close (swapped in RTL), a letter jumps to the next match.
function TreeView({ nodes, label, defaultExpanded = [], defaultSelected, onSelect, className, ...props }: TreeViewProps) {
  const [expanded, setExpanded] = React.useState(() => new Set(defaultExpanded))
  const [selected, setSelected] = React.useState(defaultSelected)
  const [focused, setFocused] = React.useState(defaultSelected ?? nodes[0]?.id)
  const items = React.useRef(new Map<string, HTMLLIElement>())
  const rows = flattenTree(nodes, expanded)
  // Falls back to the first row when the focused node is hidden or gone, so the tree keeps its tab stop.
  const tabStop = rows.some((row) => row.node.id === focused) ? focused : rows[0]?.node.id

  const focusRow = (id?: string) => {
    if (!id) return
    setFocused(id)
    items.current.get(id)?.focus()
  }
  const toggle = (id: string, open: boolean) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      if (open) next.add(id)
      else next.delete(id)
      return next
    })
  const select = (id: string) => {
    setSelected(id)
    onSelect?.(id)
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLLIElement>, index: number) {
    const row = rows[index]
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl"
    const key = event.key === "ArrowRight" ? (rtl ? "ArrowLeft" : "ArrowRight") : event.key === "ArrowLeft" ? (rtl ? "ArrowRight" : "ArrowLeft") : event.key
    if (key === "ArrowDown") focusRow(rows[index + 1]?.node.id)
    else if (key === "ArrowUp") focusRow(rows[index - 1]?.node.id)
    else if (key === "Home") focusRow(rows[0].node.id)
    else if (key === "End") focusRow(rows[rows.length - 1].node.id)
    else if (key === "ArrowRight") {
      if (row.expanded === false) toggle(row.node.id, true)
      else if (row.expanded) focusRow(rows[index + 1]?.node.id)
    } else if (key === "ArrowLeft") {
      if (row.expanded) toggle(row.node.id, false)
      else focusRow(row.parentId)
    } else if (key === "Enter" || key === " ") {
      select(row.node.id)
      if (row.expanded !== undefined) toggle(row.node.id, !row.expanded)
    } else if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const texts = rows.map((r) => items.current.get(r.node.id)?.textContent ?? "")
      focusRow(rows[findByFirstChar(texts, index, key)]?.node.id)
    } else return
    event.preventDefault()
  }

  return (
    <ul data-slot="tree-view" role="tree" aria-label={label} className={cn("flex flex-col text-sm", className)} {...props}>
      {rows.map((row, index) => (
        <li
          key={row.node.id}
          ref={(el) => {
            if (el) items.current.set(row.node.id, el)
            else items.current.delete(row.node.id)
          }}
          role="treeitem"
          aria-level={row.level}
          aria-setsize={row.setSize}
          aria-posinset={row.posInSet}
          aria-expanded={row.expanded}
          aria-selected={selected === row.node.id}
          tabIndex={tabStop === row.node.id ? 0 : -1}
          style={{ paddingInlineStart: `${(row.level - 1) * 1.25 + 0.25}rem` }}
          className="flex min-h-7 cursor-default items-center gap-1 rounded-md pe-2 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 aria-selected:bg-muted aria-selected:font-medium"
          onKeyDown={(e) => onKeyDown(e, index)}
          onClick={() => {
            focusRow(row.node.id)
            select(row.node.id)
            if (row.expanded !== undefined) toggle(row.node.id, !row.expanded)
          }}
        >
          <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center text-muted-foreground">
            {row.expanded === undefined ? null : row.expanded ? (
              <CaretDownIcon className="size-3.5" />
            ) : (
              <CaretRightIcon className="size-3.5 rtl:rotate-180" />
            )}
          </span>
          {row.node.label}
        </li>
      ))}
    </ul>
  )
}

export { TreeView }
export type { TreeNode }
