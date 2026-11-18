import { formatNumber } from '@/registry/lib/format';
import type { Lang } from '@/lib/strings';

// Renders the {code:--x} and {n:14} tokens used in board strings. Numbers sit in <bdi> so Arabic text keeps its order.
export function Rich({ text, lang }: { text: string; lang: Lang }) {
  return text.split(/(\{(?:code|n):[^}]+\})/).map((part, i) => {
    const m = /^\{(code|n):([^}]+)\}$/.exec(part);
    if (!m) return part;
    if (m[1] === 'code')
      return (
        <code key={i} dir="ltr" className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
          {m[2]}
        </code>
      );
    return <bdi key={i}>{formatNumber(Number(m[2]), { lang })}</bdi>;
  });
}
