import { useParams, useNavigate } from 'react-router-dom'
import { useDeckStore } from '../store/deckStore'
import CardDeck from '../components/Card/CardDeck'

export default function DeckReview() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const deck = id ? useDeckStore((s) => s.getDeck(id)) : undefined

  if (!deck) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-[--color-text-secondary]">未找到该卡片组</p>
        <button
          onClick={() => navigate('/')}
          className="rounded-full bg-gray-100 px-6 py-2 text-sm font-medium text-[--color-text-primary]"
        >
          返回首页
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="rounded-full p-2 text-[--color-text-secondary] transition-colors hover:bg-gray-100"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">{deck.title}</h1>
          {deck.description && (
            <p className="text-sm text-[--color-text-secondary]">{deck.description}</p>
          )}
        </div>
      </div>

      <CardDeck cards={deck.cards} readOnly />
    </div>
  )
}
