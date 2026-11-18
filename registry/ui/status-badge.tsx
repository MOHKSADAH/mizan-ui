import * as React from "react"
import {
  ArrowUUpLeftIcon,
  ClockIcon,
  CreditCardIcon,
  PackageIcon,
  TruckIcon,
  XCircleIcon,
} from "@phosphor-icons/react/ssr"

import { cn } from "@/registry/lib/utils"
import { Badge } from "@/registry/ui/badge"

type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded"

type StatusBadgeLabels = Record<OrderStatus, string>

const defaultLabels: StatusBadgeLabels = {
  pending: "Pending",
  paid: "Paid",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
}

const statusBadgeLabelsAr: StatusBadgeLabels = {
  pending: "قيد الانتظار",
  paid: "مدفوع",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغي",
  refunded: "مسترد",
}

// Each status is an icon, text and a token pair. Direction-sensitive icons flip in RTL.
const styles: Record<OrderStatus, { icon: React.ReactNode; className: string }> = {
  pending: {
    icon: <ClockIcon weight="bold" />,
    className: "bg-warning text-warning-foreground",
  },
  paid: {
    icon: <CreditCardIcon weight="bold" />,
    className: "bg-info text-info-foreground",
  },
  shipped: {
    icon: <TruckIcon weight="bold" className="rtl:-scale-x-100" />,
    className: "bg-primary text-primary-foreground",
  },
  delivered: {
    icon: <PackageIcon weight="bold" />,
    className: "bg-success text-success-foreground",
  },
  cancelled: {
    icon: <XCircleIcon weight="bold" />,
    className: "bg-destructive text-destructive-foreground",
  },
  refunded: {
    icon: <ArrowUUpLeftIcon weight="bold" className="rtl:-scale-x-100" />,
    className: "bg-secondary text-secondary-foreground",
  },
}

type StatusBadgeProps = Omit<React.ComponentProps<typeof Badge>, "children" | "variant"> & {
  status: OrderStatus
  labels?: Partial<StatusBadgeLabels>
}

function StatusBadge({ status, labels, className, ...props }: StatusBadgeProps) {
  const { icon, className: tone } = styles[status]
  const t = { ...defaultLabels, ...labels }
  return (
    <Badge data-status={status} className={cn(tone, className)} {...props}>
      {icon}
      {t[status]}
    </Badge>
  )
}

export { StatusBadge, statusBadgeLabelsAr }
export type { OrderStatus, StatusBadgeLabels }
