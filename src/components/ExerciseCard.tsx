import { useState } from 'react'
import type { Exercise } from '../data/types'
import { RichText } from './RichText'

type ExerciseCardProps = {
  exercise: Exercise
  index: number
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\*/g, '')
    .replace(/·/g, '')
    .trim()
}

/**
 * Exercício proposto: o aluno digita a resposta, pede dicas progressivas
 * e pode conferir a resolução comentada.
 */
export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  function check() {
    if (!value.trim()) return
    const ok = exercise.acceptedAnswers.some(
      (a) => normalize(a) === normalize(value),
    )
    setStatus(ok ? 'correct' : 'wrong')
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-4">
      <p className="mb-3 font-medium text-slate-100">
        <span className="mr-2 text-indigo-400">Exercício {index + 1}.</span>
        <RichText>{exercise.prompt}</RichText>
      </p>

      <div className="flex flex-wrap gap-2">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setStatus('idle')
          }}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          placeholder="Digite sua resposta…"
          className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none focus:border-indigo-400"
        />
        <button
          onClick={check}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          Verificar
        </button>
      </div>

      {status === 'correct' && (
        <p className="mt-2 text-sm text-emerald-300">
          Boa! Resposta correta. ✔
        </p>
      )}
      {status === 'wrong' && (
        <p className="mt-2 text-sm text-rose-300">
          Ainda não. Tente usar uma dica ou reveja o passo a passo.
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-3 text-sm">
        {hintsShown < exercise.hints.length && (
          <button
            onClick={() => setHintsShown((h) => h + 1)}
            className="text-amber-300 underline-offset-2 hover:underline"
          >
            💡 Dica ({hintsShown + 1}/{exercise.hints.length})
          </button>
        )}
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
        >
          {showSolution ? 'Ocultar resolução' : 'Ver resolução'}
        </button>
      </div>

      {hintsShown > 0 && (
        <ul className="mt-2 space-y-1">
          {exercise.hints.slice(0, hintsShown).map((h, i) => (
            <li key={i} className="text-sm text-amber-200/90">
              <RichText>{h}</RichText>
            </li>
          ))}
        </ul>
      )}

      {showSolution && (
        <div className="mt-3 rounded-lg border border-slate-600 bg-slate-900/50 p-3 text-sm text-slate-200">
          <RichText>{exercise.solution}</RichText>
        </div>
      )}
    </div>
  )
}
