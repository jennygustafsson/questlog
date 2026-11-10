import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from './config.ts'
import NewGameForm from './components/NewGameForm.tsx'
import type { NewGameInput } from './components/NewGameForm.tsx'
import type { Game } from './types.ts'

export default function NewGamePage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(input: NewGameInput) {
    setSubmitting(true)
    setError(null)

    const game = {
      title: input.title,
      platform: input.platform,
      status: input.status,
      notes: input.notes,
      ...(input.rating !== null ? { rating: input.rating } : {}),
    }

    try {
      const response = await fetch(`${API_BASE}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      })

      if (!response.ok) {
        const body = (await response.json()) as { message?: string }
        setError(body.message ?? 'Kunde inte spara spelet')
        return
      }

      const created = (await response.json()) as Game
      navigate(`/games/${created.id}`)
    } catch {
      setError('Kunde inte spara spelet')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <h1>Nytt spel</h1>
      <NewGameForm submitting={submitting} error={error} onSubmit={handleSubmit} />
    </>
  )
}
