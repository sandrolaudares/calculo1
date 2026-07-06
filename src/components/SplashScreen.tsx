const logo = '/calcul-ai-logo.png'

type SplashScreenProps = {
  onEnter: () => void
}

/**
 * Página de abertura: logo do Calcul-AI, título e autores.
 */
export function SplashScreen({ onEnter }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 px-6 text-center">
      <img
        src={logo}
        alt="Logo do Calcul-AI"
        className="h-28 w-28 rounded-3xl shadow-2xl shadow-indigo-900/50 sm:h-36 sm:w-36"
      />

      <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        Calcul-AI
      </h1>
      <p className="mt-3 text-lg font-medium text-indigo-200 sm:text-xl">
        Cálculo I com IA · Inteligência artificial
      </p>

      <div className="mt-8 max-w-md text-sm text-slate-400">
        <p className="uppercase tracking-widest text-slate-500">Autores</p>
        <p className="mt-2 leading-relaxed text-slate-300">
          Dimas Felipe de Miranda, João Bosco Laudares, Sandro Laudares, Anderson
          Gonçalves Siqueira, Adilsion Lopes de Oliveira &amp; Fabio Inacio de
          Oliveira
        </p>
      </div>

      <button
        onClick={onEnter}
        className="mt-12 rounded-full bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:bg-indigo-500"
      >
        Entrar
      </button>
    </div>
  )
}
