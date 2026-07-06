import type { PlotCurve, PlotPoint } from '../components/FunctionPlot'

export type PlotConfig = {
  curves: PlotCurve[]
  points?: PlotPoint[]
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
}

export type Step = {
  /** texto explicativo (pode conter LaTeX inline entre $...$) */
  text: string
  /** fórmula em bloco exibida abaixo do texto (LaTeX, sem os $) */
  math?: string
}

export type SolvedExample = {
  id: string
  title: string
  /** enunciado (pode conter LaTeX inline entre $...$) */
  statement: string
  steps: Step[]
  /** resposta final (LaTeX, sem os $) */
  answer: string
  plot?: PlotConfig
}

export type QuizQuestion = {
  id: string
  /** pergunta (pode conter LaTeX inline entre $...$) */
  question: string
  /** alternativas (podem conter LaTeX inline entre $...$) */
  options: string[]
  correctIndex: number
  /** explicação exibida após responder (pode conter LaTeX inline) */
  explanation: string
}

export type Exercise = {
  id: string
  prompt: string
  hints: string[]
  /** respostas aceitas (comparação tolerante a espaços/maiúsculas) */
  acceptedAnswers: string[]
  /** resolução comentada revelada ao final */
  solution: string
}

export type Topic = {
  id: string
  title: string
  emoji: string
  summary: string
  /** blocos teóricos introdutórios */
  theory: Step[]
  examples: SolvedExample[]
  quiz: QuizQuestion[]
  exercises: Exercise[]
}
