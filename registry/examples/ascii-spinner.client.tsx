"use client"

import { useEffect, useState } from "react"

import { AsciiSpinner } from "@/registry/ui/ascii/ascii-spinner"
import { Button } from "@/registry/ui/button"

type SpinnerButtonProps = { idle: string; busy: string }

export function SpinnerButton({ idle, busy }: SpinnerButtonProps) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!loading) return
    const id = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(id)
  }, [loading])

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" aria-busy={loading} onClick={() => setLoading(true)}>
        {loading ? busy : idle}
      </Button>
      {loading && <AsciiSpinner label={busy} />}
    </div>
  )
}
