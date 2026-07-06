# Cálculo Diferencial I

Aplicativo web (PWA) didático para estudar **Cálculo Diferencial I**. Cada
tópico traz teoria resumida, **exemplos resolvidos passo a passo**, um **quiz**
de múltipla escolha com feedback e **exercícios propostos** com dicas
progressivas e resolução comentada.

## Tópicos

- **Limites** — substituição direta, indeterminações $0/0$, fatoração e racionalização
- **Continuidade** — as três condições, descontinuidades e continuidade por definição
- **Derivada: definição** — quociente de Newton, regra da potência e reta tangente
- **Regras de derivação** — produto, quociente e regra da cadeia
- **Aplicações** — máximos/mínimos, otimização e taxas relacionadas

## Recursos didáticos

- Fórmulas renderizadas com **KaTeX**
- Gráficos de funções em SVG (sem dependências externas), com pontos e retas tangentes
- Resolução **revelada um passo por vez** para incentivar o raciocínio
- Verificação de respostas nos exercícios e sistema de dicas
- Funciona offline como **PWA** (instalável no celular)

## Stack

React + TypeScript + Vite + Tailwind CSS + KaTeX + vite-plugin-pwa.

## Desenvolvimento

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run preview  # pré-visualiza o build
npm run lint     # ESLint
```
