import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { part1Topics, part2Topics, part3Topics } from '../data/questionBank'
import type { Part1Topic, Part2Topic, Part3Topic } from '../data/questionBank'
import SpeechPractice from '../components/Card/SpeechPractice'
import { usePracticeStore } from '../store/practiceStore'

type Tab = 'Part1' | 'Part2' | 'Part3'

export default function QuestionBank() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('Part1')
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set())
  const [practicing, setPracticing] = useState<{ expression: string; alternatives: string } | null>(null)
  const [search, setSearch] = useState('')
  const practiceStore = usePracticeStore()

  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const handlePractice = (expression: string) => {
    // Find matching card alternatives from the answer context
    const altMap: Record<string, string> = {
      'like': 'be fond of / be into / be a big fan of / be keen on',
      'think': 'Personally speaking / From my perspective / In my view / As for me',
      'important': 'meaningful / essential / vital / significant',
      'relax': 'wind down / unwind / chill out / take it easy',
      'help': 'benefit / do good to / be helpful for',
      'happy': 'content / fulfilled / cheerful / delighted',
      'interesting': 'fascinating / engaging / thought-provoking / captivating',
      'beautiful': 'stunning / scenic / vibrant / breathtaking',
      'good': 'rewarding / beneficial / appealing / fulfilling',
      'many': 'numerous / plenty of / a wide range of / countless',
      'want': 'feel like / hope to pursue / plan to',
      'hard': 'demanding / challenging / tricky',
      'busy': 'occupied / hectic / fully scheduled / tied up',
    }

    const lower = expression.toLowerCase()
    let alternatives = ''
    for (const [key, val] of Object.entries(altMap)) {
      if (lower.includes(key)) {
        alternatives = val
        break
      }
    }
    if (!alternatives) alternatives = 'Personally speaking / From my perspective / In my view'

    setPracticing({ expression, alternatives })
  }

  const lowerSearch = search.toLowerCase().trim()

  const filteredPart1 = useMemo(() => {
    if (!lowerSearch) return part1Topics
    return part1Topics
      .map((topic) => {
        if (topic.topic.toLowerCase().includes(lowerSearch)) return topic
        const matched = topic.questions.filter(
          (q) => q.q.toLowerCase().includes(lowerSearch) || q.a.toLowerCase().includes(lowerSearch),
        )
        return matched.length > 0 ? { ...topic, questions: matched } : null
      })
      .filter(Boolean) as Part1Topic[]
  }, [lowerSearch])

  const filteredPart2 = useMemo(() => {
    if (!lowerSearch) return part2Topics
    return part2Topics.filter(
      (t) =>
        t.topic.toLowerCase().includes(lowerSearch) ||
        t.cueCard.toLowerCase().includes(lowerSearch) ||
        t.answer.toLowerCase().includes(lowerSearch),
    )
  }, [lowerSearch])

  const filteredPart3 = useMemo(() => {
    if (!lowerSearch) return part3Topics
    return part3Topics
      .map((topic) => {
        if (topic.topic.toLowerCase().includes(lowerSearch) || topic.relatedTo.toLowerCase().includes(lowerSearch))
          return topic
        const matched = topic.questions.filter(
          (q) => q.q.toLowerCase().includes(lowerSearch) || q.a.toLowerCase().includes(lowerSearch),
        )
        return matched.length > 0 ? { ...topic, questions: matched } : null
      })
      .filter(Boolean) as Part3Topic[]
  }, [lowerSearch])

  const part1PracticedCount = part1Topics.reduce(
    (c, t) => c + t.questions.filter((_, i) => practiceStore.practiced[`${t.topic}-${i}`]).length,
    0,
  )
  const part1Total = part1Topics.reduce((c, t) => c + t.questions.length, 0)
  const part2Practiced = part2Topics.filter((t) => practiceStore.practiced[`part2-${t.topic}`]).length
  const part3PracticedCount = part3Topics.reduce(
    (c, t) => c + t.questions.filter((_, i) => practiceStore.practiced[`${t.topic}-${i}`]).length,
    0,
  )
  const part3Total = part3Topics.reduce((c, t) => c + t.questions.length, 0)

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
        <h1 className="text-xl font-bold">口语题库</h1>
        <span className="text-xs text-[--color-text-secondary]">2026年5-8月</span>
      </div>

      {/* Search + Stats */}
      <div className="mb-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-text-secondary]"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索题目、关键词..."
            className="w-full rounded-xl bg-gray-50 py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-blue-200"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[--color-text-secondary] hover:text-[--color-text-primary]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3l8 8M3 11l8-8" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-2 flex gap-3 text-xs text-[--color-text-secondary]">
          {tab === 'Part1' && (
            <span>已练习 {part1PracticedCount}/{part1Total} 题</span>
          )}
          {tab === 'Part2' && (
            <span>已练习 {part2Practiced}/{part2Topics.length} 题</span>
          )}
          {tab === 'Part3' && (
            <span>已练习 {part3PracticedCount}/{part3Total} 题</span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex rounded-full bg-gray-100 p-1">
        {(['Part1', 'Part2', 'Part3'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setExpandedTopic(null) }}
            className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-all ${
              tab === t
                ? 'bg-white text-[--color-text-primary] shadow-sm'
                : 'text-[--color-text-secondary]'
            }`}
          >
            {t === 'Part1' ? 'Part 1' : t === 'Part2' ? 'Part 2' : 'Part 3'}
          </button>
        ))}
      </div>

      {/* Part 1 */}
      {tab === 'Part1' && (
        <div className="space-y-3">
          {filteredPart1.length === 0 ? (
            <div className="rounded-2xl bg-[--color-card] p-10 text-center shadow-sm">
              <p className="text-sm text-[--color-text-secondary]">没有匹配的题目</p>
            </div>
          ) : (
            filteredPart1.map((topic) => (
            <TopicCard
              key={topic.topic}
              topic={topic}
              tag={topic.tag}
              expanded={expandedTopic === topic.topic}
              onToggle={() => setExpandedTopic(expandedTopic === topic.topic ? null : topic.topic)}
              revealedAnswers={revealedAnswers}
              onToggleAnswer={toggleAnswer}
              onPractice={handlePractice}
              practiced={practiceStore.practiced}
              onTogglePracticed={practiceStore.togglePracticed}
            />
          )))
          }
        </div>
      )}

      {/* Part 2 */}
      {tab === 'Part2' && (
        <div className="space-y-3">
          {filteredPart2.length === 0 ? (
            <div className="rounded-2xl bg-[--color-card] p-10 text-center shadow-sm">
              <p className="text-sm text-[--color-text-secondary]">没有匹配的题目</p>
            </div>
          ) : (
            filteredPart2.map((topic) => (
            <Part2Card
              key={topic.topic}
              topic={topic}
              tag={topic.tag}
              expanded={expandedTopic === topic.topic}
              onToggle={() => setExpandedTopic(expandedTopic === topic.topic ? null : topic.topic)}
              revealed={revealedAnswers.has(topic.topic)}
              onToggleAnswer={() => toggleAnswer(topic.topic)}
              onPractice={handlePractice}
              practiced={practiceStore.practiced}
              onTogglePracticed={practiceStore.togglePracticed}
            />
          )))
          }
        </div>
      )}

      {/* Part 3 */}
      {tab === 'Part3' && (
        <div className="space-y-4">
          {filteredPart3.length === 0 ? (
            <div className="rounded-2xl bg-[--color-card] p-10 text-center shadow-sm">
              <p className="text-sm text-[--color-text-secondary]">没有匹配的题目</p>
            </div>
          ) : (
            filteredPart3.map((topic) => (
            <Part3Card
              key={topic.topic}
              topic={topic}
              expanded={expandedTopic === topic.topic}
              onToggle={() => setExpandedTopic(expandedTopic === topic.topic ? null : topic.topic)}
              revealedAnswers={revealedAnswers}
              onToggleAnswer={toggleAnswer}
              onPractice={handlePractice}
              practiced={practiceStore.practiced}
              onTogglePracticed={practiceStore.togglePracticed}
            />
          )))
          }
        </div>
      )}

      {/* Practice modal - simple mode: countdown only, no expression matching */}
      {practicing && (
        <SpeechPractice
          expression={practicing.expression}
          alternatives=""
          simple
          duration={tab === 'Part1' ? 30 : tab === 'Part2' ? 90 : 50}
          onClose={() => setPracticing(null)}
        />
      )}
    </div>
  )
}

// Part 1 topic card
function TopicCard({ topic, tag, expanded, onToggle, revealedAnswers, onToggleAnswer, onPractice, practiced, onTogglePracticed }: {
  topic: Part1Topic
  tag: string
  expanded: boolean
  onToggle: () => void
  revealedAnswers: Set<string>
  onToggleAnswer: (key: string) => void
  onPractice: (expr: string) => void
  practiced: Record<string, boolean>
  onTogglePracticed: (key: string) => void
}) {
  const tagColor = tag === '新题' ? 'bg-blue-50 text-blue-600' : tag === '必考' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
  const practicedCount = topic.questions.filter((_, i) => practiced[`${topic.topic}-${i}`]).length
  return (
    <div className="rounded-2xl bg-[--color-card] shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left">
        <div className="flex items-center gap-3">
          <span className="font-medium">{topic.topic}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${tagColor}`}>{tag}</span>
        </div>
        <div className="flex items-center gap-3">
          {practicedCount > 0 && (
            <span className="text-xs text-emerald-600">{practicedCount}/{topic.questions.length}</span>
          )}
          <span className="text-xs text-[--color-text-secondary]">{topic.questions.length} 题</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          {topic.questions.map((qa, i) => {
            const key = `${topic.topic}-${i}`
            const revealed = revealedAnswers.has(key)
            return (
              <div key={i} className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-medium mb-2">Q: {qa.q}</p>
                {revealed && (
                  <p className="text-sm text-emerald-700 mb-3 leading-relaxed">{qa.a}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleAnswer(key)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      revealed
                        ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        : 'bg-gray-900 text-white hover:opacity-90'
                    }`}
                  >
                    {revealed ? '隐藏答案' : '显示答案'}
                  </button>
                  <button
                    onClick={() => onPractice(qa.a.slice(0, 30))}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    练习
                  </button>
                  <button
                    onClick={() => onTogglePracticed(key)}
                    className={`ml-auto rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      practiced[key]
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-500'
                    }`}
                  >
                    {practiced[key] ? '✓ 已练' : '标记'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Part 2 topic card
function Part2Card({ topic, tag, expanded, onToggle, revealed, onToggleAnswer, onPractice, practiced, onTogglePracticed }: {
  topic: Part2Topic
  tag: string
  expanded: boolean
  onToggle: () => void
  revealed: boolean
  onToggleAnswer: () => void
  onPractice: (expr: string) => void
  practiced: Record<string, boolean>
  onTogglePracticed: (key: string) => void
}) {
  const tagColor = tag === '新题' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'
  return (
    <div className="rounded-2xl bg-[--color-card] shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="font-medium truncate">{topic.topic}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${tagColor}`}>{tag}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
          className={`shrink-0 ml-2 transition-transform ${expanded ? 'rotate-180' : ''}`}>
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-3">
          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-xs text-blue-700">{topic.cueCard}</p>
          </div>
          {revealed && (
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-emerald-700 leading-relaxed">{topic.answer}</p>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={onToggleAnswer}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                revealed ? 'bg-gray-200 text-gray-600' : 'bg-gray-900 text-white'
              }`}
            >
              {revealed ? '隐藏答案' : '显示答案'}
            </button>
            <button
              onClick={() => onPractice(topic.topic)}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
            >
              练习
            </button>
            <button
              onClick={() => onTogglePracticed(`part2-${topic.topic}`)}
              className={`ml-auto rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                practiced[`part2-${topic.topic}`]
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-500'
              }`}
            >
              {practiced[`part2-${topic.topic}`] ? '✓ 已练' : '标记'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Part 3 topic card
function Part3Card({ topic, expanded, onToggle, revealedAnswers, onToggleAnswer, onPractice, practiced, onTogglePracticed }: {
  topic: Part3Topic
  expanded: boolean
  onToggle: () => void
  revealedAnswers: Set<string>
  onToggleAnswer: (key: string) => void
  onPractice: (expr: string) => void
  practiced: Record<string, boolean>
  onTogglePracticed: (key: string) => void
}) {
  const practicedCount = topic.questions.filter((_, i) => practiced[`${topic.topic}-${i}`]).length
  return (
    <div className="rounded-2xl bg-[--color-card] shadow-sm overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left">
        <div className="flex-1 min-w-0">
          <span className="font-medium">{topic.topic}</span>
          <p className="text-xs text-[--color-text-secondary] mt-0.5 truncate">关联：{topic.relatedTo}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-2">
          {practicedCount > 0 && (
            <span className="text-xs text-emerald-600">{practicedCount}/{topic.questions.length}</span>
          )}
          <span className="text-xs text-[--color-text-secondary]">{topic.questions.length} 题</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          {topic.questions.map((qa, i) => {
            const key = `${topic.topic}-${i}`
            const revealed = revealedAnswers.has(key)
            return (
              <div key={i} className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm font-medium mb-2">Q: {qa.q}</p>
                {revealed && (
                  <p className="text-sm text-emerald-700 mb-3 leading-relaxed">{qa.a}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleAnswer(key)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      revealed ? 'bg-gray-200 text-gray-600' : 'bg-gray-900 text-white'
                    }`}
                  >
                    {revealed ? '隐藏答案' : '显示答案'}
                  </button>
                  <button
                    onClick={() => onPractice(qa.a.slice(0, 30))}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    练习
                  </button>
                  <button
                    onClick={() => onTogglePracticed(key)}
                    className={`ml-auto rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      practiced[key]
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-500'
                    }`}
                  >
                    {practiced[key] ? '✓ 已练' : '标记'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
