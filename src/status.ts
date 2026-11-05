import type { GameStatus } from './types.ts'

export const statusLabel: Record<GameStatus, string> = {
  want: 'Want to play',
  playing: 'Playing',
  completed: 'Completed',
  dropped: 'Dropped',
}
