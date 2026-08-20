// Enquanto o filme não tem poster_url (antes do importador TMDB rodar),
// gera um gradiente estável a partir do id — mesmo filme sempre cai na mesma cor.
const PALETTE = [
  ['#2b4c4a', '#173230'],
  ['#7c2a2a', '#3f1414'],
  ['#c6992e', '#7a5b19'],
  ['#3a3327', '#17140f'],
  ['#24504b', '#0f2624'],
  ['#5e1f1f', '#2b0d0d'],
  ['#8a6a2e', '#4a3a17'],
  ['#1b2f4a', '#0c1523'],
]

export function placeholderGradient(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  const [from, to] = PALETTE[hash % PALETTE.length]
  return { from, to }
}
