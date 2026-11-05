import { Link } from 'react-router-dom'
import { statusLabel } from '../status.ts'
import type { Game } from '../types.ts'

type GameListProps = {
  games: Game[]
}

export default function GameList({ games }: GameListProps) {
  if (games.length === 0) {
    return <p>Inga spel än.</p>
  }

  return (
    <ul className="game-list">
      {games.map((game) => (
        <li key={game.id}>
          <Link to={`/games/${game.id}`}>
            <h2>{game.title}</h2>
            <p>
              {game.platform} · {statusLabel[game.status]}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
