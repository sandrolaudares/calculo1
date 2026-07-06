import { useState } from 'react'
import type { Step } from '../data/types'
import { RichText } from './RichText'
import { Math as Tex } from './Math'

type StepByStepProps = {
  steps: Step[]
  answer?: string
}

/**
 * Exibe uma resolução passo a passo, revelando um passo por vez para
 * incentivar o aluno a pensar antes de ver a próxima etapa.
 */
export function StepByStep({ steps, answer }: StepByStepProps) {
  const [revealed, setRevealed] = useState(1)
  const allRevealed = revealed >= steps.length

  return (
    <div className="space-y-3">
      <ol className="space-y-3">
        {steps.slice(0, revealed).map((step, i) => (
          <li
            key={i}
            className="rounded-lg border border-slate-700 bg-slate-800/50 p-3"
          >
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <RichText className="text-slate-200">{step.text}</RichText>
                {step.math && (
                  <div className="mt-2 overflow-x-auto text-indigo-200">
                    <Tex display>{step.math}</Tex>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-3">
        {!allRevealed ? (
          <button
            onClick={() => setRevealed((r) => Math.min(r + 1, steps.length))}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            Próximo passo →
          </button>
        ) : (
          answer && (
            <div className="rounded-lg border border-emerald-600/50 bg-emerald-500/10 px-4 py-2 text-emerald-200">
              <span className="mr-2 font-semibold">Resposta:</span>
              <Tex>{answer}</Tex>
            </div>
          )
        )}
        {revealed > 1 && (
          <button
            onClick={() => setRevealed(1)}
            className="text-sm text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
          >
            reiniciar
          </button>
        )}
        {!allRevealed && (
          <button
            onClick={() => setRevealed(steps.length)}
            className="text-sm text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
          >
            ver tudo
          </button>
        )}
      </div>
    </div>
  )
}
