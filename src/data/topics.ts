import type { Topic } from './types'

export const topics: Topic[] = [
  {
    id: 'limites',
    title: 'Limites',
    emoji: '📉',
    summary:
      'O conceito fundamental do Cálculo: para onde a função se aproxima quando x tende a um valor.',
    theory: [
      {
        text: 'Dizemos que o limite de $f(x)$ quando $x$ tende a $a$ é $L$ quando podemos deixar $f(x)$ tão próximo de $L$ quanto quisermos, bastando aproximar $x$ de $a$ (sem precisar que $x = a$).',
        math: '\\lim_{x \\to a} f(x) = L',
      },
      {
        text: 'O limite só existe quando os limites laterais coincidem: o que vem pela esquerda deve ser igual ao que vem pela direita.',
        math: '\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L',
      },
      {
        text: 'Para funções polinomiais e racionais contínuas, basta substituir. A dificuldade aparece nas indeterminações do tipo $\\tfrac{0}{0}$, que exigem manipulação algébrica (fatorar, racionalizar, simplificar).',
      },
      {
        text: 'Limite fundamental trigonométrico, muito usado para funções com seno próximo de zero:',
        math: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
      },
    ],
    examples: [
      {
        id: 'lim-ex1',
        title: 'Limite por substituição direta',
        statement: 'Calcule $\\lim_{x \\to 2} (x^2 + 3x - 1)$.',
        steps: [
          {
            text: 'A função é um polinômio, portanto é contínua em todo ponto. Basta substituir $x = 2$.',
            math: '(2)^2 + 3(2) - 1',
          },
          {
            text: 'Efetuando as contas:',
            math: '4 + 6 - 1 = 9',
          },
        ],
        answer: '9',
        plot: {
          curves: [{ fn: (x) => x * x + 3 * x - 1 }],
          points: [{ x: 2, y: 9, label: '(2, 9)' }],
          xMin: -6,
          xMax: 4,
          yMin: -6,
          yMax: 12,
        },
      },
      {
        id: 'lim-ex2',
        title: 'Indeterminação 0/0 — fatoração',
        statement: 'Calcule $\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}$.',
        steps: [
          {
            text: 'Substituindo $x = 3$ obtemos $\\tfrac{0}{0}$, uma indeterminação. Precisamos simplificar.',
          },
          {
            text: 'Fatoramos o numerador como diferença de quadrados: $x^2 - 9 = (x-3)(x+3)$.',
            math: '\\frac{(x-3)(x+3)}{x-3}',
          },
          {
            text: 'Como $x \\to 3$ mas $x \\neq 3$, podemos cancelar o fator $(x-3)$.',
            math: '= x + 3',
          },
          {
            text: 'Agora substituímos $x = 3$ na expressão simplificada.',
            math: '3 + 3 = 6',
          },
        ],
        answer: '6',
        plot: {
          curves: [{ fn: (x) => x + 3 }],
          points: [{ x: 3, y: 6, label: '(3, 6)', open: true }],
          xMin: -2,
          xMax: 6,
          yMin: -1,
          yMax: 10,
        },
      },
      {
        id: 'lim-ex3',
        title: 'Racionalização',
        statement: 'Calcule $\\lim_{x \\to 0} \\dfrac{\\sqrt{x+1} - 1}{x}$.',
        steps: [
          {
            text: 'Substituindo $x = 0$ obtemos $\\tfrac{0}{0}$. Vamos racionalizar multiplicando pelo conjugado.',
            math: '\\frac{\\sqrt{x+1}-1}{x} \\cdot \\frac{\\sqrt{x+1}+1}{\\sqrt{x+1}+1}',
          },
          {
            text: 'No numerador aplicamos $(a-b)(a+b) = a^2 - b^2$:',
            math: '\\frac{(x+1) - 1}{x\\,(\\sqrt{x+1}+1)} = \\frac{x}{x\\,(\\sqrt{x+1}+1)}',
          },
          {
            text: 'Cancelamos o $x$ e substituímos $x = 0$.',
            math: '\\frac{1}{\\sqrt{0+1}+1} = \\frac{1}{2}',
          },
        ],
        answer: '\\dfrac{1}{2}',
      },
    ],
    quiz: [
      {
        id: 'lim-q1',
        question: 'Quanto vale $\\lim_{x \\to 1} (2x + 5)$?',
        options: ['$5$', '$7$', '$2$', 'Não existe'],
        correctIndex: 1,
        explanation:
          'Função linear (contínua): substituímos $x=1$, obtendo $2(1)+5 = 7$.',
      },
      {
        id: 'lim-q2',
        question: 'O limite $\\lim_{x \\to a} f(x)$ existe quando:',
        options: [
          '$f(a)$ está definido',
          'os limites laterais são iguais',
          'a função é polinomial',
          'o gráfico passa pela origem',
        ],
        correctIndex: 1,
        explanation:
          'O limite existe se e somente se $\\lim_{x\\to a^-} f = \\lim_{x\\to a^+} f$. Não é necessário que $f(a)$ exista.',
      },
      {
        id: 'lim-q3',
        question: 'Calcule $\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}$.',
        options: ['$0$', '$2$', '$4$', 'Não existe'],
        correctIndex: 2,
        explanation:
          'Fatorando: $\\frac{(x-2)(x+2)}{x-2} = x+2$, e em $x=2$ vale $4$.',
      },
    ],
    exercises: [
      {
        id: 'lim-e1',
        prompt: 'Calcule $\\lim_{x \\to 4} (3x - 5)$.',
        hints: ['A função é linear, logo contínua.', 'Basta substituir $x=4$.'],
        acceptedAnswers: ['7'],
        solution: 'Substituindo: $3(4) - 5 = 12 - 5 = 7$.',
      },
      {
        id: 'lim-e2',
        prompt: 'Calcule $\\lim_{x \\to 5} \\dfrac{x^2 - 25}{x - 5}$.',
        hints: [
          'Substituir dá $0/0$ — fatore o numerador.',
          '$x^2 - 25 = (x-5)(x+5)$.',
        ],
        acceptedAnswers: ['10'],
        solution:
          'Fatorando e cancelando: $\\frac{(x-5)(x+5)}{x-5} = x+5$. Em $x=5$: $10$.',
      },
    ],
  },

  {
    id: 'continuidade',
    title: 'Continuidade',
    emoji: '🔗',
    summary:
      'Quando uma função pode ser desenhada sem tirar o lápis do papel — sem saltos nem furos.',
    theory: [
      {
        text: 'Uma função $f$ é contínua em $x = a$ quando três condições valem ao mesmo tempo:',
        math: '\\text{(i) } f(a)\\ \\text{existe};\\quad \\text{(ii) } \\lim_{x\\to a} f(x)\\ \\text{existe};\\quad \\text{(iii) } \\lim_{x\\to a} f(x) = f(a)',
      },
      {
        text: 'Se qualquer uma dessas condições falhar, dizemos que há uma descontinuidade em $a$ (um furo, um salto ou uma assíntota).',
      },
      {
        text: 'Polinômios são contínuos em toda a reta. Funções racionais são contínuas exceto onde o denominador se anula.',
      },
    ],
    examples: [
      {
        id: 'cont-ex1',
        title: 'Verificando continuidade',
        statement:
          'A função $f(x) = \\dfrac{x^2 - 1}{x - 1}$ é contínua em $x = 1$?',
        steps: [
          {
            text: 'Testamos $f(1)$: o denominador se anula, então $f(1)$ não está definido. Já falha a condição (i).',
          },
          {
            text: 'O limite existe: fatorando, $\\frac{(x-1)(x+1)}{x-1} = x+1 \\to 2$. Mas como $f(1)$ não existe, a função é descontínua em $x=1$.',
          },
          {
            text: 'É uma descontinuidade removível: bastaria definir $f(1) = 2$ para "tapar o furo".',
          },
        ],
        answer: '\\text{Descontínua (furo removível em } x=1)',
        plot: {
          curves: [{ fn: (x) => x + 1 }],
          points: [{ x: 1, y: 2, label: 'furo', open: true }],
          xMin: -4,
          xMax: 4,
          yMin: -3,
          yMax: 5,
        },
      },
      {
        id: 'cont-ex2',
        title: 'Encontrando o valor que torna contínua',
        statement:
          'Para qual valor de $k$ a função definida por $f(x) = \\tfrac{x^2-4}{x-2}$ (para $x \\neq 2$) e $f(2) = k$ é contínua em $x=2$?',
        steps: [
          {
            text: 'Para continuidade precisamos de $\\lim_{x\\to 2} f(x) = f(2) = k$.',
          },
          {
            text: 'Calculamos o limite fatorando: $\\frac{(x-2)(x+2)}{x-2} = x+2 \\to 4$.',
            math: '\\lim_{x\\to 2} f(x) = 4',
          },
          {
            text: 'Portanto, precisamos de $k = 4$.',
          },
        ],
        answer: 'k = 4',
      },
    ],
    quiz: [
      {
        id: 'cont-q1',
        question:
          'Quantas condições precisam valer para $f$ ser contínua em $x=a$?',
        options: ['$1$', '$2$', '$3$', '$4$'],
        correctIndex: 2,
        explanation:
          'São três: $f(a)$ existe, o limite existe e eles são iguais.',
      },
      {
        id: 'cont-q2',
        question: 'Uma função racional é descontínua onde:',
        options: [
          'o numerador se anula',
          'o denominador se anula',
          'em $x=0$ sempre',
          'nunca é descontínua',
        ],
        correctIndex: 1,
        explanation:
          'Onde o denominador zera a função não está definida, gerando descontinuidade.',
      },
    ],
    exercises: [
      {
        id: 'cont-e1',
        prompt:
          'Qual valor de $k$ torna contínua a função com $f(x)=\\tfrac{x^2-9}{x-3}$ ($x\\neq 3$) e $f(3)=k$?',
        hints: [
          'Calcule $\\lim_{x\\to 3} f(x)$ fatorando.',
          '$x^2-9=(x-3)(x+3)$.',
        ],
        acceptedAnswers: ['6', 'k=6'],
        solution:
          'O limite é $x+3 \\to 6$, logo $k = 6$ torna a função contínua.',
      },
    ],
  },

  {
    id: 'derivada-definicao',
    title: 'Derivada: definição',
    emoji: '📈',
    summary:
      'A taxa de variação instantânea — a inclinação da reta tangente ao gráfico.',
    theory: [
      {
        text: 'A derivada de $f$ em $x$ é o limite do quociente de Newton (a inclinação da secante virando tangente):',
        math: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
      },
      {
        text: 'Geometricamente, $f\'(a)$ é o coeficiente angular da reta tangente ao gráfico de $f$ no ponto $(a, f(a))$.',
      },
      {
        text: 'A reta tangente no ponto $x=a$ tem equação:',
        math: "y = f(a) + f'(a)\\,(x - a)",
      },
      {
        text: 'Regra da potência (consequência da definição), válida para qualquer expoente $n$:',
        math: "\\frac{d}{dx}\\,x^n = n\\,x^{n-1}",
      },
    ],
    examples: [
      {
        id: 'der-ex1',
        title: 'Derivada pela definição',
        statement: 'Use a definição para calcular a derivada de $f(x) = x^2$.',
        steps: [
          {
            text: 'Montamos o quociente de Newton com $f(x)=x^2$.',
            math: "f'(x) = \\lim_{h\\to 0} \\frac{(x+h)^2 - x^2}{h}",
          },
          {
            text: 'Expandimos $(x+h)^2 = x^2 + 2xh + h^2$ e simplificamos.',
            math: '\\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{2xh + h^2}{h}',
          },
          {
            text: 'Cancelamos $h$ (pois $h \\neq 0$ no limite):',
            math: '2x + h',
          },
          {
            text: 'Fazendo $h \\to 0$:',
            math: "f'(x) = 2x",
          },
        ],
        answer: "f'(x) = 2x",
        plot: {
          curves: [
            { fn: (x) => x * x },
            { fn: (x) => 2 * 1 * (x - 1) + 1, color: '#f472b6', dashed: true },
          ],
          points: [{ x: 1, y: 1, label: 'tangente em x=1' }],
          xMin: -3,
          xMax: 3,
          yMin: -2,
          yMax: 8,
        },
      },
      {
        id: 'der-ex2',
        title: 'Equação da reta tangente',
        statement:
          'Encontre a reta tangente a $f(x) = x^2$ no ponto $x = 1$.',
        steps: [
          {
            text: 'Calculamos $f(1) = 1$ e usamos $f\'(x) = 2x$, logo $f\'(1) = 2$.',
          },
          {
            text: 'Aplicamos a fórmula da tangente $y = f(a) + f\'(a)(x-a)$ com $a=1$.',
            math: 'y = 1 + 2(x - 1)',
          },
          {
            text: 'Simplificando:',
            math: 'y = 2x - 1',
          },
        ],
        answer: 'y = 2x - 1',
        plot: {
          curves: [
            { fn: (x) => x * x },
            { fn: (x) => 2 * x - 1, color: '#f472b6', dashed: true },
          ],
          points: [{ x: 1, y: 1, label: '(1, 1)' }],
          xMin: -3,
          xMax: 3,
          yMin: -2,
          yMax: 8,
        },
      },
    ],
    quiz: [
      {
        id: 'der-q1',
        question: 'Qual é a derivada de $f(x) = x^5$?',
        options: ['$5x^4$', '$x^4$', '$5x^6$', '$4x^5$'],
        correctIndex: 0,
        explanation: 'Regra da potência: $\\frac{d}{dx}x^5 = 5x^{4}$.',
      },
      {
        id: 'der-q2',
        question: 'A derivada $f\'(a)$ representa geometricamente:',
        options: [
          'a área sob a curva',
          'a inclinação da reta tangente em $a$',
          'o valor máximo de $f$',
          'a raiz de $f$',
        ],
        correctIndex: 1,
        explanation:
          '$f\'(a)$ é o coeficiente angular (inclinação) da reta tangente em $(a, f(a))$.',
      },
      {
        id: 'der-q3',
        question: 'Qual a derivada de $f(x) = 7$ (constante)?',
        options: ['$7$', '$7x$', '$0$', '$1$'],
        correctIndex: 2,
        explanation: 'A derivada de qualquer constante é $0$.',
      },
    ],
    exercises: [
      {
        id: 'der-e1',
        prompt: 'Calcule a derivada de $f(x) = x^3$.',
        hints: ['Use a regra da potência.', '$\\frac{d}{dx}x^n = n x^{n-1}$.'],
        acceptedAnswers: ['3x^2', '3x²', '3*x^2'],
        solution: 'Pela regra da potência: $f\'(x) = 3x^{2}$.',
      },
      {
        id: 'der-e2',
        prompt:
          'Qual o coeficiente angular da tangente a $f(x)=x^2$ em $x=3$?',
        hints: ['$f\'(x) = 2x$.', 'Substitua $x=3$.'],
        acceptedAnswers: ['6'],
        solution: 'Como $f\'(x)=2x$, em $x=3$ a inclinação é $2(3)=6$.',
      },
    ],
  },

  {
    id: 'regras-derivacao',
    title: 'Regras de derivação',
    emoji: '⚙️',
    summary:
      'Produto, quociente e a poderosa regra da cadeia para derivar funções compostas.',
    theory: [
      {
        text: 'Regra do produto: a derivada de um produto não é o produto das derivadas!',
        math: "(f\\cdot g)' = f'\\,g + f\\,g'",
      },
      {
        text: 'Regra do quociente:',
        math: "\\left(\\frac{f}{g}\\right)' = \\frac{f'\\,g - f\\,g'}{g^2}",
      },
      {
        text: 'Regra da cadeia (funções compostas) — derive a de fora mantendo a de dentro, e multiplique pela derivada da de dentro:',
        math: "\\big(f(g(x))\\big)' = f'(g(x))\\cdot g'(x)",
      },
      {
        text: 'Derivadas úteis:',
        math: "(\\sin x)' = \\cos x,\\quad (\\cos x)' = -\\sin x,\\quad (e^x)' = e^x,\\quad (\\ln x)' = \\tfrac{1}{x}",
      },
    ],
    examples: [
      {
        id: 'reg-ex1',
        title: 'Regra do produto',
        statement: 'Derive $f(x) = x^2 \\sin x$.',
        steps: [
          {
            text: 'Identificamos $u = x^2$ e $v = \\sin x$, com $u\' = 2x$ e $v\' = \\cos x$.',
          },
          {
            text: 'Aplicamos $(uv)\' = u\'v + uv\'$.',
            math: "f'(x) = 2x\\sin x + x^2\\cos x",
          },
        ],
        answer: "f'(x) = 2x\\sin x + x^2\\cos x",
      },
      {
        id: 'reg-ex2',
        title: 'Regra da cadeia',
        statement: 'Derive $f(x) = (3x^2 + 1)^4$.',
        steps: [
          {
            text: 'A função "de fora" é $u^4$ e a "de dentro" é $u = 3x^2 + 1$.',
          },
          {
            text: 'Derivada de fora: $4u^3$. Derivada de dentro: $u\' = 6x$.',
          },
          {
            text: 'Multiplicamos (regra da cadeia):',
            math: "f'(x) = 4(3x^2+1)^3 \\cdot 6x = 24x\\,(3x^2+1)^3",
          },
        ],
        answer: "f'(x) = 24x\\,(3x^2+1)^3",
      },
      {
        id: 'reg-ex3',
        title: 'Regra do quociente',
        statement: 'Derive $f(x) = \\dfrac{x}{x+1}$.',
        steps: [
          {
            text: 'Com $u = x$ ($u\'=1$) e $v = x+1$ ($v\'=1$), aplicamos a regra do quociente.',
            math: "f'(x) = \\frac{1\\cdot(x+1) - x\\cdot 1}{(x+1)^2}",
          },
          {
            text: 'Simplificando o numerador $x+1-x = 1$:',
            math: "f'(x) = \\frac{1}{(x+1)^2}",
          },
        ],
        answer: "f'(x) = \\dfrac{1}{(x+1)^2}",
      },
    ],
    quiz: [
      {
        id: 'reg-q1',
        question: 'A derivada de $f(x) = x^2 e^x$ é:',
        options: [
          '$2x e^x$',
          '$2x e^x + x^2 e^x$',
          '$x^2 e^x$',
          '$2x + e^x$',
        ],
        correctIndex: 1,
        explanation:
          'Regra do produto: $2x\\,e^x + x^2 e^x = e^x(2x + x^2)$.',
      },
      {
        id: 'reg-q2',
        question: 'Derivando $f(x) = \\sin(5x)$ obtemos:',
        options: ['$\\cos(5x)$', '$5\\cos(5x)$', '$-5\\cos(5x)$', '$5\\sin(5x)$'],
        correctIndex: 1,
        explanation:
          'Regra da cadeia: derivada de fora $\\cos(5x)$ vezes derivada de dentro $5$.',
      },
    ],
    exercises: [
      {
        id: 'reg-e1',
        prompt: 'Derive $f(x) = (2x+1)^3$.',
        hints: [
          'Use a regra da cadeia.',
          'Fora: $u^3 \\to 3u^2$. Dentro: derivada de $2x+1$ é $2$.',
        ],
        acceptedAnswers: ['6(2x+1)^2', '6(2x+1)²'],
        solution:
          'Cadeia: $3(2x+1)^2 \\cdot 2 = 6(2x+1)^2$.',
      },
      {
        id: 'reg-e2',
        prompt: 'Derive $f(x) = x\\cos x$.',
        hints: ['Regra do produto.', '$u=x,\\ v=\\cos x$.'],
        acceptedAnswers: ['cosx-xsinx', 'cos x - x sin x', '\\cos x - x\\sin x'],
        solution:
          'Produto: $1\\cdot\\cos x + x\\cdot(-\\sin x) = \\cos x - x\\sin x$.',
      },
    ],
  },

  {
    id: 'aplicacoes',
    title: 'Aplicações',
    emoji: '🎯',
    summary:
      'Otimização (máximos e mínimos) e taxas relacionadas — a derivada resolvendo problemas reais.',
    theory: [
      {
        text: 'Pontos críticos são onde $f\'(x) = 0$ ou onde $f\'$ não existe. Máximos e mínimos ocorrem nesses pontos (ou nas bordas do intervalo).',
        math: "f'(x) = 0",
      },
      {
        text: 'Teste da primeira derivada: se $f\'$ muda de $+$ para $-$, há máximo local; de $-$ para $+$, há mínimo local.',
      },
      {
        text: 'Teste da segunda derivada: se $f\'(c)=0$ e $f\'\'(c) > 0$, então $c$ é mínimo; se $f\'\'(c) < 0$, é máximo.',
        math: "f''(c) > 0 \\Rightarrow \\text{mínimo}, \\quad f''(c) < 0 \\Rightarrow \\text{máximo}",
      },
      {
        text: 'Taxas relacionadas: derivamos uma relação em função do tempo $t$ (regra da cadeia) para ligar as taxas de variação das grandezas.',
      },
    ],
    examples: [
      {
        id: 'apl-ex1',
        title: 'Máximos e mínimos',
        statement:
          'Encontre os extremos de $f(x) = x^3 - 3x$.',
        steps: [
          {
            text: 'Derivamos e igualamos a zero para achar os pontos críticos.',
            math: "f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1",
          },
          {
            text: 'Segunda derivada: $f\'\'(x) = 6x$. Em $x=1$: $f\'\'(1)=6>0$ (mínimo). Em $x=-1$: $f\'\'(-1)=-6<0$ (máximo).',
          },
          {
            text: 'Valores: $f(-1) = -1+3 = 2$ (máximo local) e $f(1) = 1-3 = -2$ (mínimo local).',
          },
        ],
        answer: '\\text{máx local } (-1, 2),\\ \\text{mín local } (1, -2)',
        plot: {
          curves: [{ fn: (x) => x ** 3 - 3 * x }],
          points: [
            { x: -1, y: 2, label: 'máx' },
            { x: 1, y: -2, label: 'mín' },
          ],
          xMin: -3,
          xMax: 3,
          yMin: -4,
          yMax: 4,
        },
      },
      {
        id: 'apl-ex2',
        title: 'Problema de otimização',
        statement:
          'Um fazendeiro tem 100 m de cerca para um curral retangular. Quais dimensões maximizam a área?',
        steps: [
          {
            text: 'Perímetro: $2x + 2y = 100$, logo $y = 50 - x$. Área: $A = x\\,y$.',
            math: 'A(x) = x(50 - x) = 50x - x^2',
          },
          {
            text: 'Derivamos e igualamos a zero.',
            math: "A'(x) = 50 - 2x = 0 \\Rightarrow x = 25",
          },
          {
            text: 'Como $A\'\'(x) = -2 < 0$, é máximo. Então $y = 50 - 25 = 25$.',
          },
          {
            text: 'O curral é um quadrado de $25 \\times 25$, com área máxima $625\\,\\text{m}^2$.',
          },
        ],
        answer: '25 \\times 25\\ \\text{m},\\ A = 625\\,\\text{m}^2',
        plot: {
          curves: [{ fn: (x) => 50 * x - x * x }],
          points: [{ x: 25, y: 625, label: 'máx' }],
          xMin: 0,
          xMax: 50,
          yMin: 0,
          yMax: 700,
        },
      },
      {
        id: 'apl-ex3',
        title: 'Taxas relacionadas',
        statement:
          'O raio de um círculo cresce a $2\\,\\text{cm/s}$. A que taxa cresce a área quando $r = 5\\,\\text{cm}$?',
        steps: [
          {
            text: 'Relação: $A = \\pi r^2$. Derivamos em relação ao tempo $t$ (regra da cadeia).',
            math: '\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}',
          },
          {
            text: 'Substituímos $r = 5$ e $\\frac{dr}{dt} = 2$.',
            math: '\\frac{dA}{dt} = 2\\pi (5)(2) = 20\\pi',
          },
          {
            text: 'A área cresce a $20\\pi \\approx 62{,}8\\,\\text{cm}^2/\\text{s}$.',
          },
        ],
        answer: '\\dfrac{dA}{dt} = 20\\pi\\,\\text{cm}^2/\\text{s}',
      },
    ],
    quiz: [
      {
        id: 'apl-q1',
        question: 'Um ponto crítico de $f$ ocorre quando:',
        options: [
          "$f(x) = 0$",
          "$f'(x) = 0$ ou não existe",
          "$f''(x) = 0$",
          '$x = 0$',
        ],
        correctIndex: 1,
        explanation:
          'Pontos críticos são onde a derivada se anula ou não existe.',
      },
      {
        id: 'apl-q2',
        question:
          'Se $f\'(c) = 0$ e $f\'\'(c) < 0$, então em $c$ há:',
        options: [
          'mínimo local',
          'máximo local',
          'ponto de inflexão',
          'nada se pode afirmar',
        ],
        correctIndex: 1,
        explanation:
          'Segunda derivada negativa indica concavidade para baixo → máximo local.',
      },
    ],
    exercises: [
      {
        id: 'apl-e1',
        prompt:
          'Ache o ponto crítico de $f(x) = x^2 - 6x + 5$ e diga se é máx ou mín.',
        hints: ['$f\'(x) = 2x - 6$.', 'Iguale a zero e olhe a concavidade.'],
        acceptedAnswers: ['x=3', '3', 'x=3 mínimo', 'mínimo em x=3'],
        solution:
          '$f\'(x)=2x-6=0 \\Rightarrow x=3$. Como $f\'\'(x)=2>0$, é um mínimo em $x=3$.',
      },
      {
        id: 'apl-e2',
        prompt:
          'A área de um quadrado de lado $L$ varia com $dL/dt = 3$. Quanto vale $dA/dt$ quando $L=4$?',
        hints: ['$A = L^2$.', '$dA/dt = 2L\\,dL/dt$.'],
        acceptedAnswers: ['24'],
        solution:
          '$\\frac{dA}{dt} = 2L\\frac{dL}{dt} = 2(4)(3) = 24$.',
      },
    ],
  },
]
