import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Deck, Card } from '../types'

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function now(): string {
  return new Date().toISOString()
}

interface DeckState {
  decks: Deck[]

  createDeck: (title: string, description: string) => Deck
  updateDeck: (id: string, data: Partial<Pick<Deck, 'title' | 'description'>>) => void
  deleteDeck: (id: string) => void

  addCard: (deckId: string, card: Omit<Card, 'id'>) => void
  updateCard: (deckId: string, cardId: string, data: Omit<Card, 'id'>) => void
  deleteCard: (deckId: string, cardId: string) => void

  getDeck: (id: string) => Deck | undefined
}

export const useDeckStore = create<DeckState>()(
  persist(
    (set, get) => ({
      decks: [],

      createDeck(title, description) {
        const deck: Deck = {
          id: genId(),
          title,
          description,
          cards: [],
          createdAt: now(),
          updatedAt: now(),
        }
        set((s) => ({ decks: [...s.decks, deck] }))
        return deck
      },

      updateDeck(id, data) {
        set((s) => ({
          decks: s.decks.map((d) =>
            d.id === id ? { ...d, ...data, updatedAt: now() } : d
          ),
        }))
      },

      deleteDeck(id) {
        set((s) => ({ decks: s.decks.filter((d) => d.id !== id) }))
      },

      addCard(deckId, card) {
        const newCard: Card = { ...card, id: genId() }
        set((s) => ({
          decks: s.decks.map((d) =>
            d.id === deckId
              ? { ...d, cards: [...d.cards, newCard], updatedAt: now() }
              : d
          ),
        }))
      },

      updateCard(deckId, cardId, data) {
        set((s) => ({
          decks: s.decks.map((d) =>
            d.id === deckId
              ? {
                  ...d,
                  cards: d.cards.map((c) =>
                    c.id === cardId ? { ...c, ...data } : c
                  ),
                  updatedAt: now(),
                }
              : d
          ),
        }))
      },

      deleteCard(deckId, cardId) {
        set((s) => ({
          decks: s.decks.map((d) =>
            d.id === deckId
              ? {
                  ...d,
                  cards: d.cards.filter((c) => c.id !== cardId),
                  updatedAt: now(),
                }
              : d
          ),
        }))
      },

      getDeck(id) {
        return get().decks.find((d) => d.id === id)
      },
    }),
    { name: 'ielts_decks_v2' }
  )
)
