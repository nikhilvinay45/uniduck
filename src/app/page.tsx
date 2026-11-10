'use client'

import { useChat } from '@ai-sdk/react'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ArrowDown,
  Brain,
  Bug,
  Code2,
  GraduationCap,
  Lightbulb,
  Send,
  Sparkles,
  Trash2,
  User,
  Zap,
} from 'lucide-react'

const STARTER_PROMPTS = [
  {
    title: 'Debug my code',
    description: 'Stuck on a bug? Paste it and we will hunt it down together.',
    icon: Bug,
    prompt:
      "Hey UniDuck, my code keeps throwing an error and I can't figure out why. Here is what I have:\n\n```python\nfor i in range(10)\n    print(i)\n```\n\nCan you help me spot the issue?",
    accent: 'from-rose-500/20 to-rose-500/5',
    iconColor: 'text-rose-300',
    iconBg: 'bg-rose-500/10 ring-rose-500/20',
  },
  {
    title: 'Explain a concept',
    description: 'Pointers, recursion, Big-O... get a clear, simple breakdown.',
    icon: Lightbulb,
    prompt:
      'Hey UniDuck, can you explain how recursion works using a simple analogy? I am struggling to visualize the call stack.',
    accent: 'from-amber-500/20 to-amber-500/5',
    iconColor: 'text-amber-300',
    iconBg: 'bg-amber-500/10 ring-amber-500/20',
  },
  {
    title: 'Brainstorm an assignment',
    description: 'Stuck on a blank page? Let us shape the idea, step by step.',
    icon: Brain,
    prompt:
      'Hey UniDuck, I have a final project for my web dev class and I need to build a small full-stack app. Can you help me brainstorm a few ideas and pick one that is challenging but doable in two weeks?',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-300',
    iconBg: 'bg-emerald-500/10 ring-emerald-500/20',
  },
]

const FEATURES = [
  { icon: GraduationCap, label: 'Socratic Method' },
  { icon: Code2, label: 'Markdown + Code' },
  { icon: Zap, label: 'Instant Streaming' },
]

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.3s]"></span>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.15s]"></span>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-amber-400"></span>
    </span>
  )
}

function DuckAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = {
    sm: 'h-8 w-8 text-base',
    md: 'h-9 w-9 text-lg',
    lg: 'h-12 w-12 text-2xl',
  }
  return (
    <div
      className={`relative ${dimensions[size]} shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-500/5 ring-1 ring-amber-400/30 flex`}
    >
      <span className="leading-none">🦆</span>
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
    </div>
  )
}

