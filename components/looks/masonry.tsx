'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { balance } from './balance';

const GAP = 16;
const HIDDEN = ['opacity-0', 'translate-y-3'];
const REVEAL = ['transition', 'duration-350', 'ease-out'];
const noop = () => () => {};

// Cards are portaled into plain wrapper nodes that this component moves between columns. React never
// re-parents them, so card state survives a rebalance. Server and first client render show a CSS grid.
export function Masonry({ items }: { items: React.ReactNode[] }) {
  const mounted = React.useSyncExternalStore(noop, () => true, () => false);
  const wrappers = React.useMemo(
    () => (mounted ? items.map(() => document.createElement('div')) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mounted, items.length],
  );
  const host = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const el = host.current;
    if (!el || !wrappers.length) return;
    const seen = new Set<Element>();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          seen.add(e.target);
          e.target.classList.add(...REVEAL);
          e.target.classList.remove(...HIDDEN);
        }),
      { threshold: 0.08 },
    );

    const layout = () => {
      const n = innerWidth >= 1180 ? 3 : innerWidth >= 760 ? 2 : 1;
      const active = document.activeElement;
      const probe = document.createElement('div');
      probe.style.width = `${(el.clientWidth - GAP * (n - 1)) / n}px`;
      el.replaceChildren(probe);
      probe.append(...wrappers);
      const columns = balance(wrappers.map((w) => w.offsetHeight + GAP), n);
      const cols = Array.from({ length: n }, () => {
        const c = document.createElement('div');
        c.className = 'flex min-w-0 flex-1 flex-col gap-4';
        return c;
      });
      wrappers.forEach((w, i) => cols[columns[i]].append(w));
      el.replaceChildren(...cols);
      if (active instanceof HTMLElement && el.contains(active)) active.focus({ preventScroll: true });

      // One-shot reveal: only cards below the fold are hidden, and a card that was shown never hides again.
      wrappers.forEach((w) => {
        if (seen.has(w)) return;
        const r = w.getBoundingClientRect();
        if (reduced || (r.top < innerHeight && r.bottom > 0)) {
          w.classList.remove(...HIDDEN);
          return void seen.add(w);
        }
        w.classList.add(...HIDDEN);
        io.observe(w);
      });
    };

    layout();
    let timer: ReturnType<typeof setTimeout>;
    let alive = true;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(layout, 150);
    };
    addEventListener('resize', onResize);
    void document.fonts?.ready.then(() => alive && layout());
    return () => {
      alive = false;
      clearTimeout(timer);
      removeEventListener('resize', onResize);
      io.disconnect();
    };
  }, [wrappers]);

  if (!mounted)
    return (
      <div className="invisible grid items-start gap-4 min-[760px]:grid-cols-2 min-[1180px]:grid-cols-3">
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    );
  return (
    <>
      <div ref={host} className="flex items-start gap-4" />
      {wrappers.map((w, i) => createPortal(items[i], w, String(i)))}
    </>
  );
}
