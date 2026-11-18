'use client';

import * as React from 'react';
import type { Lang } from '@/lib/strings';
import { blockLoaders } from '@/components/blocks/loaders';

type BlockModule = {
  default: React.ComponentType<Record<string, unknown>>;
  demo?: Partial<Record<Lang, Record<string, unknown>>>;
};

const cache = new Map<string, Promise<BlockModule>>();
const load = (name: string) => {
  if (!cache.has(name)) cache.set(name, blockLoaders[name]() as Promise<BlockModule>);
  return cache.get(name)!;
};

// Blocks may be client files, so the module (and its `demo` props) is read on the client side of the boundary.
export function BlockView({ name, lang }: { name: string; lang: Lang }) {
  const mod = React.use(load(name));
  const Block = mod.default;
  return <Block {...mod.demo?.[lang]} />;
}

// Reports the block height to the parent frame so the preview grows with the block.
export function FrameHeight() {
  React.useEffect(() => {
    if (window.parent === window) return;
    const main = document.getElementById('content');
    if (!main) return;
    const post = () => window.parent.postMessage({ mizanBlockHeight: main.offsetHeight, href: location.href }, location.origin);
    const ro = new ResizeObserver(post);
    ro.observe(main);
    // The parent may hydrate after this frame: it then asks for the height again.
    const onAsk = (e: MessageEvent) => e.origin === location.origin && e.data === 'mizan-measure' && post();
    window.addEventListener('message', onAsk);
    return () => {
      ro.disconnect();
      window.removeEventListener('message', onAsk);
    };
  }, []);
  return null;
}
