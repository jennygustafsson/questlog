import type { Game, GameStatus } from '../types.ts'

const statusLabel: Record<GameStatus, string> = {
  want: 'Want to play',
  playing: 'Playing',
  completed: 'Completed',
  dropped: 'Dropped',
}

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
          <h2>{game.title}</h2>
          <p>
            {game.platform} · {statusLabel[game.status]}
          </p>
        </li>
      ))}
    </ul>
  )
}
