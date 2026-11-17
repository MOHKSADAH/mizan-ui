"use client"

import { Check, Copy } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

import { commandText, type TerminalLine, typedText, typingCost } from "@/registry/lib/ascii"
import { cn } from "@/registry/lib/utils"

const PREFIXES = { command: "$ ", comment: "# ", output: "" }

type TerminalProps = {
  title?: string
  lines: TerminalLine[]
  typing?: boolean
  copyLabel: string
  copiedLabel: string
  className?: string
}

export function Terminal({ title, lines, typing = false, copyLabel, copiedLabel, className }: TerminalProps) {
  const total = lines.reduce((sum, line) => sum + typingCost(line), 0)
  const [step, setStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!typing) return
    let id: ReturnType<typeof setInterval>
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setStep(total)
      let next = 0
      id = setInterval(() => {
        setStep(++next)
        if (next >= total) clearInterval(id)
      }, 40)
    })
    observer.observe(ref.current!)
    return () => {
      observer.disconnect()
      clearInterval(id)
    }
  }, [typing, total])

  function copy() {
    navigator.clipboard.writeText(commandText(lines)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      ref={ref}
      dir="ltr"
      className={cn("overflow-hidden rounded-lg border border-border bg-background font-mono text-sm", className)}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <div aria-hidden="true" className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-muted-foreground/40" />
          ))}
        </div>
        <span className="truncate text-xs text-muted-foreground">{title}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? copiedLabel : copyLabel}
          className="inline-flex size-7 items-center justify-center justify-self-end rounded-md text-muted-foreground hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          {copied ? <Check /> : <Copy />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 leading-relaxed">
        {lines.map((line, i) => {
          const lineStep = typing ? step - lines.slice(0, i).reduce((sum, l) => sum + typingCost(l), 0) : total
          const typed = typedText(line, lineStep)
          const started = line.type === "command" ? lineStep >= 0 : lineStep >= 1

          return (
            <span key={i} className="block">
              <span className={cn("text-muted-foreground select-none", !started && "invisible")}>
                {PREFIXES[line.type]}
              </span>
              <span className={line.type === "comment" ? "text-muted-foreground" : undefined}>{typed}</span>
              <span className="invisible">{line.text.slice(typed.length)}</span>
            </span>
          )
        })}
      </pre>
    </div>
  )
}
