'use client';

import * as React from 'react';
import { useReducedMotion } from '@/components/use-reduced-motion';

const DRAW_MS = 700;

// One-time draw: `mounted` flips on first intersection and `animate` is true only for the draw itself,
// so a later range, theme or view change never replays it. Reduced motion mounts at once with no animation.
export function useReveal() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [seen, setSeen] = React.useState(false);
  const [settled, setSettled] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  React.useEffect(() => {
    if (!seen) return;
    const id = setTimeout(() => setSettled(true), DRAW_MS + 300);
    return () => clearTimeout(id);
  }, [seen]);

  return { ref, mounted: seen || reduced, animate: seen && !settled && !reduced, drawMs: DRAW_MS };
}
