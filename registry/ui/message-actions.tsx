"use client"

import * as React from "react"
import {
  ArrowsClockwiseIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"

import { Button } from "@/registry/ui/button"
import { CodeBlockCopyButton } from "@/registry/ui/code-block"

type Feedback = "like" | "dislike"

type MessageActionsLabels = {
  actions: string
  copy: string
  copied: string
  regenerate: string
  like: string
  dislike: string
  previous: string
  next: string
  branch: (index: number, count: number) => string
}

const defaultLabels: MessageActionsLabels = {
  actions: "Message actions",
  copy: "Copy",
  copied: "Copied",
  regenerate: "Regenerate",
  like: "Good response",
  dislike: "Bad response",
  previous: "Previous response",
  next: "Next response",
  branch: (index, count) => `Response ${index} of ${count}`,
}

const messageActionsLabelsAr: MessageActionsLabels = {
  actions: "إجراءات الرسالة",
  copy: "نسخ",
  copied: "تم النسخ",
  regenerate: "إعادة التوليد",
  like: "إجابة جيدة",
  dislike: "إجابة سيئة",
  previous: "الإجابة السابقة",
  next: "الإجابة التالية",
  branch: (index, count) => `الإجابة ${index} من ${count}`,
}

type MessageActionsProps = Omit<React.ComponentProps<"div">, "children"> & {
  // The text the copy button puts on the clipboard. Without it there is no copy button.
  text?: string
  onRegenerate?: () => void
  feedback?: Feedback | null
  onFeedback?: (feedback: Feedback | null) => void
  // Which of the regenerated responses shows. index starts at 1.
  branch?: { index: number; count: number }
  onBranchChange?: (index: number) => void
  labels?: Partial<MessageActionsLabels>
}

// Each button shows only when its handler or data is given.
function MessageActions({
  text,
  onRegenerate,
  feedback,
  onFeedback,
  branch,
  onBranchChange,
  labels,
  className,
  ...props
}: MessageActionsProps) {
  const t = { ...defaultLabels, ...labels }
  const button = "text-muted-foreground hover:text-foreground"

  return (
    <div
      data-slot="message-actions"
      role="group"
      aria-label={t.actions}
      className={cn("flex min-w-0 flex-wrap items-center gap-0.5", className)}
      {...props}
    >
      {branch && branch.count > 1 && (
        <div className="me-1 flex items-center">
          <Button
            variant="ghost"
            size="icon-xs"
            className={button}
            aria-label={t.previous}
            disabled={branch.index <= 1}
            onClick={() => onBranchChange?.(branch.index - 1)}
          >
            <CaretLeftIcon className="rtl:rotate-180" />
          </Button>
          <span
            role="status"
            aria-label={t.branch(branch.index, branch.count)}
            className="min-w-8 text-center text-xs text-muted-foreground tabular-nums"
          >
            <bdi>
              {branch.index}/{branch.count}
            </bdi>
          </span>
          <Button
            variant="ghost"
            size="icon-xs"
            className={button}
            aria-label={t.next}
            disabled={branch.index >= branch.count}
            onClick={() => onBranchChange?.(branch.index + 1)}
          >
            <CaretRightIcon className="rtl:rotate-180" />
          </Button>
        </div>
      )}
      {text !== undefined && (
        <CodeBlockCopyButton
          value={text}
          className={button}
          labels={{ copy: t.copy, copied: t.copied }}
        />
      )}
      {onRegenerate && (
        <Button
          variant="ghost"
          size="icon-xs"
          className={button}
          aria-label={t.regenerate}
          onClick={onRegenerate}
        >
          <ArrowsClockwiseIcon />
        </Button>
      )}
      {onFeedback && (
        <>
          <Button
            variant="ghost"
            size="icon-xs"
            className={button}
            aria-label={t.like}
            aria-pressed={feedback === "like"}
            onClick={() => onFeedback(feedback === "like" ? null : "like")}
          >
            <ThumbsUpIcon weight={feedback === "like" ? "fill" : "regular"} />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className={button}
            aria-label={t.dislike}
            aria-pressed={feedback === "dislike"}
            onClick={() => onFeedback(feedback === "dislike" ? null : "dislike")}
          >
            <ThumbsDownIcon weight={feedback === "dislike" ? "fill" : "regular"} />
          </Button>
        </>
      )}
    </div>
  )
}

export {
  MessageActions,
  messageActionsLabelsAr,
  type Feedback,
  type MessageActionsLabels,
  type MessageActionsProps,
}
