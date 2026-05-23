import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useDeckStore } from '../store/deckStore'
import { useTemplateStore } from '../store/templateStore'

export default function StudentHome() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.currentUser)
  const logout = useAuthStore((s) => s.logout)
  const decks = useDeckStore((s) => s.decks)
  const templates = useTemplateStore((s) => s.templates)

  const unlockedDecks = decks.filter((d) => !d.locked)
  const unlockedTemplates = templates.filter((t) => !t.locked)

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">你好，{currentUser?.name}</h1>
          <p className="mt-1 text-sm text-[--color-text-secondary]">已解锁的学习内容</p>
        </div>
        <button
          onClick={() => { logout(); navigate('/login') }}
          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-[--color-text-secondary] transition-colors hover:bg-gray-200"
        >
          退出登录
        </button>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">表达卡片组</h2>
        {unlockedDecks.length === 0 ? (
          <div className="rounded-2xl bg-[--color-card] p-10 text-center shadow-sm">
            <p className="text-[--color-text-secondary]">暂无可查看的卡片组</p>
            <p className="mt-1 text-sm text-[--color-text-secondary]">
              请等待老师解锁课程内容
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {unlockedDecks.map((deck) => (
              <div
                key={deck.id}
                onClick={() => navigate(`/deck/${deck.id}/review`)}
                className="cursor-pointer rounded-2xl bg-[--color-card] p-5 shadow-sm transition-shadow hover:shadow-md"
              >
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
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">口语思路模板</h2>
        {unlockedTemplates.length === 0 ? (
          <div className="rounded-2xl bg-[--color-card] p-10 text-center shadow-sm">
            <p className="text-[--color-text-secondary]">暂无可查看的模板</p>
            <p className="mt-1 text-sm text-[--color-text-secondary]">
              请等待老师解锁课程内容
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {unlockedTemplates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => navigate(`/template/${tpl.id}/review`)}
                className="cursor-pointer rounded-2xl bg-[--color-card] p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold">{tpl.topic}</h3>
                <p className="mt-1 text-xs text-[--color-text-secondary]">
                  {tpl.sections.length} 个段落
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
