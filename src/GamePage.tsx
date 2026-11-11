import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BASE } from './config.ts'
import GameDetails from './components/GameDetails.tsx'
import NewGameForm from './components/NewGameForm.tsx'
import type { NewGameInput } from './components/NewGameForm.tsx'
import type { Game } from './types.ts'

export default function GamePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    async function loadGame() {
      try {
        const response = await fetch(`${API_BASE}/games/${id}`)
        if (!response.ok) {
          const body = (await response.json()) as { message?: string }
          if (!ignore) {
            setError(body.message ?? 'Kunde inte hämta spelet')
          }
          return
        }

        const data = (await response.json()) as Game
        if (!ignore) {
          setGame(data)
        }
      } catch {
        if (!ignore) {
          setError('Kunde inte hämta spelet')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void loadGame()

    return () => {
      ignore = true
    }
  }, [id])

  async function handleSave(input: NewGameInput) {
    setSaving(true)
    setActionError(null)

    try {
      const response = await fetch(`${API_BASE}/games/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: input.title,
          platform: input.platform,
          status: input.status,
          rating: input.rating,
          notes: input.notes,
        }),
      })

      if (!response.ok) {
        const body = (await response.json()) as { message?: string }
        setActionError(body.message ?? 'Kunde inte spara ändringen')
        return
      }

      const updated = (await response.json()) as Game
      setGame(updated)
      setEditing(false)
    } catch {
      setActionError('Kunde inte spara ändringen')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!game || !window.confirm(`Ta bort ${game.title}?`)) {
      return
    }

    setDeleting(true)
    setActionError(null)

    try {
      const response = await fetch(`${API_BASE}/games/${game.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const body = (await response.json()) as { message?: string }
        setActionError(body.message ?? 'Kunde inte ta bort spelet')
        return
      }

      navigate('/')
    } catch {
      setActionError('Kunde inte ta bort spelet')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      {loading && <p className="notice">Laddar spel…</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && game && (
        <>
          <h1>{game.title}</h1>
          <GameDetails game={game} />
          {editing ? (
            <>
              <h2>Ändra</h2>
              <NewGameForm
                submitting={saving}
                error={actionError}
                submitLabel="Spara ändring"
                initial={{
                  title: game.title,
                  platform: game.platform,
                  status: game.status,
                  rating: game.rating,
                  notes: game.notes,
                }}
                onCancel={() => {
                  setEditing(false)
                  setActionError(null)
                }}
                onSubmit={handleSave}
              />
            </>
          ) : (
            <div className="game-actions">
              <button type="button" onClick={() => setEditing(true)}>
                Ändra
              </button>
              <button
                type="button"
                className="danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Tar bort…' : 'Ta bort'}
              </button>
              {actionError && <p className="error">{actionError}</p>}
            </div>
          )}
        </>
      )}
    </>
  )
}
