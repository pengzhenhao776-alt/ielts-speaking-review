import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeckStore } from '../store/deckStore'
import { useTemplateStore } from '../store/templateStore'
import { seedDecks, seedTemplates } from '../data/seed'

export default function HomePage() {
  const navigate = useNavigate()
  const decks = useDeckStore((s) => s.decks)
  const templates = useTemplateStore((s) => s.templates)
  const [imported, setImported] = useState(false)

  const handleImport = () => {
    const { createDeck, addCard, decks: existingDecks } = useDeckStore.getState()
    const { createTemplate, addPoint, templates: existingTpls } = useTemplateStore.getState()

    const existingTitles = new Set(existingDecks.map((d) => d.title))
    const existingTopics = new Set(existingTpls.map((t) => t.topic))

    for (const seed of seedDecks) {
      if (existingTitles.has(seed.title)) continue
      const deck = createDeck(seed.title, seed.description)
      for (const card of seed.cards) {
        addCard(deck.id, { front: card.front, back: card.back })
      }
    }

    for (const seed of seedTemplates) {
      if (existingTopics.has(seed.topic)) continue
      const tpl = createTemplate(seed.topic)
      const tplSections = useTemplateStore.getState().getTemplate(tpl.id)!.sections
      for (let i = 0; i < seed.sections.length && i < tplSections.length; i++) {
        const store = useTemplateStore.getState()
        store.setSectionTitle(tpl.id, tplSections[i].id, seed.sections[i].title)
        for (const point of seed.sections[i].points) {
          addPoint(tpl.id, tplSections[i].id, point)
        }
      }
    }

    setImported(true)
    setTimeout(() => setImported(false), 3000)
  }

  const isEmpty = decks.length === 0 && templates.length === 0

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">雅思口语复习</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/question-bank')}
            className="rounded-full bg-blue-50 px-5 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
          >
            口语题库
          </button>
          {isEmpty && (
            <button
              onClick={handleImport}
              className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              导入课程数据
            </button>
          )}
        </div>
        {imported && (
          <span className="text-sm text-emerald-600">已导入全部课程数据</span>
        )}
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">表达卡片组</h2>
          <button
            onClick={() => navigate('/deck/new')}
            className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-[--color-text-primary] transition-colors hover:bg-gray-200"
          >
            新建卡片组
          </button>
        </div>

        {decks.length === 0 ? (
          <div className="rounded-2xl bg-[--color-card] p-10 text-center shadow-sm">
            <p className="mb-2 text-[--color-text-secondary]">还没有卡片组</p>
            <p className="text-sm text-[--color-text-secondary]">
              点击上方"导入课程数据"一键导入，或创建你自己的卡片组
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {decks.map((deck) => (
              <div
                key={deck.id}
                className="rounded-2xl bg-[--color-card] p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{deck.title}</h3>
                    {deck.description && (
                      <p className="mt-0.5 text-sm text-[--color-text-secondary]">
                        {deck.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[--color-text-secondary]">
                      {deck.cards.length} 张卡片
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/deck/${deck.id}/review`)}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200"
                    >
                      复习
                    </button>
                    <button
                      onClick={() => navigate(`/deck/${deck.id}`)}
                      className="rounded-full px-4 py-2 text-sm font-medium text-[--color-accent] transition-colors hover:bg-blue-50"
                    >
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">口语思路模板</h2>
          <button
            onClick={() => navigate('/template/new')}
            className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-[--color-text-primary] transition-colors hover:bg-gray-200"
          >
            新建模板
          </button>
        </div>

        {templates.length === 0 ? (
          <div className="rounded-2xl bg-[--color-card] p-10 text-center shadow-sm">
            <p className="mb-2 text-[--color-text-secondary]">还没有思路模板</p>
            <p className="text-sm text-[--color-text-secondary]">
              创建口语思路模板，帮助学生整理答题框架
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-2xl bg-[--color-card] p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{tpl.topic}</h3>
                    <p className="mt-1 text-xs text-[--color-text-secondary]">
                      {tpl.sections.length} 个段落
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/template/${tpl.id}/review`)}
                      className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200"
                    >
                      查看
                    </button>
                    <button
                      onClick={() => navigate(`/template/${tpl.id}`)}
                      className="rounded-full px-4 py-2 text-sm font-medium text-[--color-accent] transition-colors hover:bg-blue-50"
                    >
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
