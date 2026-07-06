import { useState } from 'react'
import type { QuizQuestion } from '../data/types'
import { RichText } from './RichText'

type QuizProps = {
  questions: QuizQuestion[]
}

/**
 * Quiz de múltipla escolha com feedback imediato por questão e
 * pontuação final.
 */
export function Quiz({ questions }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const answeredCount = Object.keys(answers).length
  const score = questions.reduce(
    (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
    0,
  )

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => {
        const chosen = answers[q.id]
        const answered = chosen !== undefined
        return (
          <div
            key={q.id}
            className="rounded-xl border border-slate-700 bg-slate-800/40 p-4"
          >
            <p className="mb-3 font-medium text-slate-100">
              <span className="mr-2 text-indigo-400">{qi + 1}.</span>
              <RichText>{q.question}</RichText>
            </p>
            <div className="grid gap-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi
                const isCorrect = oi === q.correctIndex
                let cls =
                  'border-slate-600 bg-slate-900/40 hover:border-indigo-400'
                if (answered) {
                  if (isCorrect)
                    cls = 'border-emerald-500 bg-emerald-500/15 text-emerald-100'
                  else if (isChosen)
                    cls = 'border-rose-500 bg-rose-500/15 text-rose-100'
                  else cls = 'border-slate-700 bg-slate-900/40 opacity-60'
                }
                return (
                  <button
                    key={oi}
                    disabled={answered}
                    onClick={() =>
                      setAnswers((a) => ({ ...a, [q.id]: oi }))
                    }
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${cls} disabled:cursor-default`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs">
                      {String.fromCharCode(97 + oi)}
                    </span>
                    <RichText>{opt}</RichText>
                  </button>
                )
              })}
            </div>
            {answered && (
              <div
                className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                  chosen === q.correctIndex
                    ? 'bg-emerald-500/10 text-emerald-200'
                    : 'bg-rose-500/10 text-rose-200'
                }`}
              >
                <span className="font-semibold">
                  {chosen === q.correctIndex ? 'Correto! ' : 'Não foi dessa vez. '}
                </span>
                <RichText>{q.explanation}</RichText>
              </div>
            )}
          </div>
        )
      })}

      {answeredCount > 0 && (
        <div className="sticky bottom-4 rounded-xl border border-indigo-500/40 bg-indigo-950/80 px-4 py-3 text-center backdrop-blur">
          <span className="text-slate-200">
            Pontuação:{' '}
            <strong className="text-indigo-300">
              {score} / {questions.length}
            </strong>{' '}
            <span className="text-slate-400">
              ({answeredCount} de {questions.length} respondidas)
            </span>
          </span>
        </div>
      )}
    </div>
  )
}
