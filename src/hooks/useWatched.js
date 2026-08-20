import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// progress fica no formato: { [movieId]: { watched, rating, watchedAt } }
// Sem usuário logado, funciona como leitura vazia — a UI decide pedir login na interação.
export function useWatched(userId) {
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)

  const reload = useCallback(() => {
    if (!userId) {
      setProgress({})
      setLoading(false)
      return
    }
    setLoading(true)
    supabase
      .from('watched_movies')
      .select('*')
      .eq('user_id', userId)
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          setLoading(false)
          return
        }
        const map = {}
        data.forEach((row) => {
          map[row.movie_id] = { watched: true, rating: row.rating, watchedAt: row.watched_at }
        })
        setProgress(map)
        setLoading(false)
      })
  }, [userId])

  useEffect(() => {
    reload()
  }, [reload])

  const toggleWatched = useCallback(
    async (movieId) => {
      if (!userId) return
      const current = progress[movieId]

      if (current?.watched) {
        await supabase.from('watched_movies').delete().eq('user_id', userId).eq('movie_id', movieId)
        setProgress((prev) => {
          const next = { ...prev }
          delete next[movieId]
          return next
        })
      } else {
        const { data, error } = await supabase
          .from('watched_movies')
          .upsert({ user_id: userId, movie_id: movieId, watched_at: new Date().toISOString() })
          .select()
          .single()
        if (!error) {
          setProgress((prev) => ({
            ...prev,
            [movieId]: { watched: true, rating: data.rating, watchedAt: data.watched_at },
          }))
        }
      }
    },
    [userId, progress],
  )

  const setRating = useCallback(
    async (movieId, rating) => {
      if (!userId) return
      const { data, error } = await supabase
        .from('watched_movies')
        .upsert({
          user_id: userId,
          movie_id: movieId,
          rating,
          watched_at: progress[movieId]?.watchedAt || new Date().toISOString(),
        })
        .select()
        .single()
      if (!error) {
        setProgress((prev) => ({
          ...prev,
          [movieId]: { watched: true, rating: data.rating, watchedAt: data.watched_at },
        }))
      }
    },
    [userId, progress],
  )

  return { progress, loading, toggleWatched, setRating, reload }
}
