'use client';

import * as React from 'react';
import { IconContext } from '@phosphor-icons/react';
import { TooltipProvider } from '@/registry/ui/tooltip';
import { Toaster } from '@/registry/ui/sonner';
import { SettingsProvider, useSettings } from '@/components/settings';

function Icons({ children }: { children: React.ReactNode }) {
  const { iconWeight } = useSettings();
  const value = React.useMemo(() => ({ weight: iconWeight, mirrored: false }), [iconWeight]);
  return <IconContext.Provider value={value}>{children}</IconContext.Provider>;
}

// Mode (next-themes) and direction (Base UI) come from Fumadocs' RootProvider in the layout.
export function Providers({ dir, children }: { dir: 'ltr' | 'rtl'; children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <Icons>
        <TooltipProvider delay={400}>
          {children}
          <Toaster position={dir === 'rtl' ? 'bottom-left' : 'bottom-right'} dir={dir} />
        </TooltipProvider>
      </Icons>
    </SettingsProvider>
  );
}
