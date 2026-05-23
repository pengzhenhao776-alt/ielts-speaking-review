import { useState } from 'react'
import type { Card } from '../../types'

const TAG_LABELS: Record<string, string> = {
  Part1: 'Part 1',
  Part2: 'Part 2',
  Part3: 'Part 3',
}

const TAG_COLORS: Record<string, string> = {
  Part1: 'bg-blue-50 text-blue-600',
  Part2: 'bg-amber-50 text-amber-600',
  Part3: 'bg-emerald-50 text-emerald-600',
}

interface Props {
  card: Card
}

export default function FlipCard({ card }: Props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        className="relative w-full transition-transform ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transitionDuration: '0.6s',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl bg-[--color-card] p-8 shadow-md"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-sm text-[--color-text-secondary]">点击翻转</p>
          <p className="mt-4 text-center text-2xl font-semibold leading-relaxed">
            {card.front}
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl bg-[--color-card] p-8 shadow-md"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="mb-4">
            <p className="text-xs font-medium text-[--color-text-secondary]">释义</p>
            <p className="mt-1 text-lg">{card.back.meaning}</p>
          </div>

          <div className="mb-4">
            <p className="text-xs font-medium text-[--color-text-secondary]">例句</p>
            <p className="mt-1 leading-relaxed text-[--color-text-secondary] italic">
              "{card.back.example}"
            </p>
          </div>

          {card.back.alternative && (
            <div className="mb-4">
              <p className="text-xs font-medium text-[--color-text-secondary]">替代表达</p>
              <p className="mt-1 text-sm text-emerald-600">
                {card.back.alternative}
              </p>
            </div>
          )}

          <div className="mt-auto">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${TAG_COLORS[card.back.tag]}`}
            >
              {TAG_LABELS[card.back.tag]}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
