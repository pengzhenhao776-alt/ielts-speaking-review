import { useState } from 'react'
import type { Card } from '../../types'
import FlipCard from './FlipCard'

interface Props {
  cards: Card[]
  onEdit?: (card: Card, index: number) => void
  onDelete?: (cardId: string, index: number) => void
  readOnly?: boolean
}

export default function CardDeck({ cards, onEdit, onDelete, readOnly }: Props) {
  const [index, setIndex] = useState(0)

  if (cards.length === 0) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-2xl bg-[--color-card] p-8 shadow-md">
        <p className="text-[--color-text-secondary]">暂无卡片</p>
      </div>
    )
  }

  const card = cards[index]

  return (
    <div>
      <FlipCard key={card.id} card={card} />

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded-full bg-[--color-card] px-4 py-2 text-sm shadow-sm transition-opacity disabled:opacity-30"
        >
          上一张
        </button>

        <span className="text-sm text-[--color-text-secondary]">
          {index + 1} / {cards.length}
        </span>

        <button
          onClick={() => setIndex((i) => Math.min(cards.length - 1, i + 1))}
          disabled={index === cards.length - 1}
          className="rounded-full bg-[--color-card] px-4 py-2 text-sm shadow-sm transition-opacity disabled:opacity-30"
        >
          下一张
        </button>
      </div>

      {!readOnly && onEdit && onDelete && (
        <div className="mt-3 flex justify-center gap-3">
          <button
            onClick={() => onEdit(card, index)}
            className="rounded-full px-4 py-1.5 text-sm text-[--color-accent] transition-colors hover:bg-blue-50"
          >
            编辑
          </button>
          <button
            onClick={() => onDelete(card.id, index)}
            className="rounded-full px-4 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-50"
          >
            删除
          </button>
        </div>
      )}
    </div>
  )
}
