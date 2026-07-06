---
name: testing-calculo1
description: Test the Cálculo Diferencial I PWA end-to-end (KaTeX rendering, topic nav, step-by-step examples, quiz, exercises, and the Calcul-AI chat) and deploy it to Fly.io. Use when verifying UI/content changes or deploying the calculo1 app.
---

# Cálculo Diferencial I (PWA) + Calcul-AI

App React + Vite + TS + Tailwind + KaTeX + vite-plugin-pwa. Now full-stack: an Express server (`server/index.js`) serves the built `dist/` AND proxies the **Calcul-AI** chat to an LLM.

## Run locally
```bash
npm install
npm run dev:all        # Vite (5173) + API (8080) together; Vite proxies /api -> :8080
# or separately:
npm run dev            # frontend only
npm run server         # API only (needs env vars below)
npm run build && npm run lint   # gate before PR
npm start              # production: node server/index.js (serves dist + /api)
```

## Calcul-AI backend (`server/index.js`)
- `POST /api/chat` `{ messages:[{role,content}] }` -> `{ reply }`. `GET /api/health` -> `{ ok, model, configured }`.
- Env: `OPENAI_API_KEY` (required for real answers; without it responds in "demo mode"), `OPENAI_BASE_URL` (default `https://api.openai.com/v1`), `OPENAI_MODEL` (default `gpt-4o-mini`), `PORT` (default 8080).
- **OpenAI-compatible**: works with Groq/OpenRouter etc. by setting `OPENAI_BASE_URL`. Current prod uses **Groq** (`https://api.groq.com/openai/v1`, model `llama-3.3-70b-versatile`) — the Groq key is stored in the Fly secret `OPENAI_API_KEY`.
- System prompt restricts answers to **Cálculo I**; off-topic questions are politely refused.

## Frontend chat (`src/components/CalculAiChat.tsx`)
- Floating "Calcul-AI" button (bottom-right, logo `public/calcul-ai-logo.png`) opens a panel with suggestion chips, input "Pergunte algo de Cálculo I…" + "Enviar". Integrated in `src/App.tsx`.
- Replies rendered via `RichText`, which handles inline `$...$` and block `$$...$$` KaTeX + line breaks.

## Golden-path checks
1. **KaTeX** (teoria): real math, not raw `\lim...`.
2. **Nav / StepByStep / Quiz / Exercícios**: see git history — steps reveal one-by-one; quiz wrong=red/correct=green + score; exercise normalizes answers (wrong rejected "Ainda não", correct "Boa! Resposta correta. ✔").
3. **Calcul-AI on-topic**: ask "Qual a derivada de x^2?" → step-by-step answer with rendered `f'(x)=2x`. A broken backend shows a red error instead.
4. **Calcul-AI off-topic**: ask for a recipe → polite refusal + redirect to Cálculo I (no recipe). A broken system prompt would answer the recipe.

## Deploy (Fly.io)
- App: `calculo1-calcul-ai` (region `gru`), URL https://calculo1-calcul-ai.fly.dev. `Dockerfile` (multi-stage: build frontend → Node runtime serving dist+API), `fly.toml` (internal_port 8080).
- flyctl auth via `FLY_API_TOKEN` env (token-based; `flyctl auth whoami` works without interactive login).
- Deploy: `flyctl deploy --remote-only` (remote builder; no local Docker needed). Changing `[env]` in fly.toml requires a full `flyctl deploy`, not just `flyctl secrets set`.
- Secrets: `flyctl secrets set OPENAI_API_KEY="$KEY"` (pass value via shell env expansion so it never appears in logs). Setting a secret triggers a rolling restart.

## Gotchas
- After clicking "Próximo passo", the button moves down — re-screenshot before the next click.
- `flyctl secrets import` expects `NAME=VALUE` on stdin; prefer `flyctl secrets set NAME="$VAR"`.
- OpenAI 429 `insufficient_quota` = the OpenAI account has no credits (not a code bug); switch provider via `OPENAI_BASE_URL` or add billing.

## Devin Secrets Needed
- `OPENAI_API_KEY` (or a Groq/OpenRouter key placed there) for real chat answers. `FLY_API_TOKEN` for deploys (already in env).
