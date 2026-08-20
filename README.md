# 1001 Filmes

Catálogo pessoal baseado no livro "1001 Movies You Must See Before You Die".
Mesma stack e padrão do 1001 Discos: React + Vite + Tailwind, deploy via Vercel.

## Rodando localmente
```
npm install
npm run dev
```

## Estado atual
- `src/data/movies.js` — 8 filmes de exemplo, já no schema definitivo (ficha, título, ano,
  diretor, país, gênero, década, sinopse, gradiente placeholder de pôster, tmdbId)
- `src/hooks/useWatched.js` — progresso (assistido, nota, "com a Mari") salvo em `localStorage`.
  Troca fácil por Supabase depois, isolado num hook só — mesmo padrão do `useListened`.
- Pôsteres ainda são gradientes de cor. Quando plugarmos a TMDB API, cada filme ganha
  `poster` (URL) e o card troca o gradiente pela imagem real.

## Próximos passos
1. Importar a lista completa dos 1001 filmes (fonte: repo `Rooyca/1001M` ou export do Letterboxd)
2. Sincronizar pôsteres via TMDB Search API
3. Trocar `useWatched` (localStorage) por Supabase + Auth
4. Views "Por década" e "Com a Mari" (hoje só o filtro existe, as abas do header são visuais)
