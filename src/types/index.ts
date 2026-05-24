export type PartTag = 'Part1' | 'Part2' | 'Part3'

export interface Card {
  id: string
  front: string
  back: {
    meaning: string
    example: string
    alternative: string
    tag: PartTag
  }
}

export interface Deck {
  id: string
  title: string
  description: string
  cards: Card[]
  createdAt: string
  updatedAt: string
}

export interface TemplateSection {
  id: string
  title: string
  points: string[]
}

export interface SpeakingTemplate {
  id: string
  topic: string
  sections: TemplateSection[]
  createdAt: string
  updatedAt: string
}
