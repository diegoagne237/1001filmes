import { placeholderGradient } from '../utils/posterPlaceholder'

export default function MovieCard({ movie, entry, onToggleWatched, onOpenDetail }) {
  const watched = Boolean(entry?.watched)
  const { from, to } = placeholderGradient(movie.id)

  return (
    <div
      className="bg-cream text-ink rounded-sm relative overflow-hidden shadow-[0_16px_30px_-18px_rgba(0,0,0,0.55)] hover:-translate-y-1 transition-transform cursor-pointer"
      onClick={() => onOpenDetail(movie)}
    >
      <span className="absolute top-3.5 left-3.5 w-2.5 h-2.5 rounded-full bg-ink opacity-85" />
      <span className="absolute top-3 right-3.5 font-mono text-[10.5px] text-[#6b5f47]">
        Nº {String(movie.ficha).padStart(4, '0')}
      </span>

      <div
        className="h-[230px] flex items-end p-3.5 text-cream"
        style={
          movie.poster_url
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55)), url(${movie.poster_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : { background: `linear-gradient(160deg, ${from}, ${to})` }
        }
      >
        <span className="font-mono text-[11px] opacity-85">{movie.year}</span>
      </div>

      {watched && (
        <div className="stamp absolute top-[36%] left-1/2 text-[15px] px-2.5 py-1 pointer-events-none">
          ASSISTIDO
        </div>
      )}

      {watched && entry?.rating && (
        <div className="absolute bottom-3.5 right-3.5 font-mono text-xs bg-ink text-gold px-2 py-0.5 rounded-sm">
          {entry.rating.toFixed(1)}
        </div>
      )}

      <div className="px-4 pb-5 pt-3.5">
        <h3 className="font-display font-semibold text-[16.5px] leading-tight mb-1.5">
          {movie.title}
        </h3>
        <div className="text-xs text-[#5a5138] italic">{movie.director}</div>
        <div className="flex gap-2 mt-2.5 font-mono text-[10.5px] text-[#7a6d52] uppercase tracking-wide">
          <span className="border border-[#cabf9d] rounded-full px-2 py-0.5">{movie.genre}</span>
          <span className="border border-[#cabf9d] rounded-full px-2 py-0.5">{movie.country}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleWatched(movie.id)
          }}
          className={`mt-3.5 w-full font-mono text-[11px] uppercase tracking-wide py-2 rounded-sm border ${
            watched
              ? 'border-wine text-wine bg-wine/5'
              : 'border-ink/30 text-ink/70 hover:border-ink'
          }`}
        >
          {watched ? 'Desmarcar' : 'Marcar como assistido'}
        </button>
      </div>
    </div>
  )
}
