import { TOTAL_FILMES } from '../data/movies'

export default function Hero({ watchedCount, favoriteDecade, onRandomize }) {
  const pct = Math.round((watchedCount / TOTAL_FILMES) * 100)

  return (
    <div className="mx-10 mt-9 mb-5 grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr] rounded-sm overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] relative bg-cream text-ink">
      <div className="px-8 md:pl-[60px] py-9 border-r border-dashed border-ink/25">
        <div className="font-mono text-xs text-wine">FICHA GERAL — Nº 0000 / {TOTAL_FILMES}</div>
        <h1 className="font-display font-black text-4xl md:text-[44px] leading-[1.02] mt-2.5 mb-1.5 tracking-tight">
          1001 filmes
          <br />
          para ver <em className="italic text-wine">antes de morrer</em>
        </h1>
        <p className="text-[15.5px] leading-relaxed text-[#3a3327] max-w-[46ch] my-3.5 mb-5">
          Um catálogo pessoal baseado no livro de Steven Jay Schneider — cada filme é uma ficha de
          arquivo. Marque o que já assistiu, dê sua nota e vá carimbando o acervo.
        </p>
        <div className="flex gap-3 items-center">
          <button className="font-mono text-[13px] tracking-wide px-5 py-2.5 rounded-sm border border-ink bg-ink text-cream uppercase">
            Continuar catalogando
          </button>
          <button
            onClick={onRandomize}
            className="font-mono text-[13px] tracking-wide px-5 py-2.5 rounded-sm border border-ink text-ink uppercase"
          >
            Sortear um filme
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-ink/15 p-7">
        <div className="bg-cream p-5">
          <div className="font-display font-black text-3xl leading-none">{watchedCount}</div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-[#6b5f47] mt-2">
            Assistidos / {TOTAL_FILMES}
          </div>
        </div>
        <div className="bg-cream p-5">
          <div className="font-display font-black text-3xl leading-none">{pct}%</div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-[#6b5f47] mt-2">
            Do acervo completo
          </div>
        </div>
        <div className="bg-cream p-5">
          <div className="font-display font-black text-3xl leading-none">{favoriteDecade || '—'}</div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-[#6b5f47] mt-2">
            Década mais assistida
          </div>
        </div>
        <div className="bg-cream p-5 flex items-center justify-center flex-col">
          <div className="font-mono font-bold text-[13px] text-wine border-2 border-wine rounded px-3 py-2 -rotate-[8deg] tracking-wide opacity-85">
            EM DIA
          </div>
        </div>
      </div>
    </div>
  )
}
