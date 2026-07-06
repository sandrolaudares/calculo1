import { Fragment } from 'react'
import { Math } from './Math'

type RichTextProps = {
  children: string
  className?: string
}

/**
 * Renderiza um texto contendo trechos de LaTeX delimitados por `$...$`.
 * Ex.: "A derivada de $x^2$ é $2x$." renderiza as fórmulas inline.
 */
export function RichText({ children, className }: RichTextProps) {
  const parts = children.split(/(\$[^$]+\$)/g)
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 1) {
          return <Math key={i}>{part.slice(1, -1)}</Math>
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </span>
  )
}
