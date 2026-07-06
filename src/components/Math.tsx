import { useMemo } from 'react'
import katex from 'katex'

type MathProps = {
  children: string
  display?: boolean
  className?: string
}

/**
 * Renderiza uma expressão LaTeX usando KaTeX.
 * Use `display` para fórmulas em bloco (centralizadas) e sem ele para
 * fórmulas em linha.
 */
export function Math({ children, display = false, className }: MathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      })
    } catch {
      return children
    }
  }, [children, display])

  const Tag = display ? 'div' : 'span'
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
