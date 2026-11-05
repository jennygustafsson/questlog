import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_BASE } from './config.ts'
import GameDetails from './components/GameDetails.tsx'
import type { Game } from './types.ts'

export default function GamePage() {
  const { id } = useParams()
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <main>
      <p>
        <Link to="/">Alla spel</Link>
      </p>
      {loading && <p>Laddar spel…</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && game && (
        <>
          <h1>{game.title}</h1>
          <GameDetails game={game} />
        </>
      )}
    </main>
  )
}
