import { useMemo } from 'react'

export type PlotCurve = {
  fn: (x: number) => number
  color?: string
  /** desenha a curva de forma tracejada (ex.: uma reta tangente) */
  dashed?: boolean
}

export type PlotPoint = {
  x: number
  y: number
  color?: string
  label?: string
  /** ponto "aberto" (círculo vazado), útil para descontinuidades */
  open?: boolean
}

type FunctionPlotProps = {
  curves: PlotCurve[]
  points?: PlotPoint[]
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  width?: number
  height?: number
}

const DEFAULT_COLORS = ['#818cf8', '#f472b6', '#34d399', '#fbbf24']

/**
 * Plotter de funções simples baseado em SVG (sem dependências externas).
 * Amostra cada curva ao longo do intervalo e desenha eixos, grade e pontos.
 */
export function FunctionPlot({
  curves,
  points = [],
  xMin = -5,
  xMax = 5,
  yMin = -5,
  yMax = 5,
  width = 480,
  height = 360,
}: FunctionPlotProps) {
  const pad = 28

  const toPx = useMemo(() => {
    const sx = (width - 2 * pad) / (xMax - xMin)
    const sy = (height - 2 * pad) / (yMax - yMin)
    return {
      x: (x: number) => pad + (x - xMin) * sx,
      y: (y: number) => height - pad - (y - yMin) * sy,
    }
  }, [width, height, xMin, xMax, yMin, yMax])

  const paths = useMemo(() => {
    const samples = 400
    return curves.map((curve) => {
      const segments: string[] = []
      let current: string[] = []
      for (let i = 0; i <= samples; i++) {
        const x = xMin + ((xMax - xMin) * i) / samples
        const y = curve.fn(x)
        if (!Number.isFinite(y) || y < yMin - 100 || y > yMax + 100) {
          if (current.length) segments.push(current.join(' '))
          current = []
          continue
        }
        current.push(`${current.length ? 'L' : 'M'} ${toPx.x(x)} ${toPx.y(y)}`)
      }
      if (current.length) segments.push(current.join(' '))
      return segments.join(' ')
    })
  }, [curves, xMin, xMax, yMin, yMax, toPx])

  const xTicks = ticks(xMin, xMax)
  const yTicks = ticks(yMin, yMax)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-lg rounded-lg bg-slate-950/60 ring-1 ring-slate-700"
      role="img"
      aria-label="Gráfico de função"
    >
      {/* grade */}
      {xTicks.map((t) => (
        <line
          key={`gx-${t}`}
          x1={toPx.x(t)}
          y1={pad}
          x2={toPx.x(t)}
          y2={height - pad}
          stroke="#1e293b"
          strokeWidth={1}
        />
      ))}
      {yTicks.map((t) => (
        <line
          key={`gy-${t}`}
          x1={pad}
          y1={toPx.y(t)}
          x2={width - pad}
          y2={toPx.y(t)}
          stroke="#1e293b"
          strokeWidth={1}
        />
      ))}

      {/* eixos */}
      {yMin <= 0 && yMax >= 0 && (
        <line
          x1={pad}
          y1={toPx.y(0)}
          x2={width - pad}
          y2={toPx.y(0)}
          stroke="#64748b"
          strokeWidth={1.5}
        />
      )}
      {xMin <= 0 && xMax >= 0 && (
        <line
          x1={toPx.x(0)}
          y1={pad}
          x2={toPx.x(0)}
          y2={height - pad}
          stroke="#64748b"
          strokeWidth={1.5}
        />
      )}

      {/* marcações numéricas */}
      {xTicks.map((t) => (
        <text
          key={`tx-${t}`}
          x={toPx.x(t)}
          y={toPx.y(0) + 14}
          fill="#94a3b8"
          fontSize={10}
          textAnchor="middle"
        >
          {t}
        </text>
      ))}
      {yTicks
        .filter((t) => t !== 0)
        .map((t) => (
          <text
            key={`ty-${t}`}
            x={toPx.x(0) - 6}
            y={toPx.y(t) + 3}
            fill="#94a3b8"
            fontSize={10}
            textAnchor="end"
          >
            {t}
          </text>
        ))}

      {/* curvas */}
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={curves[i].color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
          strokeWidth={2}
          strokeDasharray={curves[i].dashed ? '6 5' : undefined}
        />
      ))}

      {/* pontos */}
      {points.map((p, i) => (
        <g key={i}>
          <circle
            cx={toPx.x(p.x)}
            cy={toPx.y(p.y)}
            r={4}
            fill={p.open ? '#0f172a' : (p.color ?? '#f472b6')}
            stroke={p.color ?? '#f472b6'}
            strokeWidth={2}
          />
          {p.label && (
            <text
              x={toPx.x(p.x) + 8}
              y={toPx.y(p.y) - 8}
              fill="#e2e8f0"
              fontSize={11}
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}

function ticks(min: number, max: number): number[] {
  const result: number[] = []
  const start = Math.ceil(min)
  const end = Math.floor(max)
  const step = Math.max(1, Math.round((end - start) / 10))
  for (let t = start; t <= end; t += step) result.push(t)
  return result
}
