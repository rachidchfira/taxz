'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  ArrowUp,
  Bot,
  MessageCircle,
  X,
} from 'lucide-react'

import {
  Dialog,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
  error?: boolean
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Hi! Ask me about Vietnam PIT finalization, refunds, residency, pricing, or required documents.',
}

const QUICK_QUESTIONS = [
  'Do I need to finalize PIT?',
  'What documents do I need?',
  'Can I claim a tax refund?',
]

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    WELCOME_MESSAGE,
  ])
  const [input, setInput] = React.useState('')
  const [isSending, setIsSending] = React.useState(false)
  const sessionIdRef = React.useRef<string | null>(null)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const getSessionId = React.useCallback(() => {
    if (sessionIdRef.current) return sessionIdRef.current

    const fallback = `web-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

    try {
      const stored = window.sessionStorage.getItem('tf_session')
      const sessionId = stored || fallback

      if (!stored) {
        window.sessionStorage.setItem('tf_session', sessionId)
      }

      sessionIdRef.current = sessionId
      return sessionId
    } catch {
      sessionIdRef.current = fallback
      return fallback
    }
  }, [])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isSending])

  const sendMessage = React.useCallback(
    async (rawText: string) => {
      const text = rawText.trim()

      if (!text || isSending) {
        return
      }

      setMessages((current) => [
        ...current,
        { id: createMessageId(), role: 'user', text },
      ])
      setInput('')
      setIsSending(true)

      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 30000)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            sessionId: getSessionId(),
            timestamp: new Date().toISOString(),
          }),
          signal: controller.signal,
        })

        const data = (await response.json().catch(() => null)) as
          | { reply?: string; error?: string }
          | null

        if (!response.ok) {
          throw new Error(data?.error || 'The assistant is temporarily unavailable.')
        }

        setMessages((current) => [
          ...current,
          {
            id: createMessageId(),
            role: 'assistant',
            text: data?.reply || "Sorry, I didn't catch that. Please try again.",
          },
        ])
      } catch (error) {
        const message =
          error instanceof DOMException && error.name === 'AbortError'
            ? 'The response took too long. Please try again.'
            : error instanceof Error
              ? error.message
              : 'Connection error. Please try again.'

        setMessages((current) => [
          ...current,
          {
            id: createMessageId(),
            role: 'assistant',
            text: message,
            error: true,
          },
        ])
      } finally {
        window.clearTimeout(timeout)
        setIsSending(false)
      }
    },
    [getSessionId, isSending]
  )

  return (
    <Dialog modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="icon"
          className="fixed z-40 size-12 rounded-full bg-[#1E3A8A] p-0 text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#2349A8] hover:shadow-xl focus-visible:ring-[#40E0D0]/40 active:translate-y-0"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 1rem)',
            right: 'calc(env(safe-area-inset-right) + 0.75rem)',
          }}
          aria-label={
            isOpen
              ? 'Close Tax Finalization AI Agent'
              : 'Open Tax Finalization AI Agent'
          }
        >
          {isOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <MessageCircle className="size-5" aria-hidden="true" />
          )}
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogPrimitive.Content
          id="taxfinalization-chat"
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            inputRef.current?.focus()
          }}
          className={cn(
            'fixed z-50 flex h-[min(400px,calc(100dvh-88px))] w-[calc(100vw-24px)] max-w-[320px] origin-bottom-right flex-col overflow-hidden rounded-xl border border-border bg-background shadow-xl outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'print:hidden'
          )}
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 4.25rem)',
            right: 'calc(env(safe-area-inset-right) + 0.75rem)',
          }}
        >
          <header className="flex h-11 shrink-0 items-center gap-2 bg-[#1E3A8A] px-3 text-white">
            <Bot className="size-4 shrink-0 text-[#40E0D0]" aria-hidden="true" />
            <DialogTitle className="min-w-0 flex-1 truncate text-balance text-sm font-semibold text-white">
              Tax Finalization AI Agent
            </DialogTitle>
            <DialogDescription className="sr-only">
              Ask questions about Vietnam personal income tax.
            </DialogDescription>

            <DialogPrimitive.Close asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 rounded-md text-white/75 hover:bg-white/15 hover:text-white"
                aria-label="Close chat"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </DialogPrimitive.Close>
          </header>

          <div
            className="flex-1 space-y-2.5 overflow-y-auto bg-slate-50 p-2.5 dark:bg-slate-950"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-end gap-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[90%] whitespace-pre-wrap rounded-xl px-2.5 py-2 text-[11px] leading-relaxed shadow-sm',
                    message.role === 'user'
                      ? 'rounded-br-md bg-gradient-to-br from-[#1E3A8A] to-[#2854B8] text-white'
                      : message.error
                        ? 'rounded-bl-md border border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100'
                        : 'rounded-bl-md border border-slate-200/80 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200'
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div>
                <p className="mb-1.5 text-[9px] font-semibold uppercase text-muted-foreground">
                  Popular questions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((question) => (
                    <Button
                      key={question}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => void sendMessage(question)}
                      className="h-auto rounded-full border-[#1E3A8A]/15 bg-white px-2.5 py-1 text-left text-[9px] font-medium text-[#1E3A8A] shadow-sm transition hover:border-[#40E0D0] hover:bg-white dark:border-white/10 dark:bg-slate-900 dark:text-[#7FFFD4]"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {isSending && (
              <div className="flex items-end gap-2" aria-label="Assistant is typing">
                <div className="flex h-8 items-center gap-1 rounded-2xl rounded-bl-md border border-slate-200/80 bg-white px-3 shadow-sm dark:border-white/10 dark:bg-slate-900">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="size-1.5 animate-bounce rounded-full bg-[#4169E1] dark:bg-[#40E0D0]"
                      style={{ animationDelay: `${dot * 140}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border/70 bg-background p-2">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                void sendMessage(input)
              }}
              className="flex items-end gap-1.5 rounded-xl border border-border bg-muted/35 p-1 focus-within:border-[#4169E1]/50 focus-within:ring-2 focus-within:ring-[#4169E1]/10"
            >
              <label htmlFor="tf-chat-input" className="sr-only">
                Ask about Vietnam personal income tax
              </label>
              <Textarea
                ref={inputRef}
                id="tf-chat-input"
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, 2000))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    void sendMessage(input)
                  }
                }}
                placeholder="Ask about PIT finalization..."
                autoComplete="off"
                disabled={isSending}
                className="min-h-9 resize-none border-0 bg-transparent px-2.5 py-1.5 text-xs text-foreground shadow-none focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isSending}
                className="size-9 shrink-0 rounded-lg bg-gradient-to-br from-[#4169E1] to-[#1E3A8A] text-white shadow-sm transition hover:scale-105 hover:shadow-md disabled:scale-100 disabled:opacity-40"
                aria-label="Send message"
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </Button>
            </form>
            <p className="mt-1 text-center text-[7px] leading-tight text-muted-foreground">
              AI can make mistakes. Do not share sensitive personal or tax data.
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
