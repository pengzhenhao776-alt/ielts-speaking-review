import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDeckStore } from '../store/deckStore'
import type { Card } from '../types'
import { generateShareUrl } from '../utils/share'
import CardEditor from '../components/Card/CardEditor'
import CardDeck from '../components/Card/CardDeck'

export default function DeckCreate() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const existing = id ? useDeckStore((s) => s.getDeck(id)) : undefined

  const [title, setTitle] = useState(existing?.title ?? '')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [cards, setCards] = useState<Card[]>(existing?.cards ?? [])
  const [showEditor, setShowEditor] = useState(false)
  const [editingCard, setEditingCard] = useState<Card | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const createDeck = useDeckStore((s) => s.createDeck)
  const updateDeck = useDeckStore((s) => s.updateDeck)
  const addCard = useDeckStore((s) => s.addCard)
  const deleteCard = useDeckStore((s) => s.deleteCard)
  const deleteDeck = useDeckStore((s) => s.deleteDeck)

  const handleSave = () => {
    if (!title.trim()) return

    if (existing) {
      updateDeck(existing.id, { title: title.trim(), description: description.trim() })
      cards.forEach((card) => {
        const exists = existing.cards.find((c) => c.id === card.id)
        if (!exists) {
          addCard(existing.id, card)
        }
      })
      navigate(`/deck/${existing.id}`)
    } else {
      const deck = createDeck(title.trim(), description.trim())
      cards.forEach((card) => addCard(deck.id, card))
      navigate(`/deck/${deck.id}`)
    }
  }

  const handleAddCard = (data: Omit<Card, 'id'>) => {
    const newCard: Card = { ...data, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8) }
    setCards((prev) => [...prev, newCard])
    setShowEditor(false)
  }

  const handleEditCard = (card: Card, index: number) => {
    setEditingCard(card)
    setEditingIndex(index)
    setShowEditor(true)
  }

  const handleUpdateCard = (data: Omit<Card, 'id'>) => {
    if (editingCard && editingIndex !== null) {
      const updated = { ...editingCard, ...data }
      setCards((prev) => prev.map((c, i) => (i === editingIndex ? updated : c)))
    }
    setEditingCard(null)
    setEditingIndex(null)
    setShowEditor(false)
  }

  const handleDeleteCard = (cardId: string, index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index))
    if (existing) {
      deleteCard(existing.id, cardId)
    }
  }

  const handleDeleteDeck = () => {
    if (existing && confirm('确定删除整个卡片组吗？此操作不可撤销。')) {
      deleteDeck(existing.id)
      navigate('/')
    }
  }

  const handleShare = () => {
    const currentDeck = useDeckStore.getState().getDeck(existing!.id)
    if (!currentDeck) return
    const url = generateShareUrl('deck', {
      title: currentDeck.title,
      description: currentDeck.description,
      cards: currentDeck.cards,
    })
    navigator.clipboard.writeText(url).then(() => {
      alert('✅ 分享链接已复制！')
    })
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
        <h1 className="text-xl font-bold">
          {existing ? '编辑卡片组' : '新建卡片组'}
        </h1>
        {existing && (
          <div className="ml-auto flex gap-2">
            <button
              onClick={handleShare}
              className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-[--color-text-primary] transition-colors hover:bg-gray-200"
            >
              分享
            </button>
            <button
              onClick={handleDeleteDeck}
              className="rounded-full px-4 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-50"
            >
              删除
            </button>
          </div>
        )}
      </div>

      <div className="mb-6 rounded-2xl bg-[--color-card] p-5 shadow-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 w-full text-lg font-semibold outline-none placeholder:text-gray-300"
          placeholder="卡片组名称"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-sm text-[--color-text-secondary] outline-none placeholder:text-gray-200"
          placeholder="添加描述（可选）"
        />
      </div>

      <div className="mb-4">
        <h2 className="mb-3 text-sm font-medium text-[--color-text-secondary]">
          卡片列表 ({cards.length})
        </h2>
        <CardDeck
          cards={cards}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
        />
      </div>

      <button
        onClick={() => {
          setEditingCard(null)
          setEditingIndex(null)
          setShowEditor(true)
        }}
        className="w-full rounded-2xl border-2 border-dashed border-[--color-border] py-6 text-sm font-medium text-[--color-text-secondary] transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
      >
        + 添加卡片
      </button>

      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={!title.trim()}
          className="w-full rounded-full bg-gray-900 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          保存卡片组
        </button>
      </div>

      {showEditor && (
        <CardEditor
          initial={editingCard}
          onSave={editingCard ? handleUpdateCard : handleAddCard}
          onCancel={() => {
            setShowEditor(false)
            setEditingCard(null)
            setEditingIndex(null)
          }}
        />
      )}
    </div>
  )
}
