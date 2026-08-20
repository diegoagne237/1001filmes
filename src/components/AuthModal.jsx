import { useState } from 'react'

export default function AuthModal({ onClose, onSignIn, onSignUp }) {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const action = mode === 'signin' ? onSignIn : onSignUp
    const { error: authError } = await action(email, password)
    setLoading(false)
    if (authError) {
      setError(authError.message)
      return
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream text-ink rounded-sm p-8 w-full max-w-sm relative"
      >
        <div className="font-mono text-xs text-wine mb-1">
          {mode === 'signin' ? 'ENTRAR NO CATÁLOGO' : 'CRIAR FICHA DE USUÁRIO'}
        </div>
        <h2 className="font-display font-black text-2xl mb-5">
          {mode === 'signin' ? 'Login' : 'Cadastro'}
        </h2>

        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#6b5f47] mb-1">
          E-mail
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-ink/25 rounded-sm px-3 py-2 mb-4 bg-white/40 text-sm"
        />

        <label className="block font-mono text-[11px] uppercase tracking-wide text-[#6b5f47] mb-1">
          Senha
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-ink/25 rounded-sm px-3 py-2 mb-4 bg-white/40 text-sm"
        />

        {error && <div className="text-wine text-xs font-mono mb-3">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full font-mono text-[12px] uppercase tracking-wide py-2.5 rounded-sm bg-ink text-cream disabled:opacity-50"
        >
          {loading ? 'Aguarde…' : mode === 'signin' ? 'Entrar' : 'Cadastrar'}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="w-full font-mono text-[11px] text-center mt-3 text-[#6b5f47] underline"
        >
          {mode === 'signin' ? 'Não tenho conta ainda' : 'Já tenho conta'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs text-ink/50"
        >
          ✕
        </button>
      </form>
    </div>
  )
}
