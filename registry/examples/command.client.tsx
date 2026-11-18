'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Button } from '@/registry/ui/button';
import { Command, CommandDialog, commandLabelsAr } from '@/registry/ui/command';
import { Kbd } from '@/registry/ui/kbd';
import type { ExampleProps } from '@/registry/examples/types';

export function CommandDialogDemo({ lang, children }: ExampleProps & { children: ReactNode }) {
  const ar = lang === 'ar';
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {ar ? 'فتح لوحة الأوامر' : 'Open command palette'}
        <Kbd>
          <bdi>Ctrl K</bdi>
        </Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} {...(ar ? commandLabelsAr : {})}>
        <Command>{children}</Command>
      </CommandDialog>
    </>
  );
}
