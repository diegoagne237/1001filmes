import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = '1001-filmes:progresso'

// Formato salvo por filme:
// { watched: bool, rating: number|null, watchedAt: string|null }

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useWatched() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const toggleWatched = useCallback((movieId) => {
    setProgress((prev) => {
      const current = prev[movieId] || { watched: false, rating: null, watchedAt: null }
      const watched = !current.watched
      return {
        ...prev,
        [movieId]: {
          ...current,
          watched,
          watchedAt: watched ? new Date().toISOString() : null,
        },
      }
    })
  }, [])

  const setRating = useCallback((movieId, rating) => {
    setProgress((prev) => ({
      ...prev,
      [movieId]: {
        ...(prev[movieId] || { watched: true, watchedAt: new Date().toISOString() }),
        watched: true,
        rating,
      },
    }))
  }, [])

  const isWatched = useCallback((movieId) => Boolean(progress[movieId]?.watched), [progress])
  const getEntry = useCallback((movieId) => progress[movieId] || null, [progress])

  return { progress, toggleWatched, setRating, isWatched, getEntry }
}
