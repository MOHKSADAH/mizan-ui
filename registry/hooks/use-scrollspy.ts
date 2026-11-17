import * as React from "react"

// The active heading is the last one whose top has passed the line. Before the first heading nothing is active.
export function pickActive(ids: string[], tops: number[], line: number) {
  let active: string | undefined
  tops.forEach((top, i) => {
    if (top <= line) active = ids[i]
  })
  return active
}

// line: where the active band ends, as a fraction of the viewport height.
export function useScrollspy(ids: string[], line = 0.3) {
  const [active, setActive] = React.useState<string>()
  const key = ids.join("\n")
  React.useEffect(() => {
    const list = key ? key.split("\n") : []
    const elements = list.map((id) => document.getElementById(id))
    const update = () => {
      const limit = window.innerHeight * line
      const found = elements.flatMap((el, i) => (el ? [{ id: list[i], top: el.getBoundingClientRect().top }] : []))
      setActive(
        pickActive(
          found.map((f) => f.id),
          found.map((f) => f.top),
          limit
        )
      )
    }
    // Crossing the edge of the band is the only moment the answer can change.
    const observer = new IntersectionObserver(update, { rootMargin: `0px 0px -${(1 - line) * 100}% 0px` })
    elements.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [key, line])
  return active
}
