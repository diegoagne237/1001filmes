export default function Header({ view, setView, user, isAdmin, onSignOut, onOpenAuth }) {
  const tabs = [
    { id: 'acervo', label: 'Acervo' },
    { id: 'assistidos', label: 'Assistidos' },
    { id: 'decadas', label: 'Por década' },
  ]

  return (
    <div className="flex items-center justify-between px-10 py-5 border-b border-line">
      <div className="flex items-baseline gap-2.5">
        <span className="font-display font-black text-[22px] text-ink bg-gold px-2.5 py-0.5 rounded-sm tracking-tight">
          1001
        </span>
        <span className="text-[12.5px] tracking-[0.14em] uppercase text-[#a89a78]">
          Filmes · Ficha de Catálogo
        </span>
      </div>

      <div className="flex items-center gap-7">
        <nav className="flex gap-7 text-[13px] tracking-wide uppercase text-[#a89a78]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={
                view === tab.id
                  ? 'text-gold border-b border-gold pb-1'
                  : 'hover:text-cream transition-colors'
              }
            >
              {tab.label}
            </button>
          ))}
          {isAdmin && (
            <a href="/?admin=1" className="hover:text-cream transition-colors">
              Admin
            </a>
          )}
        </nav>

        {user ? (
          <button
            onClick={onSignOut}
            className="font-mono text-[11px] uppercase tracking-wide border border-line-light rounded-full px-3.5 py-1.5 text-[#c9bd9e]"
          >
            Sair
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="font-mono text-[11px] uppercase tracking-wide border border-gold text-gold rounded-full px-3.5 py-1.5"
          >
            Entrar
          </button>
        )}
      </div>
    </div>
  )
}
