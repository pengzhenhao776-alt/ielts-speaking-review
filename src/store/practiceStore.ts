import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PracticeState {
  practiced: Record<string, boolean> // key = "topic-questionIndex" or "Part2-topic"
  togglePracticed: (key: string) => void
  isPracticed: (key: string) => boolean
  resetAll: () => void
}

export const usePracticeStore = create<PracticeState>()(
  persist(
    (set, get) => ({
      practiced: {},
      togglePracticed(key) {
        set((s) => ({
          practiced: { ...s.practiced, [key]: !s.practiced[key] },
        }))
      },
      isPracticed(key) {
        return !!get().practiced[key]
      },
      resetAll() {
        set({ practiced: {} })
      },
    }),
    { name: 'ielts_practice' },
  ),
)
