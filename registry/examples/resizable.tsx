import type { ReactNode } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/registry/ui/resizable';
import type { ExampleDoc, ExampleProps } from '@/registry/examples/types';

export const doc: ExampleDoc = {
  description: {
    en: 'Panels you resize by dragging a handle or with the keyboard. Built on react-resizable-panels.',
    ar: 'لوحات تغيّر حجمها بسحب مقبض أو بلوحة المفاتيح. مبنية على react-resizable-panels.',
  },
  usage: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

<ResizablePanelGroup orientation="horizontal" className="h-48">
  <ResizablePanel defaultSize="50%">One</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="50%">Two</ResizablePanel>
</ResizablePanelGroup>`,
  examples: {
    Default: { en: 'Default', ar: 'افتراضي' },
    Vertical: { en: 'Vertical', ar: 'عمودي' },
    Nested: { en: 'Nested with a handle', ar: 'متداخل مع مقبض' },
  },
  accessibility: [
    {
      en: 'The handle is a focusable separator: Arrow keys resize, Home and End jump to the limits, and Enter collapses a collapsible panel.',
      ar: 'المقبض فاصل قابل للتركيز: تغيّر الأسهم الحجم، وينتقل Home وEnd إلى الحدود، ويطوي Enter اللوحة القابلة للطي.',
    },
    {
      en: 'Give the group a fixed height or width: panels take their size from the parent.',
      ar: 'أعطِ المجموعة ارتفاعًا أو عرضًا ثابتًا: تأخذ اللوحات حجمها من الأب.',
    },
    {
      en: 'Panel order follows the reading direction, so the first panel sits on the right in Arabic.',
      ar: 'يتبع ترتيب اللوحات اتجاه القراءة، فتقع اللوحة الأولى يمينًا في العربية.',
    },
  ],
};

function Pane({ children }: { children: ReactNode }) {
  return <div className="flex size-full items-center justify-center p-4 text-sm font-medium">{children}</div>;
}

export function Default({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ResizablePanelGroup orientation="horizontal" className="mx-auto h-40 max-w-md rounded-lg border">
      <ResizablePanel defaultSize="50%">
        <Pane>{ar ? 'الأولى' : 'One'}</Pane>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <Pane>{ar ? 'الثانية' : 'Two'}</Pane>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function Vertical({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ResizablePanelGroup orientation="vertical" className="mx-auto h-56 max-w-md rounded-lg border">
      <ResizablePanel defaultSize="30%">
        <Pane>{ar ? 'الرأس' : 'Header'}</Pane>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="70%">
        <Pane>{ar ? 'المحتوى' : 'Content'}</Pane>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function Nested({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <ResizablePanelGroup orientation="horizontal" className="mx-auto h-56 max-w-md rounded-lg border">
      <ResizablePanel defaultSize="40%" minSize="20%">
        <Pane>{ar ? 'الشريط الجانبي' : 'Sidebar'}</Pane>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="60%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="25%">
            <Pane>{ar ? 'الرأس' : 'Header'}</Pane>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="75%">
            <Pane>{ar ? 'المحتوى' : 'Content'}</Pane>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
