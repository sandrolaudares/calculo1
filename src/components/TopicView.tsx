import { useState } from 'react'
import type { Topic } from '../data/types'
import { RichText } from './RichText'
import { Math } from './Math'
import { StepByStep } from './StepByStep'
import { Quiz } from './Quiz'
import { ExerciseCard } from './ExerciseCard'
import { FunctionPlot } from './FunctionPlot'

type Tab = 'teoria' | 'exemplos' | 'quiz' | 'exercicios'

const TABS: { id: Tab; label: string }[] = [
  { id: 'teoria', label: 'Teoria' },
  { id: 'exemplos', label: 'Exemplos resolvidos' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'exercicios', label: 'Exercícios' },
]

export function TopicView({ topic }: { topic: Topic }) {
  const [tab, setTab] = useState<Tab>('teoria')

  return (
    <div>
      <header className="mb-6">
        <h1 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
          <span aria-hidden>{topic.emoji}</span>
          {topic.title}
        </h1>
        <p className="mt-1 text-slate-400">{topic.summary}</p>
      </header>

      <nav className="mb-6 flex flex-wrap gap-2 border-b border-slate-700">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition ${
              tab === t.id
                ? 'border-indigo-400 text-indigo-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'teoria' && (
        <div className="space-y-4">
          {topic.theory.map((block, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-700 bg-slate-800/40 p-4"
            >
              <RichText className="text-slate-200">{block.text}</RichText>
              {block.math && (
                <div className="mt-3 overflow-x-auto text-indigo-200">
                  <Math display>{block.math}</Math>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'exemplos' && (
        <div className="space-y-8">
          {topic.examples.map((ex) => (
            <article
              key={ex.id}
              className="rounded-xl border border-slate-700 bg-slate-800/30 p-4 sm:p-5"
            >
              <h2 className="text-lg font-semibold text-white">{ex.title}</h2>
              <p className="mt-1 mb-4 text-slate-300">
                <RichText>{ex.statement}</RichText>
              </p>
              <div className="grid gap-5 lg:grid-cols-2">
                <StepByStep steps={ex.steps} answer={ex.answer} />
                {ex.plot && (
                  <div className="flex items-start justify-center">
                    <FunctionPlot {...ex.plot} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === 'quiz' && <Quiz questions={topic.quiz} />}

      {tab === 'exercicios' && (
        <div className="space-y-5">
          {topic.exercises.map((ex, i) => (
            <ExerciseCard key={ex.id} exercise={ex} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
