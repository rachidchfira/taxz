'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  ArrowUp,
  Bot,
  Calculator,
  MessageCircle,
  ShieldCheck,
  Sparkles,
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
  text: "Hi! I'm the TaxFinalization AI assistant. I can help with Vietnam PIT finalization, refunds, residency, pricing, and the documents you may need. What would you like to know?",
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
          className="fixed z-40 ml-auto h-13 items-center gap-2 rounded-full bg-gradient-to-br from-[#4169E1] via-[#2854B8] to-[#0F766E] px-3 text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-[#40E0D0]/40 active:translate-y-0 sm:px-4"
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 1rem)',
            right: 'calc(env(safe-area-inset-right) + 0.75rem)',
          }}
          aria-label={isOpen ? 'Close AI tax assistant' : 'Open AI tax assistant'}
        >
          <span className="relative flex size-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 transition group-hover:bg-white/20">
            {isOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <MessageCircle className="size-4" aria-hidden="true" />
            )}
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-[#40E0D0] ring-2 ring-[#2854B8]" />
            )}
          </span>
          <span className="hidden pr-0.5 text-left sm:block">
            <span className="block text-xs font-semibold leading-none">
              {isOpen ? 'Close chat' : 'Ask our AI'}
            </span>
            {!isOpen && (
              <span className="mt-1 block text-[9px] leading-none text-white/70">
                Vietnam PIT help
              </span>
            )}
          </span>
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
            'fixed z-50 flex h-[min(480px,calc(100dvh-96px))] w-[calc(100vw-24px)] max-w-[340px] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-white/20 bg-background shadow-2xl outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'print:hidden'
          )}
          style={{
            bottom: 'calc(env(safe-area-inset-bottom) + 4.5rem)',
            right: 'calc(env(safe-area-inset-right) + 0.75rem)',
          }}
        >
          <header className="relative overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#2349A8] to-[#0F766E] px-4 py-3.5 text-white">
            <div className="pointer-events-none absolute -top-16 -right-12 size-40 rounded-full bg-[#40E0D0]/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 left-8 size-36 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex items-start gap-2.5">
              <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 shadow-inner">
                <Calculator className="size-4" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[#40E0D0] ring-2 ring-[#2349A8]">
                  <Sparkles className="size-2.5 text-[#0F3B55]" aria-hidden="true" />
                </span>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-2">
                  <DialogTitle className="truncate text-balance text-sm font-semibold text-white">
                    TaxFinalization AI
                  </DialogTitle>
                  <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/90">
                    Beta
                  </span>
                </div>
                <DialogDescription className="mt-0.5 text-pretty text-xs text-white/75">
                  Vietnam PIT guidance for expats
                </DialogDescription>
              </div>

              <DialogPrimitive.Close asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0 rounded-lg text-white/75 hover:bg-white/15 hover:text-white"
                  aria-label="Close chat"
                >
                  <X className="size-4" aria-hidden="true" />
                </Button>
              </DialogPrimitive.Close>
            </div>

            <div className="relative mt-2.5 flex items-center gap-2 text-[10px] text-white/80">
              <span className="flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1">
                <ShieldCheck className="size-3.5 text-[#7FFFD4]" aria-hidden="true" />
                General tax information
              </span>
            </div>
          </header>

          <div
            className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-slate-50 to-white px-3 py-3.5 dark:from-slate-950 dark:to-background"
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
                {message.role === 'assistant' && (
                  <div className="mb-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] dark:bg-[#40E0D0]/10 dark:text-[#40E0D0]">
                    <Bot className="size-3" aria-hidden="true" />
                  </div>
                )}

                <div
                  className={cn(
                    'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm',
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
              <div className="pl-8">
                <p className="mb-1.5 text-[9px] font-semibold uppercase text-muted-foreground">
                  Popular questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((question) => (
                    <Button
                      key={question}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => void sendMessage(question)}
                      className="h-auto rounded-full border-[#1E3A8A]/15 bg-white px-2.5 py-1 text-left text-[10px] font-medium text-[#1E3A8A] shadow-sm transition hover:border-[#40E0D0] hover:bg-white dark:border-white/10 dark:bg-slate-900 dark:text-[#7FFFD4]"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {isSending && (
              <div className="flex items-end gap-2" aria-label="Assistant is typing">
                <div className="mb-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] dark:bg-[#40E0D0]/10 dark:text-[#40E0D0]">
                  <Bot className="size-3" aria-hidden="true" />
                </div>
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

          <div className="border-t border-border/70 bg-background p-2.5">
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
            <p className="mt-1.5 text-center text-[8px] leading-tight text-muted-foreground">
              AI can make mistakes. Do not share sensitive personal or tax data.
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
