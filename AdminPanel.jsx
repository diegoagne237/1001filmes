import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const EMPTY_FORM = {
  id: '',
  ficha: '',
  title: '',
  original_title: '',
  year: '',
  director: '',
  country: '',
  genre: '',
  decade: '',
  synopsis: '',
  tmdb_id: '',
}

function slugify(title, year) {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return year ? `${base}-${year}` : base
}

export default function AdminPanel({ movies, reloadMovies, onExit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const startEdit = (movie) => {
    setEditingId(movie.id)
    setForm({
      id: movie.id,
      ficha: movie.ficha ?? '',
      title: movie.title ?? '',
      original_title: movie.original_title ?? '',
      year: movie.year ?? '',
      director: movie.director ?? '',
      country: movie.country ?? '',
      genre: movie.genre ?? '',
      decade: movie.decade ?? '',
      synopsis: movie.synopsis ?? '',
      tmdb_id: movie.tmdb_id ?? '',
    })
  }

  const resetForm = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setError(null)
  }

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const id = editingId || slugify(form.title, form.year)
    const payload = {
      id,
      ficha: form.ficha ? Number(form.ficha) : null,
      title: form.title,
      original_title: form.original_title || null,
      year: form.year ? Number(form.year) : null,
      director: form.director || null,
      country: form.country || null,
      genre: form.genre || null,
      decade: form.decade ? Number(form.decade) : null,
      synopsis: form.synopsis || null,
      tmdb_id: form.tmdb_id ? Number(form.tmdb_id) : null,
    }

    const { error: saveError } = await supabase.from('movies').upsert(payload)
    setSaving(false)

    if (saveError) {
      setError(saveError.message)
      return
    }
    resetForm()
    reloadMovies()
  }

  const handleDelete = async (id) => {
    if (!confirm('Remover essa ficha do catálogo?')) return
    const { error: deleteError } = await supabase.from('movies').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    if (editingId === id) resetForm()
    reloadMovies()
  }

  const filteredMovies = movies.filter((m) => {
    if (!search.trim()) return true
    const q = search.trim().toLowerCase()
    return `${m.title} ${m.director}`.toLowerCase().includes(q)
  })

  return (
    <div className="min-h-screen px-10 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-mono text-xs text-gold mb-1">PAINEL DE ADMIN</div>
          <h1 className="font-display font-black text-3xl">Gerenciar catálogo</h1>
        </div>
        <button
          onClick={onExit}
          className="font-mono text-[11px] uppercase tracking-wide border border-line-light rounded-full px-4 py-2 text-[#c9bd9e]"
        >
          Voltar pro acervo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8">
        {/* Formulário */}
        <div className="bg-cream text-ink rounded-sm p-6 h-fit">
          <h2 className="font-display font-semibold text-xl mb-4">
            {editingId ? `Editando: ${form.title}` : 'Nova ficha'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nº da ficha" value={form.ficha} onChange={handleChange('ficha')} type="number" />
              <Field label="Ano" value={form.year} onChange={handleChange('year')} type="number" />
            </div>
            <Field label="Título" value={form.title} onChange={handleChange('title')} required />
            <Field label="Título original" value={form.original_title} onChange={handleChange('original_title')} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Diretor" value={form.director} onChange={handleChange('director')} />
              <Field label="País" value={form.country} onChange={handleChange('country')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Gênero" value={form.genre} onChange={handleChange('genre')} />
              <Field label="Década" value={form.decade} onChange={handleChange('decade')} type="number" placeholder="ex: 1970" />
            </div>
            <div>
              <label className="block font-mono text-[11px] uppercase tracking-wide text-[#6b5f47] mb-1">
                Sinopse
              </label>
              <textarea
                value={form.synopsis}
                onChange={handleChange('synopsis')}
                rows={3}
                className="w-full border border-ink/25 rounded-sm px-3 py-2 bg-white/40 text-sm"
              />
            </div>
            <Field label="TMDB ID (opcional, pro importador de capas)" value={form.tmdb_id} onChange={handleChange('tmdb_id')} type="number" />

            {error && <div className="text-wine text-xs font-mono">{error}</div>}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 font-mono text-[12px] uppercase tracking-wide py-2.5 rounded-sm bg-ink text-cream disabled:opacity-50"
              >
                {saving ? 'Salvando…' : editingId ? 'Salvar alterações' : 'Adicionar filme'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="font-mono text-[12px] uppercase tracking-wide py-2.5 px-4 rounded-sm border border-ink"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista */}
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar na lista…"
            className="font-mono text-[12.5px] bg-transparent border border-line-light rounded-full px-3.5 py-1.5 w-full mb-4 text-cream placeholder:text-[#7a6d52]"
          />
          <div className="border border-line rounded-sm overflow-hidden">
            {filteredMovies.length === 0 && (
              <div className="p-6 text-center font-mono text-sm text-[#7a6d52]">Nenhum filme ainda.</div>
            )}
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center justify-between px-4 py-3 border-b border-line last:border-b-0"
              >
                <div className="min-w-0">
                  <div className="font-display text-[15px] truncate">
                    <span className="font-mono text-xs text-gold mr-2">
                      Nº{String(movie.ficha ?? 0).padStart(4, '0')}
                    </span>
                    {movie.title}{' '}
                    <span className="text-[#a89a78] text-xs">({movie.year || '—'})</span>
                  </div>
                  <div className="text-xs text-[#a89a78] truncate">
                    {movie.director || '—'} · {movie.poster_url ? 'com capa' : 'sem capa'}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 ml-3">
                  <button
                    onClick={() => startEdit(movie)}
                    className="font-mono text-[11px] uppercase border border-line-light rounded-full px-3 py-1 text-[#c9bd9e]"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="font-mono text-[11px] uppercase border border-wine text-wine rounded-full px-3 py-1"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-wide text-[#6b5f47] mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border border-ink/25 rounded-sm px-3 py-2 bg-white/40 text-sm"
      />
    </div>
  )
}
