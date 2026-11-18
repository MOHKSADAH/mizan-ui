'use client';

import * as React from 'react';
import { Button } from '@/registry/ui/button';
import { Toaster, createToastManager } from '@/registry/ui/toast';
import type { ExampleProps } from '@/registry/examples/types';

// Each demo owns a manager so toasts from one example never show in another.
function useManager() {
  const [manager] = React.useState(() => createToastManager());
  return manager;
}

export function ToastDefault({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const manager = useManager();
  return (
    <Toaster toastManager={manager}>
      <Button
        variant="outline"
        onClick={() =>
          manager.add({
            title: ar ? 'تم إنشاء الطلب' : 'Order created',
            description: ar ? 'الثلاثاء 17 نوفمبر 2026، 10:30 ص' : 'Tuesday, November 17, 2026 at 10:30 AM',
          })
        }
      >
        {ar ? 'إظهار إشعار' : 'Show toast'}
      </Button>
    </Toaster>
  );
}

export function ToastTypes({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const manager = useManager();
  return (
    <Toaster toastManager={manager}>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="outline" onClick={() => manager.add({ type: 'success', title: ar ? 'تم حفظ التغييرات' : 'Changes saved' })}>
          {ar ? 'نجاح' : 'Success'}
        </Button>
        <Button variant="outline" onClick={() => manager.add({ type: 'info', title: ar ? 'سيُحدَّث المخزون خلال دقائق' : 'Stock updates in a few minutes' })}>
          {ar ? 'معلومة' : 'Info'}
        </Button>
        <Button variant="outline" onClick={() => manager.add({ type: 'warning', title: ar ? 'المخزون منخفض' : 'Stock is running low' })}>
          {ar ? 'تحذير' : 'Warning'}
        </Button>
        <Button
          variant="outline"
          onClick={() => manager.add({ type: 'error', priority: 'high', title: ar ? 'تعذّر إكمال الدفع' : 'Payment failed', description: ar ? 'تحقق من بيانات البطاقة.' : 'Check your card details.' })}
        >
          {ar ? 'خطأ' : 'Error'}
        </Button>
      </div>
    </Toaster>
  );
}

export function ToastAction({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const manager = useManager();
  return (
    <Toaster toastManager={manager}>
      <Button
        variant="outline"
        onClick={() =>
          manager.add({
            title: ar ? 'تم حذف المنتج' : 'Product deleted',
            description: ar ? 'يبقى هذا الإشعار حتى تغلقه.' : 'This toast stays until you close it.',
            timeout: 0,
            actionProps: {
              children: ar ? 'تراجع' : 'Undo',
              onClick: () => manager.add({ type: 'success', title: ar ? 'تمت استعادة المنتج' : 'Product restored' }),
            },
          })
        }
      >
        {ar ? 'حذف مع تراجع' : 'Delete with undo'}
      </Button>
    </Toaster>
  );
}

export function ToastLoading({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  const manager = useManager();
  return (
    <Toaster toastManager={manager}>
      <Button
        variant="outline"
        onClick={() =>
          manager.promise(new Promise<void>((resolve) => setTimeout(resolve, 2000)), {
            loading: ar ? 'جارٍ إرسال الفاتورة…' : 'Sending invoice…',
            success: ar ? 'تم إرسال الفاتورة' : 'Invoice sent',
            error: ar ? 'تعذّر إرسال الفاتورة' : 'Could not send the invoice',
          })
        }
      >
        {ar ? 'إرسال فاتورة' : 'Send invoice'}
      </Button>
    </Toaster>
  );
}
