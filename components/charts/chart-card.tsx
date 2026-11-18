'use client';

import * as React from 'react';
import { TableIcon } from '@phosphor-icons/react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/ui/card';
import { Toggle } from '@/registry/ui/toggle';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/registry/ui/table';
import { useReveal } from './use-reveal';

export type Reveal = Omit<ReturnType<typeof useReveal>, 'ref'>;

// Card with the "Table view" toggle. `chart` gets the draw state, `table` replaces it when toggled.
export function ChartCard({
  title,
  description,
  viewTable,
  chart,
  table,
  className,
}: {
  title: string;
  description: React.ReactNode;
  viewTable: string;
  chart: (reveal: Reveal) => React.ReactNode;
  table: React.ReactNode;
  className?: string;
}) {
  const [asTable, setAsTable] = React.useState(false);
  const { ref, ...reveal } = useReveal();
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Toggle
            variant="outline"
            size="sm"
            pressed={asTable}
            onPressedChange={setAsTable}
            className="aria-pressed:font-semibold aria-pressed:underline aria-pressed:underline-offset-4"
          >
            <TableIcon aria-hidden="true" />
            {viewTable}
          </Toggle>
        </CardAction>
      </CardHeader>
      <CardContent className="min-w-0">
        <div ref={ref}>{asTable ? table : chart(reveal)}</div>
      </CardContent>
    </Card>
  );
}

// Accessible data table in a keyboard-focusable scroll region, so the page never scrolls sideways.
export function DataTable({
  caption,
  head,
  rows,
  dir,
}: {
  caption: string;
  head: string[];
  rows: React.ReactNode[][];
  dir: 'ltr' | 'rtl';
}) {
  return (
    <div role="region" tabIndex={0} aria-label={caption} dir={dir} className="max-h-80 overflow-auto rounded-md border focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-hidden">
      <table className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <TableHeader className="sticky top-0 bg-card">
          <TableRow>
            {head.map((h, i) => (
              <TableHead key={h} scope="col" className={i ? 'text-end' : 'text-start'}>
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, ri) => (
            <TableRow key={ri}>
              {r.map((c, ci) =>
                ci ? (
                  <TableCell key={ci} className="text-end tabular-nums">
                    {c}
                  </TableCell>
                ) : (
                  <th key={ci} scope="row" className="p-2 text-start font-medium whitespace-nowrap">
                    {c}
                  </th>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </table>
    </div>
  );
}
