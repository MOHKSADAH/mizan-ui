// One deterministic daily series; every chart on /charts derives from it (ported from the preview board).
export type Range = 7 | 30 | 90;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const DAYS = 180;
export const WEEKS = 12;
const AOV = 376;
const WEEKLY = [0.92, 0.96, 1, 1.02, 1.08, 1.12, 0.9];
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

// UTC noon keeps the calendar day stable in every time zone the formatters use.
export const DATES = Array.from({ length: DAYS }, (_, i) => new Date(Date.UTC(2026, 10, 17 - (DAYS - 1 - i), 12)));

// Upward trend, a recent lift over the last 14 days, weekly seasonality and +-3% noise.
export const REV = (() => {
  const r = rng(7);
  return Array.from({ length: DAYS }, (_, i) => {
    const ramp = Math.min(1, Math.max(0, (i - (DAYS - 14)) / 14));
    return Math.round(12400 * (1 + 0.0012 * i) * (1 + 0.12 * ramp) * WEEKLY[i % 7] * (1 + (r() - 0.5) * 0.06));
  });
})();
export const ORDERS = (() => {
  const r = rng(23);
  return REV.map((v) => Math.round(v / (AOV * (1 + (r() - 0.5) * 0.08))));
})();
export const SESSIONS = (() => {
  const r = rng(41);
  return ORDERS.map((o) => Math.round(o / (0.0298 * (1 + (r() - 0.5) * 0.16))));
})();

function windowStats(a: number, b: number) {
  const rev = sum(REV.slice(a, b));
  const orders = sum(ORDERS.slice(a, b));
  const sessions = sum(SESSIONS.slice(a, b));
  return { rev, orders, sessions, conv: orders / sessions, aov: rev / orders };
}

export function metrics(range: Range) {
  const cur = windowStats(DAYS - range, DAYS);
  const prev = windowStats(DAYS - 2 * range, DAYS - range);
  const s = cur.sessions;
  const steps = [s, Math.round(s * 0.5), Math.round(s * 0.115), Math.round(s * 0.0529), cur.orders];
  return { cur, prev, steps };
}

export type Spark = Record<'revenue' | 'orders' | 'conversion' | 'aov', number[]>;

// 12 buckets of the range (7 for 7 days).
export function sparkData(range: Range): Spark {
  const n = range === 7 ? 7 : 12;
  const start = DAYS - range;
  const b = Array.from({ length: n }, () => ({ rev: 0, orders: 0, sessions: 0, days: 0 }));
  for (let i = 0; i < range; i++) {
    const x = b[Math.floor((i * n) / range)];
    x.rev += REV[start + i];
    x.orders += ORDERS[start + i];
    x.sessions += SESSIONS[start + i];
    x.days++;
  }
  return {
    revenue: b.map((x) => x.rev / x.days),
    orders: b.map((x) => x.orders / x.days),
    conversion: b.map((x) => x.orders / x.sessions),
    aov: b.map((x) => x.rev / x.orders),
  };
}

export function areaData(range: Range) {
  const start = DAYS - range;
  return Array.from({ length: range }, (_, i) => ({
    date: DATES[start + i],
    prevDate: DATES[start - range + i],
    cur: REV[start + i],
    prev: REV[start - range + i],
  }));
}

// Last 12 whole weeks of the same daily orders, split web/app/social about 50/35/15.
export const CHANNELS = (() => {
  const r = rng(99);
  const out: { web: number; app: number; social: number }[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const s = DAYS - (WEEKS - w) * 7;
    const total = sum(ORDERS.slice(s, s + 7));
    const web = Math.round(total * (0.5 + (r() - 0.5) * 0.04));
    const app = Math.round(total * (0.35 + (r() - 0.5) * 0.04));
    out.push({ web, app, social: total - web - app });
  }
  return out;
})();

const PAY_SHARE = [0.41, 0.27, 0.15, 0.11, 0.06];
// [revenue share, unit price] for the five products in `an.products`.
const TOP: [number, number][] = [[0.21, 489], [0.18, 4299], [0.11, 649], [0.08, 899], [0.04, 149]];

export function payments(orders: number) {
  const counts = PAY_SHARE.map((s) => Math.round(s * orders));
  counts[counts.length - 1] = orders - sum(counts.slice(0, -1));
  return counts.map((count) => ({ count, share: count / orders }));
}

export function topProducts(rev: number) {
  return TOP.map(([share, price]) => {
    const revenue = Math.round(rev * share);
    return { revenue, units: Math.round(revenue / price) };
  });
}
