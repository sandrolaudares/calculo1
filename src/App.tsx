import { useState } from 'react'
import { topics } from './data/topics'
import { TopicView } from './components/TopicView'
import { CalculAiChat } from './components/CalculAiChat'

export default function App() {
  const [activeId, setActiveId] = useState(topics[0].id)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = topics.find((t) => t.id === activeId) ?? topics[0]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Cabeçalho mobile */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 lg:hidden">
        <span className="font-semibold text-white">Cálculo Diferencial I</span>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="rounded-lg border border-slate-700 px-3 py-1 text-sm text-slate-200"
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Fechar' : 'Tópicos'}
        </button>
      </div>

      <div className="mx-auto flex max-w-6xl">
        {/* Barra lateral */}
        <aside
          className={`${
            menuOpen ? 'block' : 'hidden'
          } w-full shrink-0 border-r border-slate-800 bg-slate-950 lg:block lg:w-72`}
        >
          <div className="hidden px-5 py-6 lg:block">
            <h2 className="text-lg font-bold text-white">Cálculo I</h2>
            <p className="text-xs text-slate-500">
              Teoria, exemplos e prática
            </p>
          </div>
          <nav className="px-3 pb-6">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveId(t.id)
                  setMenuOpen(false)
                }}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  t.id === activeId
                    ? 'bg-indigo-600/20 text-indigo-200 ring-1 ring-indigo-500/40'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span aria-hidden className="text-lg">
                  {t.emoji}
                </span>
                <span className="font-medium">{t.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Conteúdo */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-10">
          <TopicView topic={active} />

          <footer className="mt-16 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
            Feito para estudar Cálculo Diferencial I · fórmulas por KaTeX
          </footer>
        </main>
      </div>

      <CalculAiChat />
    </div>
  )
}
