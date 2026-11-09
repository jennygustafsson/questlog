import type { FormEvent } from 'react'
import { statusLabel } from '../status.ts'
import type { GameStatus } from '../types.ts'

export type NewGameInput = {
  title: string
  platform: string
  status: GameStatus
  rating: number | null
  notes: string
}

type NewGameFormProps = {
  submitting: boolean
  error: string | null
  initial?: NewGameInput
  submitLabel?: string
  onCancel?: () => void
  onSubmit: (game: NewGameInput) => void
}

const statuses = Object.keys(statusLabel) as GameStatus[]

export default function NewGameForm({
  submitting,
  error,
  initial,
  submitLabel = 'Spara',
  onCancel,
  onSubmit,
}: NewGameFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const rating = String(form.get('rating') ?? '')

    onSubmit({
      title: String(form.get('title') ?? ''),
      platform: String(form.get('platform') ?? ''),
      status: String(form.get('status') ?? 'want') as GameStatus,
      rating: rating ? Number(rating) : null,
      notes: String(form.get('notes') ?? ''),
    })
  }

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <label>
        Titel
        <input
          name="title"
          required
          maxLength={100}
          defaultValue={initial?.title}
        />
      </label>
      <label>
        Plattform
        <input
          name="platform"
          required
          maxLength={40}
          defaultValue={initial?.platform}
        />
      </label>
      <label>
        Status
        <select name="status" defaultValue={initial?.status ?? 'want'}>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {statusLabel[status]}
            </option>
          ))}
        </select>
      </label>
      <label>
        Betyg
        <select name="rating" defaultValue={initial?.rating ?? ''}>
          <option value="">Inget betyg</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label>
        Anteckningar
        <textarea
          name="notes"
          rows={4}
          maxLength={1000}
          defaultValue={initial?.notes}
        />
      </label>
      {error && <p className="error">{error}</p>}
      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Sparar…' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            className="secondary"
            onClick={onCancel}
            disabled={submitting}
          >
            Avbryt
          </button>
        )}
      </div>
    </form>
  )
}
