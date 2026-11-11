import { statusLabel } from '../status.ts'
import type { Game } from '../types.ts'

type GameDetailsProps = {
  game: Game
}

function ratingText(rating: number | null) {
  if (rating === null) {
    return 'Inget betyg'
  }

  return `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`
}

export default function GameDetails({ game }: GameDetailsProps) {
  return (
    <article className="game-detail">
      {game.coverUrl && (
        <img src={game.coverUrl} alt={`Omslag för ${game.title}`} />
      )}
      <dl>
        <div>
          <dt>Plattform</dt>
          <dd>{game.platform}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{statusLabel[game.status]}</dd>
        </div>
        <div>
          <dt>Betyg</dt>
          <dd>{ratingText(game.rating)}</dd>
        </div>
        <div>
          <dt>Anteckningar</dt>
          <dd>{game.notes || 'Inga anteckningar'}</dd>
        </div>
      </dl>
    </article>
  )
}
