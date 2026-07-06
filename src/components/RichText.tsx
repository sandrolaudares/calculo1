import { Fragment } from 'react'
import { Math } from './Math'

type RichTextProps = {
  children: string
  className?: string
}

/**
 * Renderiza texto com LaTeX: blocos delimitados por `$$...$$` (display) e
 * trechos em linha por `$...$`. Quebras de linha viram <br/>.
 * Ex.: "A derivada de $x^2$ é $2x$." renderiza as fórmulas inline.
 */
export function RichText({ children, className }: RichTextProps) {
  const parts = children.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g)
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 3) {
          return (
            <Math key={i} display>
              {part.slice(2, -2)}
            </Math>
          )
        }
        if (part.startsWith('$') && part.endsWith('$') && part.length > 1) {
          return <Math key={i}>{part.slice(1, -1)}</Math>
        }
        const lines = part.split('\n')
        return (
          <Fragment key={i}>
            {lines.map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </Fragment>
        )
      })}
    </span>
  )
}
