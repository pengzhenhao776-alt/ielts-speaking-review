import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useDeckStore } from '../store/deckStore'
import { useTemplateStore } from '../store/templateStore'
import ConfirmModal from '../components/ConfirmModal'
import { seedDecks, seedTemplates } from '../data/seed'

export default function StudentHome() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.currentUser)
  const logout = useAuthStore((s) => s.logout)
  const decks = useDeckStore((s) => s.decks)
  const templates = useTemplateStore((s) => s.templates)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Auto-import demo data for visitor users
  useEffect(() => {
    if (currentUser?.role !== 'visitor') return
    const store = useDeckStore.getState()
    const tplStore = useTemplateStore.getState()

    // Force clear any leftover data from previous users, then import demo subset
    useDeckStore.setState({ decks: [] })
    useTemplateStore.setState({ templates: [] })

    // Import first 2 decks with first 5 cards each
    for (let d = 0; d < Math.min(2, seedDecks.length); d++) {
      const seed = seedDecks[d]
      const deck = store.createDeck(seed.title, seed.description)
      for (let i = 0; i < Math.min(5, seed.cards.length); i++) {
        const c = seed.cards[i]
        store.addCard(deck.id, { front: c.front, back: c.back })
      }
    }

    // Import first template with first 2 sections (6 points each)
    const tSeed = seedTemplates[0]
    const tpl = tplStore.createTemplate(tSeed.topic)
    const sections = tplStore.getTemplate(tpl.id)!.sections
    for (let i = 0; i < Math.min(2, tSeed.sections.length, sections.length); i++) {
      tplStore.setSectionTitle(tpl.id, sections[i].id, tSeed.sections[i].title)
      const pts = tSeed.sections[i].points.slice(0, 6)
      for (const point of pts) {
        tplStore.addPoint(tpl.id, sections[i].id, point)
      }
    }
  }, [currentUser?.role])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">你好，{currentUser?.name}</h1>
          <p className="mt-1 text-sm text-[--color-text-secondary]">学习内容</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/question-bank')}
            className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
          >
            口语题库
          </button>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-[--color-text-secondary] transition-colors hover:bg-gray-200"
          >
            退出登录
          </button>
        </div>
      </div>

      {decks.length === 0 && templates.length === 0 ? (
        <div className="flex flex-col gap-5 py-8">
          <div className="text-center">
            <span className="text-5xl">👋</span>
            <p className="mt-3 text-lg font-semibold">欢迎加入雅思口语复习！</p>
            <p className="mt-1 text-sm text-[--color-text-secondary]">按下面三步开始使用</p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-4 rounded-2xl bg-[--color-card] p-5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">1</div>
              <div>
                <p className="font-medium">联系老师</p>
                <p className="text-sm text-[--color-text-secondary]">请你的雅思老师将你添加到学生列表，并向你发送专属激活链接。</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-[--color-card] p-5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">2</div>
              <div>
                <p className="font-medium">打开激活链接</p>
                <p className="text-sm text-[--color-text-secondary]">在手机浏览器（Safari 或 Chrome）中打开老师发的链接，课程内容会自动同步。</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-[--color-card] p-5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">3</div>
              <div>
                <p className="font-medium">刷新页面</p>
                <p className="text-sm text-[--color-text-secondary]">激活后退出重新登录，或下拉刷新页面，即可看到全部课程内容。</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-sm text-amber-700">
              <span className="font-medium">提示：</span>如果你已经收到激活链接但内容仍未显示，请确认在系统浏览器中打开链接（微信内置浏览器可能不兼容）。
            </p>
          </div>
        </div>
      ) : (
        <>
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold">表达卡片组</h2>
            {decks.length === 0 ? (
              <div className="rounded-2xl bg-[--color-card] p-8 text-center shadow-sm">
                <p className="text-sm text-[--color-text-secondary]">暂无卡片组</p>
              </div>
            ) : (
              <div className="space-y-3">
                {decks.map((deck) => (
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
            {templates.length === 0 ? (
              <div className="rounded-2xl bg-[--color-card] p-8 text-center shadow-sm">
                <p className="text-sm text-[--color-text-secondary]">暂无模板</p>
              </div>
            ) : (
              <div className="space-y-3">
                {templates.map((tpl) => (
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

          {currentUser?.role === 'demo' && (
            <div id="upgrade-section" className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">还想继续练吗？</p>
                <p className="mt-2 text-sm text-[--color-text-secondary] leading-relaxed">
                  以上仅为体验内容（2组卡片+1个模板）。购买正式版解锁<br />
                  <strong>全部 8 套表达卡片</strong> · <strong>4 套思路模板</strong> · <strong>68道完整题库答案</strong><br />
                  <strong>语音计时练习</strong> · <strong>翻转卡片朗读</strong>
                </p>
                <div className="mt-4 text-2xl font-extrabold text-red-500">
                  ¥39.9<span className="text-sm font-normal text-gray-400 line-through ml-2">¥79.9</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">一个考季 · 5-8月题库持续更新</p>
                <button
                  onClick={() => {
                    alert('请在闲鱼搜索"雅思口语翻转卡片"联系老师购买，拍下秒发激活码。')
                  }}
                  className="mt-4 w-full rounded-full bg-gray-900 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  立即购买 · ¥39.9
                </button>
                <p className="mt-2 text-xs text-gray-400">或闲鱼搜索"雅思口语翻转卡片"</p>
              </div>
            </div>
          )}
        </>
      )}

      {showLogoutConfirm && (
        <ConfirmModal
          title="确认退出"
          message="退出后需要重新登录，确定要退出吗？"
          confirmLabel="退出"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </div>
  )
}
