import { statusLabel } from '../status.ts'
import type { Game } from '../types.ts'

type GameDetailsProps = {
  game: Game
}

export default function GameDetails({ game }: GameDetailsProps) {
  return (
    <article className="game-detail">
      {game.coverUrl && (
        <img src={game.coverUrl} alt={`Omslag för ${game.title}`} />
      )}
      <p>{game.platform}</p>
      <p>{statusLabel[game.status]}</p>
      <p>{game.rating === null ? 'Inget betyg' : `Betyg ${game.rating} / 5`}</p>
      <p>{game.notes || 'Inga anteckningar'}</p>
    </article>
  )
}
