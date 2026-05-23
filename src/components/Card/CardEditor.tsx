import { useState, useEffect } from 'react'
import type { Card, PartTag } from '../../types'

interface Props {
  initial?: Card | null
  onSave: (data: Omit<Card, 'id'>) => void
  onCancel: () => void
}

export default function CardEditor({ initial, onSave, onCancel }: Props) {
  const [front, setFront] = useState(initial?.front ?? '')
  const [meaning, setMeaning] = useState(initial?.back.meaning ?? '')
  const [example, setExample] = useState(initial?.back.example ?? '')
  const [alternative, setAlternative] = useState(initial?.back.alternative ?? '')
  const [tag, setTag] = useState<PartTag>(initial?.back.tag ?? 'Part1')

  useEffect(() => {
    if (initial) {
      setFront(initial.front)
      setMeaning(initial.back.meaning)
      setExample(initial.back.example)
      setAlternative(initial.back.alternative ?? '')
      setTag(initial.back.tag)
    }
  }, [initial])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!front.trim() || !meaning.trim()) return
    onSave({ front: front.trim(), back: { meaning: meaning.trim(), example: example.trim(), alternative: alternative.trim(), tag } })
  }

  const tags: PartTag[] = ['Part1', 'Part2', 'Part3']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-[--color-card] p-6 shadow-lg"
      >
        <h2 className="mb-5 text-lg font-semibold">
          {initial ? '编辑卡片' : '新增卡片'}
        </h2>

        <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
          表达 / 词汇
        </label>
        <input
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="mb-4 w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
          placeholder="例如：a piece of cake"
          autoFocus
        />

        <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
          中文释义
        </label>
        <input
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="mb-4 w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
          placeholder="例如：小菜一碟，非常容易"
        />

        <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
          英文例句
        </label>
        <input
          value={example}
          onChange={(e) => setExample(e.target.value)}
          className="mb-4 w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
          placeholder="例如：The exam was a piece of cake."
        />

        <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
          替代表达（例句中可替换的同义短语）
        </label>
        <input
          value={alternative}
          onChange={(e) => setAlternative(e.target.value)}
          className="mb-4 w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
          placeholder="例如：be fond of / be into / be keen on"
        />

        <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
          场景标签
        </label>
        <div className="mb-6 flex gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tag === t
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-[--color-text-secondary] hover:bg-gray-200'
              }`}
            >
              Part {t.slice(-1)}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-[--color-border] bg-white py-3 text-sm font-medium transition-colors hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            className="flex-1 rounded-full bg-gray-900 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  )
}
