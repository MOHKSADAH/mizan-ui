'use client';

import { toast } from 'sonner';
import { Button } from '@/registry/ui/button';
import type { ExampleProps } from '@/registry/examples/types';

export function SonnerDefault({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(ar ? 'تم إنشاء الطلب' : 'Order created', {
          description: ar ? 'الثلاثاء 17 نوفمبر 2026، 10:30 ص' : 'Tuesday, November 17, 2026 at 10:30 AM',
        })
      }
    >
      {ar ? 'إظهار إشعار' : 'Show toast'}
    </Button>
  );
}

export function SonnerTypes({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="outline" onClick={() => toast.success(ar ? 'تم حفظ التغييرات' : 'Changes saved')}>
        {ar ? 'نجاح' : 'Success'}
      </Button>
      <Button variant="outline" onClick={() => toast.info(ar ? 'سيُحدَّث المخزون خلال دقائق' : 'Stock updates in a few minutes')}>
        {ar ? 'معلومة' : 'Info'}
      </Button>
      <Button variant="outline" onClick={() => toast.warning(ar ? 'المخزون منخفض' : 'Stock is running low')}>
        {ar ? 'تحذير' : 'Warning'}
      </Button>
      <Button variant="outline" onClick={() => toast.error(ar ? 'تعذّر إكمال الدفع' : 'Payment failed')}>
        {ar ? 'خطأ' : 'Error'}
      </Button>
    </div>
  );
}

export function SonnerAction({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(ar ? 'تم حذف المنتج' : 'Product deleted', {
          description: ar ? 'يبقى هذا الإشعار حتى تغلقه.' : 'This toast stays until you close it.',
          duration: Infinity,
          closeButton: true,
          action: { label: ar ? 'تراجع' : 'Undo', onClick: () => toast.success(ar ? 'تمت استعادة المنتج' : 'Product restored') },
        })
      }
    >
      {ar ? 'حذف مع تراجع' : 'Delete with undo'}
    </Button>
  );
}

export function SonnerPromise({ lang }: ExampleProps) {
  const ar = lang === 'ar';
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.promise(new Promise<void>((resolve) => setTimeout(resolve, 2000)), {
          loading: ar ? 'جارٍ إرسال الفاتورة…' : 'Sending invoice…',
          success: ar ? 'تم إرسال الفاتورة' : 'Invoice sent',
          error: ar ? 'تعذّر إرسال الفاتورة' : 'Could not send the invoice',
        })
      }
    >
      {ar ? 'إرسال فاتورة' : 'Send invoice'}
    </Button>
  );
}