function UserAvatar() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
      <User className="h-4 w-4 text-zinc-300" />
    </div>
  )
}

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages,
    error,
  } = useChat({
    api: '/api/chat',
    initialMessages: [],
  })

  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight
      setShowScrollButton(distanceFromBottom > 240)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const jumpToBottom = () => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if ((input ?? '').trim().length > 0 && !isLoading) {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
      }
    }
  }

  const hasMessages = messages.length > 0
  const safeInput = input ?? ''

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100">
      {/* ===== Ambient background glow ===== */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-[120px]" />
        <div className="absolute right-[-5%] top-[40%] h-[400px] w-[400px] rounded-full bg-rose-500/[0.04] blur-[100px]" />
        <div className="absolute left-[-5%] top-[60%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.03] blur-[100px]" />
      </div>

      {/* ===== Header ===== */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-zinc-950/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <DuckAvatar size="md" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-semibold tracking-tight text-zinc-50">
                  UniDuck
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/20">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI Tutor
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                CS50-style rubber duck · Socratic, never spoilers
              </p>
            </div>
          </div>

          {hasMessages && (
            <button
              type="button"
              onClick={() => setMessages([])}
              className="group inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
              aria-label="Clear chat"
            >
              <Trash2 className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </header>

      {/* ===== Scrollable chat area ===== */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
          {!hasMessages ? (
            <EmptyState onPick={(p) => append({ role: 'user', content: p })} />
          ) : (
            <div className="flex flex-col gap-8">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  role={m.role}
                  content={m.content}
                />
              ))}

              {isLoading &&
                messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex items-start gap-3 animate-[message-in_0.3s_ease-out]">
                    <DuckAvatar />
                    <div className="flex items-center gap-2.5 rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-3 backdrop-blur-xl">
                      <span className="text-sm text-zinc-400">
                        UniDuck is thinking
                      </span>
                      <TypingDots />
                    </div>
                  </div>
                )}

              {error && (
                <div className="mx-auto max-w-md rounded-2xl border border-rose-500/20 bg-rose-500/[0.08] px-4 py-3 text-center backdrop-blur-xl animate-[message-in_0.3s_ease-out]">
                  <p className="text-sm font-semibold text-rose-200">
                    Quack! Something went wrong.
                  </p>
                  <p className="mt-1 text-xs text-rose-300/70">
                    {error.message}
                  </p>
                  {(error.message.includes('Forbidden') ||
                    error.message.includes('API key') ||
                    error.message.includes('401') ||
                    error.message.includes('403')) && (
                    <p className="mt-2 text-xs text-rose-300/60">
                      Check that{' '}
                      <code className="rounded bg-rose-950/50 px-1 py-0.5 font-mono text-[11px]">
                        GROQ_API_KEY
                      </code>{' '}
                      in{' '}
                      <code className="rounded bg-rose-950/50 px-1 py-0.5 font-mono text-[11px]">
                        .env.local
                      </code>{' '}
                      is valid.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {showScrollButton && hasMessages && (
          <button
            type="button"
            onClick={jumpToBottom}
            className="fixed bottom-28 left-1/2 z-20 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-zinc-900/90 px-3 py-1.5 text-xs text-zinc-300 shadow-2xl backdrop-blur-xl transition hover:bg-zinc-800"
          >
            <ArrowDown className="h-3 w-3" />
            Latest
          </button>
        )}
      </div>

      {/* ===== Sticky input bar ===== */}
      <div className="relative z-20 border-t border-white/[0.06] bg-zinc-950/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <form
            onSubmit={handleSubmit}
            className="group flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-2 backdrop-blur-xl transition-all focus-within:border-amber-400/40 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_40px_-8px_rgba(251,191,36,0.25)]"
          >
            <textarea
              value={safeInput}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              placeholder="Ask UniDuck anything... (Shift+Enter for new line)"
              rows={1}
              aria-label="Message UniDuck"
              className="max-h-40 min-h-[40px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || safeInput.trim().length === 0}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:from-amber-300 hover:to-amber-400 hover:shadow-amber-500/40 disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-zinc-600 disabled:shadow-none"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 px-2 text-center text-[10px] text-zinc-600">
            UniDuck uses the Socratic Method — it guides, never solves. Always
            verify important answers.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============= Sub-components ============= */

function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex flex-col items-center pt-6 text-center sm:pt-12">
      {/* Hero avatar */}
      <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 animate-pulse rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-400/30 to-amber-500/10 blur-xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent ring-1 ring-amber-400/30 backdrop-blur-xl">
          <span className="text-6xl leading-none drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">
            🦆
          </span>
        </div>
      </div>

      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-400 backdrop-blur-xl">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Online · Ready to quack
      </div>

      <h2 className="bg-gradient-to-b from-zinc-50 to-zinc-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
        Quack! I&apos;m UniDuck.
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
        Your friendly CS50-style rubber duck tutor. I won&apos;t hand you the
        answer — I&apos;ll help you{' '}
        <span className="text-zinc-200">find it yourself</span>. Pick a starter
        below or just start typing.
      </p>

      {/* Starter cards */}
      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        {STARTER_PROMPTS.map((card, i) => {
          const Icon = card.icon
          return (
            <button
              key={card.title}
              type="button"
              onClick={() => onPick(card.prompt)}
              style={{ animationDelay: `${i * 80}ms` }}
              className={`group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.04] animate-[fade-in_0.5s_ease-out_both]`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} ring-1 backdrop-blur-xl transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
                <h3 className="text-sm font-semibold text-zinc-100">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {card.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Feature badges */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
        {FEATURES.map((f) => {
          const Icon = f.icon
          return (
            <span
              key={f.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] text-zinc-500 backdrop-blur-xl"
            >
              <Icon className="h-3 w-3 text-zinc-400" />
              {f.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function MessageBubble({
  role,
  content,
}: {
  role: 'user' | 'assistant' | 'system'
  content: string
}) {
  const isUser = role === 'user'

  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-3 animate-[message-in_0.3s_ease-out]">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-amber-400 to-amber-500 px-4 py-2.5 text-sm font-medium text-zinc-950 shadow-lg shadow-amber-500/10">
          <p className="whitespace-pre-wrap break-words">{content}</p>
        </div>
        <UserAvatar />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 animate-[message-in_0.3s_ease-out]">
      <DuckAvatar />
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 shadow-lg shadow-black/20 backdrop-blur-xl">
        {content ? (
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-3 ml-5 list-disc space-y-1.5 last:mb-0">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-3 ml-5 list-decimal space-y-1.5 last:mb-0">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              h1: ({ children }) => (
                <h1 className="mb-3 mt-2 text-lg font-bold text-zinc-50">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mb-2 mt-2 text-base font-bold text-zinc-50">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-2 mt-2 text-sm font-bold text-zinc-50">
                  {children}
                </h3>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 underline underline-offset-2 transition-colors hover:text-amber-200"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-zinc-50">
                  {children}
                </strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              blockquote: ({ children }) => (
                <blockquote className="my-3 border-l-2 border-amber-400/50 bg-amber-400/[0.06] py-1 pl-3 text-zinc-300 italic">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className?.includes('language-')
                if (isInline) {
                  return (
                    <code
                      className="rounded bg-amber-400/10 px-1.5 py-0.5 font-mono text-[0.85em] text-amber-300 ring-1 ring-amber-400/20"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              pre: ({ children }) => (
                <pre className="mb-3 mt-2 overflow-x-auto rounded-xl border border-white/[0.06] bg-zinc-950/80 p-4 text-[13px] leading-relaxed backdrop-blur-xl last:mb-0">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="mb-3 overflow-x-auto last:mb-0">
                  <table className="w-full border-collapse text-left text-xs">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-white/[0.08] bg-white/[0.04] px-3 py-2 font-semibold text-zinc-100">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-white/[0.06] px-3 py-2 text-zinc-300">
                  {children}
                </td>
              ),
              hr: () => (
                <hr className="my-4 border-white/[0.08]" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <span className="text-amber-400">
            <TypingDots />
          </span>
        )}
      </div>
    </div>
  )
}
