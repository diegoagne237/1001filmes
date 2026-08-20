import { useMemo, useState } from 'react'
import { movies } from './data/movies'
import { useWatched } from './hooks/useWatched'
import Header from './components/Header'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import MovieGrid from './components/MovieGrid'
import MovieDetail from './components/MovieDetail'

export default function App() {
  const { progress, toggleWatched, setRating } = useWatched()

  const [view, setView] = useState('acervo')
  const [filter, setFilter] = useState('todos')
  const [decade, setDecade] = useState('todas')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const watchedCount = useMemo(
    () => Object.values(progress).filter((entry) => entry.watched).length,
    [progress],
  )

  const favoriteDecade = useMemo(() => {
    const counts = {}
    Object.entries(progress).forEach(([id, entry]) => {
      if (!entry.watched) return
      const movie = movies.find((m) => m.id === id)
      if (!movie) return
      counts[movie.decade] = (counts[movie.decade] || 0) + 1
    })
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
    return top ? `Anos ${String(top[0]).slice(2)}` : null
  }, [progress])

  const filtered = useMemo(() => {
    return movies.filter((movie) => {
      const entry = progress[movie.id]
      const watched = Boolean(entry?.watched)

      if (filter === 'assistidos' && !watched) return false
      if (filter === 'pendentes' && watched) return false
      if (decade !== 'todas' && String(movie.decade) !== decade) return false
      if (search.trim()) {
        const q = search.trim().toLowerCase()
        const haystack = `${movie.title} ${movie.director}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [progress, filter, decade, search])

  const handleRandomize = () => {
    const pending = movies.filter((m) => !progress[m.id]?.watched)
    const pool = pending.length > 0 ? pending : movies
    const pick = pool[Math.floor(Math.random() * pool.length)]
    setSelected(pick)
  }

  return (
    <div className="min-h-screen">
      <Header view={view} setView={setView} />
      <Hero watchedCount={watchedCount} favoriteDecade={favoriteDecade} onRandomize={handleRandomize} />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        decade={decade}
        setDecade={setDecade}
        search={search}
        setSearch={setSearch}
      />
      <MovieGrid
        movies={filtered}
        progress={progress}
        onToggleWatched={toggleWatched}
        onOpenDetail={setSelected}
      />

      <div className="text-center pb-12 font-mono text-[11.5px] text-[#5f5540] tracking-wide">
        — acervo em construção · {movies.length} de {1001} fichas importadas —
      </div>

      <MovieDetail
        movie={selected}
        entry={selected ? progress[selected.id] : null}
        onClose={() => setSelected(null)}
        onToggleWatched={toggleWatched}
        onSetRating={setRating}
      />
    </div>
  )
}
