---
name: testing-calculo1
description: Test the Cálculo Diferencial I PWA end-to-end (KaTeX rendering, topic nav, step-by-step examples, quiz, exercises). Use when verifying UI or content changes in the calculo1 app.
---

# Testing — Cálculo Diferencial I (PWA)

App React + Vite + TS + Tailwind + KaTeX + vite-plugin-pwa. Frontend-only, no backend/credentials.

## Run locally
```bash
npm install
npm run dev -- --port 5173 --host   # http://localhost:5173
npm run build && npm run lint        # gate before PR
```

## Layout / how to reach features
- Sidebar (`src/App.tsx`) switches topic; on mobile use the "Tópicos" button in the header.
- Content area (`src/components/TopicView.tsx`) has 4 tabs: **Teoria / Exemplos resolvidos / Quiz / Exercícios**.
- Content is data-driven in `src/data/topics.ts` (types in `src/data/types.ts`) — adding/editing matter is done there, not in components.

## Golden-path checks (each distinguishes working vs broken)
1. **KaTeX**: teoria must show real math (lim, frações, √), NOT raw `\lim...`. Broken KaTeX shows raw LaTeX or a red error box.
2. **Nav**: clicking a sidebar topic changes the `<h1>` title + content.
3. **StepByStep** (`Exemplos`): only step 1 shows initially; "Próximo passo →" reveals one step at a time; final step shows a green "Resposta:" box. Plots are inline SVG (`FunctionPlot`), points with `open:true` render as hollow circles (descontinuidades).
4. **Quiz**: wrong option → red + "Não foi dessa vez"; correct → green + "Correto!"; score "Pontuação: X / N" updates. Options are disabled after answering.
5. **Exercícios** (`ExerciseCard`): answer check is normalized (lowercase, strips spaces/`*`/`·`) against `acceptedAnswers`. Test a wrong value (rejected: "Ainda não") AND the correct value (accepted: "Boa! Resposta correta. ✔"). "💡 Dica" reveals hints progressively.

## Gotchas
- After clicking "Próximo passo", the button moves down — re-screenshot before the next click; clicking a stale coordinate does nothing (page "unchanged").
- Use the annotated DOM to read rendered math text (KaTeX puts a readable copy in the DOM) instead of eyeballing.
- Vite 8 / TS 6 / ESLint 10 are recent majors; if `npm install` warns EBADENGINE, Node 20.19+ / 22.12+ is required.

## Devin Secrets Needed
None — fully local frontend app.
