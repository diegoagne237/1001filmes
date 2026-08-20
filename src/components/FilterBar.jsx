const DECADE_OPTIONS = [1950, 1960, 1970, 1980, 1990, 2000, 2010]

export default function FilterBar({ filter, setFilter, decade, setDecade, search, setSearch }) {
  const chip = (active) =>
    `font-mono text-[12.5px] px-3.5 py-1.5 rounded-full border ${
      active
        ? 'bg-gold text-ink border-gold font-bold'
        : 'border-line-light text-[#c9bd9e] hover:text-cream'
    }`

  return (
    <div className="mx-10 mb-6 pt-5 border-t border-line flex flex-wrap items-center gap-2.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#7a6d52] mr-2">
        Filtrar
      </span>
      <button className={chip(filter === 'todos')} onClick={() => setFilter('todos')}>
        Todos
      </button>
      <button className={chip(filter === 'assistidos')} onClick={() => setFilter('assistidos')}>
        Assistidos
      </button>
      <button className={chip(filter === 'pendentes')} onClick={() => setFilter('pendentes')}>
        Não assistidos
      </button>

      <select
        value={decade}
        onChange={(e) => setDecade(e.target.value)}
        className="font-mono text-[12.5px] bg-transparent border border-line-light rounded-full px-3.5 py-1.5 text-cream"
      >
        <option value="todas" className="bg-ink">
          Todas as décadas
        </option>
        {DECADE_OPTIONS.map((d) => (
          <option key={d} value={d} className="bg-ink">
            Anos {String(d).slice(2)}
          </option>
        ))}
      </select>

      <div className="flex-1" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar título ou diretor…"
        className="font-mono text-[12.5px] bg-transparent border border-line-light rounded-full px-3.5 py-1.5 w-56 text-cream placeholder:text-[#7a6d52]"
      />
    </div>
  )
}
