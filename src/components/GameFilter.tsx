import { statusLabel } from '../status.ts'
import type { GameStatus } from '../types.ts'

export type GameFilterValue = 'all' | GameStatus

const filters: { value: GameFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'want', label: statusLabel.want },
  { value: 'playing', label: statusLabel.playing },
  { value: 'completed', label: statusLabel.completed },
  { value: 'dropped', label: statusLabel.dropped },
]

type GameFilterProps = {
  selected: GameFilterValue
  onSelect: (status: GameFilterValue) => void
}

export default function GameFilter({ selected, onSelect }: GameFilterProps) {
  return (
    <div className="filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          aria-pressed={selected === filter.value}
          onClick={() => onSelect(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
