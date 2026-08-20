import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// Busca em lotes de 1000 (limite padrão do Supabase) até esgotar o catálogo.
// Lição aprendida no 1001 Discos: sem isso, o disco/filme de número 1001 some silenciosamente.
async function fetchAllMovies() {
  const pageSize = 1000
  let from = 0
  let all = []

  while (true) {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('ficha', { ascending: true })
      .range(from, from + pageSize - 1)

    if (error) throw error
    all = all.concat(data)
    if (data.length < pageSize) break
    from += pageSize
  }

  return all
}

export function useMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(() => {
    setLoading(true)
    fetchAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { movies, loading, error, reload }
}
