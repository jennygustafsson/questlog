import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE } from './config.ts'
import GameFilter from './components/GameFilter.tsx'
import type { GameFilterValue } from './components/GameFilter.tsx'
import GameList from './components/GameList.tsx'
import type { Game } from './types.ts'

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [status, setStatus] = useState<GameFilterValue>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    const url =
      status === 'all' ? `${API_BASE}/games` : `${API_BASE}/games?status=${status}`

    async function loadGames() {
      try {
        const response = await fetch(url)
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
  }, [status])

  function selectStatus(next: GameFilterValue) {
    if (next === status) {
      return
    }

    setStatus(next)
    setGames([])
    setError(null)
    setLoading(true)
  }

  return (
    <main>
      <h1>Questlog</h1>
      <p>
        <Link to="/games/new">Lägg till spel</Link>
      </p>
      <GameFilter selected={status} onSelect={selectStatus} />
      {loading && <p>Laddar spel…</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && <GameList games={games} />}
    </main>
  )
}
