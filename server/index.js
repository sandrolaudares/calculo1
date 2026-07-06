import express from 'express'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')

const PORT = process.env.PORT || 8080
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

const SYSTEM_PROMPT = `Você é o Calcul-AI, um tutor virtual especializado EXCLUSIVAMENTE em Cálculo Diferencial I (Cálculo I).

Tópicos permitidos: limites e continuidade; definição de derivada; regras de derivação (potência, produto, quociente, cadeia); derivadas de funções trigonométricas, exponenciais e logarítmicas; derivação implícita; aplicações da derivada (retas tangentes, taxas relacionadas, otimização/máximos e mínimos, análise de crescimento e concavidade, esboço de gráficos); teoremas (Teorema do Valor Médio, Teorema de Rolle, regra de L'Hôpital) e conceitos introdutórios de Cálculo I.

Regras de comportamento:
1. Responda APENAS a perguntas relacionadas a Cálculo I. Se a pergunta for sobre qualquer outro assunto (incluindo Cálculo II/integrais avançadas, outras disciplinas, temas gerais, código, conselhos pessoais etc.), RECUSE educadamente em uma frase e reconduza o aluno a fazer uma pergunta de Cálculo I. Não responda o conteúdo fora do escopo.
2. Seja didático: explique o raciocínio passo a passo, de forma clara e acolhedora, como um bom professor.
3. Sempre escreva fórmulas matemáticas em LaTeX. Use $...$ para fórmulas em linha e $$...$$ para fórmulas em bloco. Não use blocos de código para matemática.
4. Responda sempre em português do Brasil.
5. Quando fizer sentido, proponha um pequeno exercício de fixação ao final.`

const app = express()
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: OPENAI_MODEL, configured: Boolean(OPENAI_API_KEY) })
})

app.post('/api/chat', async (req, res) => {
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : []
  const cleaned = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }))

  if (cleaned.length === 0) {
    return res.status(400).json({ error: 'Envie ao menos uma mensagem.' })
  }

  if (!OPENAI_API_KEY) {
    return res.json({
      reply:
        'O Calcul-AI ainda não está conectado a um modelo de IA (falta a chave `OPENAI_API_KEY` no servidor). ' +
        'Assim que ela for configurada, respondo suas dúvidas de Cálculo I passo a passo. ' +
        'Exemplo do que poderei explicar: $\\lim_{x\\to 2}(x^2+3x-1)$ ou a derivada de $f(x)=\\sin(x)\\,e^x$.',
      demo: true,
    })
  }

  try {
    const upstream = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.3,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...cleaned],
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text()
      console.error('LLM error', upstream.status, detail)
      return res.status(502).json({ error: 'Não consegui falar com o modelo de IA agora. Tente novamente.' })
    }

    const data = await upstream.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return res.status(502).json({ error: 'O modelo não retornou resposta. Tente novamente.' })
    }
    return res.json({ reply })
  } catch (err) {
    console.error('chat handler error', err)
    return res.status(500).json({ error: 'Erro interno ao processar sua pergunta.' })
  }
})

app.use(express.static(distDir))
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Calcul-AI server rodando na porta ${PORT} (modelo: ${OPENAI_MODEL})`)
})
