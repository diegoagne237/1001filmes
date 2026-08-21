const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

function assertKey() {
  if (!API_KEY) {
    throw new Error(
      'Falta VITE_TMDB_API_KEY. Configure em Vercel > Settings > Environment Variables.',
    )
  }
}

// Busca por título (+ ano opcional pra desambiguar). Retorna os candidatos crus da TMDB.
export async function searchMovie(title, year) {
  assertKey()
  const params = new URLSearchParams({
    api_key: API_KEY,
    query: title,
    language: 'pt-BR',
  })
  if (year) params.set('year', String(year))

  const res = await fetch(`${BASE_URL}/search/movie?${params.toString()}`)
  if (!res.ok) throw new Error(`TMDB respondeu ${res.status}`)
  const data = await res.json()
  return data.results || []
}

export function posterUrl(posterPath) {
  return posterPath ? `${IMG_BASE}${posterPath}` : null
}

// Pega o candidato mais provável: melhor bater o ano exato, senão o primeiro resultado.
export function pickBestMatch(results, year) {
  if (results.length === 0) return null
  if (year) {
    const exact = results.find((r) => r.release_date?.startsWith(String(year)))
    if (exact) return exact
  }
  return results[0]
}
