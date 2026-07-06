import { useEffect, useRef, useState } from 'react'
import { RichText } from './RichText'

const logo = '/calcul-ai-logo.png'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Como calcular $\\lim_{x\\to 3}\\frac{x^2-9}{x-3}$?',
  'Qual a derivada de $f(x)=x^2\\sin(x)$?',
  'Explique a regra da cadeia com um exemplo.',
  'Como achar os máximos e mínimos de $f(x)=x^3-3x$?',
]

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    'Oi! Eu sou o Calcul-AI 🤖. Só respondo dúvidas de Cálculo I (limites, continuidade, derivadas e aplicações). Manda sua pergunta!',
}

export function CalculAiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, loading])

  async function send(text: string) {
    const question = text.trim()
    if (!question || loading) return
    setError(null)
    const next = [...messages, { role: 'user' as const, content: question }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== WELCOME) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Falha na requisição.')
      setMessages((cur) => [...cur, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro inesperado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-indigo-600 py-3 pl-3 pr-5 text-white shadow-lg shadow-indigo-900/40 transition hover:bg-indigo-500"
          aria-label="Abrir o Calcul-AI"
        >
          <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
          <span className="font-semibold">Calcul-AI</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-40 flex h-[min(600px,85vh)] w-[min(400px,92vw)] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
          <header className="flex items-center gap-3 border-b border-slate-800 bg-slate-950 px-4 py-3">
            <img src={logo} alt="Logo do Calcul-AI" className="h-9 w-9 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-tight text-white">Calcul-AI</p>
              <p className="truncate text-xs text-slate-400">Tutor de Cálculo I · só assuntos da disciplina</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Fechar chat"
            >
              ✕
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-indigo-600 text-white'
                      : 'rounded-bl-sm bg-slate-800 text-slate-100'
                  }`}
                >
                  <RichText>{m.content}</RichText>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full rounded-lg border border-slate-700 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-indigo-500 hover:bg-slate-800"
                  >
                    <RichText>{s}</RichText>
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-slate-800 px-3.5 py-2.5 text-sm text-slate-400">
                  Calcul-AI está pensando…
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-slate-800 bg-slate-950 px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte algo de Cálculo I…"
              className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-40"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  )
}
