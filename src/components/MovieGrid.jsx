import MovieCard from './MovieCard'

export default function MovieGrid({ movies, progress, onToggleWatched, onOpenDetail }) {
  if (movies.length === 0) {
    return (
      <div className="mx-10 pb-16 font-mono text-sm text-[#7a6d52] text-center py-16 border border-dashed border-line rounded-sm">
        Nenhuma ficha encontrada com esse filtro.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-6 px-10 pb-16">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          entry={progress[movie.id]}
          onToggleWatched={onToggleWatched}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  )
}
