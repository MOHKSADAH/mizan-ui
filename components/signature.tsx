'use client';

import * as React from 'react';
import SIG from '@/components/signature.json';
import { useReducedMotion } from '@/components/use-reduced-motion';

const [, , W, H] = SIG.viewBox.split(' ').map(Number);
const TOTAL = SIG.maskPaths.reduce((a, m) => a + m.length, 0);
const { accel, decel } = SIG.timing;
const VMAX = 1 / (1 - accel / 2 - decel / 2);

// Trapezoid speed profile: short ease-in and ease-out, constant speed between.
const progress = (t: number) =>
  t <= 0
    ? 0
    : t >= 1
      ? 1
      : t < accel
        ? (0.5 * VMAX * t * t) / accel
        : t > 1 - decel
          ? 1 - (0.5 * VMAX * (1 - t) * (1 - t)) / decel
          : VMAX * (t - accel / 2);

// The last stroke draws TAIL_SPEED times faster, so the signature ends with a flick.
const TAIL_SPEED = 2.5;
const TAIL_START = SIG.maskPaths[SIG.maskPaths.length - 1].start;
const TAIL_TIME = TAIL_START + (1 - TAIL_START) / TAIL_SPEED;
const tail = (q: number) => {
  const x = q * TAIL_TIME;
  return x < TAIL_START ? x : Math.min(1, TAIL_START + (x - TAIL_START) * TAIL_SPEED);
};

// Canvas technique: the glyph is rendered once to a sprite; each frame adds only the new piece
// of the mask strokes, then composites glyph-through-mask. Plays once at 60% visibility.
export function Signature({ label, className }: { label: string; className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const glyph = new Path2D(SIG.glyphPath);
    const masks = SIG.maskPaths.map((m) => new Path2D(m.d));
    let cw = 0;
    let ch = 0;
    let glyphC!: HTMLCanvasElement, ghostC!: HTMLCanvasElement, maskC!: HTMLCanvasElement, tmpC!: HTMLCanvasElement;
    let drawn = masks.map(() => 0);
    let raf = 0;
    let played = false;
    let done = false;

    const make = () => Object.assign(document.createElement('canvas'), { width: cw, height: ch });
    const build = () => {
      const dpr = window.devicePixelRatio || 1;
      cw = Math.max(1, Math.round(canvas.clientWidth * dpr));
      ch = Math.round((cw * H) / W);
      canvas.width = cw;
      canvas.height = ch;
      const sc = cw / W;
      glyphC = make();
      const gx = glyphC.getContext('2d')!;
      gx.scale(sc, sc);
      gx.fillStyle = getComputedStyle(canvas).color;
      gx.fill(glyph);
      ghostC = make();
      const hx = ghostC.getContext('2d')!;
      hx.globalAlpha = 0.1;
      hx.drawImage(glyphC, 0, 0);
      maskC = make();
      const mx = maskC.getContext('2d')!;
      mx.setTransform(sc, 0, 0, sc, 0, 0);
      mx.lineCap = 'round';
      mx.lineJoin = 'round';
      tmpC = make();
      drawn = masks.map(() => 0);
    };
    const paintFull = () => {
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(glyphC, 0, 0);
    };
    const paint = (p: number) => {
      const mx = maskC.getContext('2d')!;
      const f = p * TOTAL;
      SIG.maskPaths.forEach((m, i) => {
        const upto = Math.max(0, Math.min(m.length, f - m.start * TOTAL));
        if (upto - drawn[i] < 0.05) return;
        mx.lineWidth = m.width;
        mx.setLineDash([upto - drawn[i] + 0.5, m.length * 2]);
        mx.lineDashOffset = -drawn[i];
        mx.stroke(masks[i]);
        drawn[i] = upto;
      });
      const tx = tmpC.getContext('2d')!;
      tx.globalCompositeOperation = 'copy';
      tx.drawImage(glyphC, 0, 0);
      tx.globalCompositeOperation = 'destination-in';
      tx.drawImage(maskC, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(ghostC, 0, 0);
      ctx.drawImage(tmpC, 0, 0);
    };
    const play = () => {
      build();
      let t0: number | null = null;
      const frame = (now: number) => {
        t0 ??= now;
        const t = (now - t0) / (SIG.duration * 1000);
        if (t >= 1) {
          done = true;
          return paintFull();
        }
        paint(tail(progress(t)));
        raf = requestAnimationFrame(frame);
      };
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(ghostC, 0, 0);
      raf = requestAnimationFrame(frame);
    };

    build();
    if (reduced) {
      done = true;
      paintFull();
    } else {
      ctx.drawImage(ghostC, 0, 0);
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || played || reduced) return;
        played = true;
        io.disconnect();
        play();
      },
      { threshold: 0.6 },
    );
    io.observe(canvas);
    // Rebuild on resize and on theme or mode changes (the color comes from CSS).
    const redraw = () => {
      if (!done && played) return;
      build();
      if (done) paintFull();
      else ctx.drawImage(ghostC, 0, 0);
    };
    const ro = new ResizeObserver(redraw);
    ro.observe(canvas);
    const mo = new MutationObserver(redraw);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
    };
  }, [reduced]);

  return (
    <div role="img" aria-label={label} className={className}>
      <canvas ref={ref} className="block h-auto w-full" style={{ aspectRatio: `${W} / ${H}` }} aria-hidden="true" />
    </div>
  );
}
