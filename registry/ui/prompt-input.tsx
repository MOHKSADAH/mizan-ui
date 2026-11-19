"use client"

import * as React from "react"
import {
  FileIcon,
  PaperPlaneRightIcon,
  StopIcon,
  XIcon,
} from "@phosphor-icons/react"
import { cn } from "@/registry/lib/utils"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/ui/attachment"
import { Button } from "@/registry/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/registry/ui/input-group"

type PromptInputLabels = {
  input: string
  placeholder: string
  send: string
  stop: string
  remove: (name: string) => string
}

const defaultLabels: PromptInputLabels = {
  input: "Message",
  placeholder: "Ask anything",
  send: "Send",
  stop: "Stop generating",
  remove: (name) => `Remove ${name}`,
}

const promptInputLabelsAr: PromptInputLabels = {
  input: "رسالتك",
  placeholder: "اسأل أي شيء",
  send: "إرسال",
  stop: "إيقاف التوليد",
  remove: (name) => `إزالة ${name}`,
}

type PromptInputAttachment = {
  id: string
  name: string
  description?: string
  // An image preview. Without it the attachment shows a file icon.
  src?: string
  state?: "uploading" | "processing" | "error" | "done"
}

type PromptInputStatus = "ready" | "submitted" | "streaming" | "error"

type PromptInputProps = Omit<
  React.ComponentProps<"form">,
  "onSubmit" | "defaultValue"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  // Called with the trimmed text on Enter or on the send button.
  onSubmit?: (value: string) => void
  // "submitted" and "streaming" turn the send button into a stop button.
  status?: PromptInputStatus
  onStop?: () => void
  attachments?: PromptInputAttachment[]
  onRemoveAttachment?: (id: string) => void
  // Slot at the start of the toolbar: attach, search, voice buttons.
  tools?: React.ReactNode
  // Slot before the send button: a model picker or a context meter.
  model?: React.ReactNode
  placeholder?: string
  disabled?: boolean
  textareaRef?: React.Ref<HTMLTextAreaElement>
  labels?: Partial<PromptInputLabels>
}

// The text box follows the direction of what you type (dir="auto"), so Arabic and English both read right.
// Enter sends, Shift+Enter adds a line, and Enter while an input method is composing does nothing.
function PromptInput({
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  status = "ready",
  onStop,
  attachments = [],
  onRemoveAttachment,
  tools,
  model,
  placeholder,
  disabled,
  textareaRef,
  labels,
  className,
  ...props
}: PromptInputProps) {
  const t = { ...defaultLabels, ...labels }
  const [inner, setInner] = React.useState(defaultValue)
  const text = value ?? inner
  const busy = status === "submitted" || status === "streaming"
  const canSend = !disabled && (text.trim() !== "" || attachments.length > 0)
  // The send button uses aria-disabled: a disabled button would dim the whole input group.

  function change(next: string) {
    setInner(next)
    onValueChange?.(next)
  }

  function submit() {
    if (busy || !canSend) return
    onSubmit?.(text.trim())
    if (value === undefined) setInner("")
  }

  return (
    <form
      data-slot="prompt-input"
      data-status={status}
      className={cn("w-full min-w-0", className)}
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
      {...props}
    >
      <InputGroup className="rounded-xl bg-background">
        {attachments.length > 0 && (
          <InputGroupAddon align="block-start">
            <AttachmentGroup className="w-full">
              {attachments.map((file) => (
                <Attachment
                  key={file.id}
                  size="sm"
                  state={file.state ?? "done"}
                >
                  <AttachmentMedia variant={file.src ? "image" : "icon"}>
                    {file.src ? (
                      <img src={file.src} alt="" />
                    ) : (
                      <FileIcon aria-hidden="true" />
                    )}
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle dir="auto">{file.name}</AttachmentTitle>
                    {file.description && (
                      <AttachmentDescription>
                        <bdi>{file.description}</bdi>
                      </AttachmentDescription>
                    )}
                  </AttachmentContent>
                  {onRemoveAttachment && (
                    <AttachmentActions>
                      <AttachmentAction
                        aria-label={t.remove(file.name)}
                        onClick={() => onRemoveAttachment(file.id)}
                      >
                        <XIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                  )}
                </Attachment>
              ))}
            </AttachmentGroup>
          </InputGroupAddon>
        )}
        <InputGroupTextarea
          ref={textareaRef}
          dir="auto"
          rows={1}
          value={text}
          disabled={disabled}
          aria-label={t.input}
          placeholder={placeholder ?? t.placeholder}
          className="max-h-48 min-h-12 px-3.5 pt-3 text-base md:text-sm"
          onChange={(event) => change(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault()
              submit()
            }
          }}
        />
        <InputGroupAddon align="block-end">
          <div className="flex w-full min-w-0 items-center gap-1">
            {tools}
            <div className="ms-auto flex shrink-0 items-center gap-1">
              {model}
              {busy ? (
                <Button
                  type="button"
                  size="icon-sm"
                  className="rounded-full"
                  aria-label={t.stop}
                  onClick={onStop}
                >
                  <StopIcon weight="fill" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="icon-sm"
                  className="rounded-full aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  aria-label={t.send}
                  aria-disabled={!canSend}
                >
                  <PaperPlaneRightIcon className="rtl:-scale-x-100" />
                </Button>
              )}
            </div>
          </div>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

export {
  PromptInput,
  promptInputLabelsAr,
  type PromptInputAttachment,
  type PromptInputLabels,
  type PromptInputProps,
  type PromptInputStatus,
}
