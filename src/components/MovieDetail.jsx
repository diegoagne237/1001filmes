import { placeholderGradient } from '../utils/posterPlaceholder'

export default function MovieDetail({ movie, entry, onClose, onToggleWatched, onSetRating }) {
  if (!movie) return null

  const watched = Boolean(entry?.watched)
  const rating = entry?.rating || 0
  const { from, to } = placeholderGradient(movie.id)

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <div
        className="bg-cream text-ink rounded-sm max-w-2xl w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-64 flex items-end p-6 text-cream relative"
          style={
            movie.poster_url
              ? { backgroundImage: `url(${movie.poster_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : { background: `linear-gradient(160deg, ${from}, ${to})` }
          }
        >
          <span className="font-mono text-xs absolute top-5 right-6 opacity-80">
            Nº {String(movie.ficha).padStart(4, '0')} / 1001
          </span>
          <div>
            <div className="font-mono text-xs opacity-80">{movie.year} · {movie.country}</div>
            <h2 className="font-display font-black text-3xl mt-1">{movie.title}</h2>
            <div className="text-sm italic opacity-90 mt-1">{movie.director}</div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-[15px] leading-relaxed text-[#3a3327]">{movie.synopsis}</p>

          <div className="flex items-center gap-2.5 mt-5 font-mono text-[10.5px] uppercase tracking-wide text-[#7a6d52]">
            <span className="border border-[#cabf9d] rounded-full px-2.5 py-1">{movie.genre}</span>
            <span className="border border-[#cabf9d] rounded-full px-2.5 py-1">Década de {movie.decade}</span>
          </div>

          <div className="mt-6 pt-5 border-t border-dashed border-ink/25 flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={() => onToggleWatched(movie.id)}
              className={`font-mono text-[12px] uppercase tracking-wide px-4 py-2 rounded-sm border ${
                watched ? 'border-wine text-wine bg-wine/5' : 'border-ink text-ink'
              }`}
            >
              {watched ? '✓ Assistido' : 'Marcar como assistido'}
            </button>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onSetRating(movie.id, star)}
                  className={`text-xl leading-none ${star <= rating ? 'text-wine' : 'text-ink/20'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 left-4 font-mono text-xs text-cream/80 bg-ink/40 rounded-full w-7 h-7 flex items-center justify-center"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
