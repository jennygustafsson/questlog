import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE } from './config.ts'
import GameList from './components/GameList.tsx'
import type { Game } from './types.ts'

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    async function loadGames() {
      try {
        const response = await fetch(`${API_BASE}/games`)
        if (!response.ok) {
          const body = (await response.json()) as { message?: string }
          if (!ignore) {
            setError(body.message ?? 'Kunde inte hämta spelen')
          }
          return
        }

        const data = (await response.json()) as Game[]
        if (!ignore) {
          setGames(data)
        }
      } catch {
        if (!ignore) {
          setError('Kunde inte hämta spelen')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void loadGames()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <main>
      <h1>Questlog</h1>
      <p>
        <Link to="/games/new">Lägg till spel</Link>
      </p>
      {loading && <p>Laddar spel…</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && <GameList games={games} />}
    </main>
  )
}
