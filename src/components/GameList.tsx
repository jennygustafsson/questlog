import { Link } from 'react-router-dom'
import { statusLabel } from '../status.ts'
import type { Game } from '../types.ts'

type GameListProps = {
  games: Game[]
}

export default function GameList({ games }: GameListProps) {
  if (games.length === 0) {
    return <p className="notice">Inga spel att visa.</p>
  }

  return (
    <ul className="game-list">
      {games.map((game) => (
        <li key={game.id}>
          <Link to={`/games/${game.id}`}>
            {game.coverUrl && (
              <img src={game.coverUrl} alt="" />
            )}
            <span>
              <h2>{game.title}</h2>
              <p>{game.platform}</p>
            </span>
            <p className="status" data-status={game.status}>
              {statusLabel[game.status]}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
