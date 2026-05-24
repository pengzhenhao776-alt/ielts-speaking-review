import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { decode } from '../utils/share'
import type { Deck, SpeakingTemplate } from '../types'
import { useDeckStore } from '../store/deckStore'
import { useTemplateStore } from '../store/templateStore'
import { useAuthStore } from '../store/authStore'
import { seedDecks, seedTemplates } from '../data/seed'
import CardDeck from '../components/Card/CardDeck'
import TemplateView from '../components/Template/TemplateView'

interface SharedDeck {
  title: string
  description: string
  cards: Deck['cards']
}

interface SharedTemplate {
  topic: string
  sections: SpeakingTemplate['sections']
}

interface SharedAll {
  decks: SharedDeck[]
  templates: SharedTemplate[]
  students: { phone: string; name: string; password: string }[]
}

interface SharedActivate {
  decks: SharedDeck[]
  templates: SharedTemplate[]
  student: { phone: string; name: string; password: string }
}

function SharedDeckView({ title, description, cards }: SharedDeck) {
  const addDeck = useDeckStore((s) => s.createDeck)
  const addCard = useDeckStore((s) => s.addCard)

  useEffect(() => {
    const existing = useDeckStore.getState().decks.find((d) => d.title === title)
    if (existing) {
      useDeckStore.getState().updateDeck(existing.id, { title, description })
      return
    }
    const deck = addDeck(title, description)
    for (const card of cards) {
      addCard(deck.id, { front: card.front, back: card.back })
    }
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-[--color-text-secondary]">{description}</p>
        )}
        <p className="mt-1 text-xs text-[--color-text-secondary]">{cards.length} 张卡片</p>
      </div>
      <CardDeck cards={cards} readOnly />
    </div>
  )
}

function SharedTemplateView({ template }: { template: SharedTemplate }) {
  const addTpl = useTemplateStore((s) => s.createTemplate)
  const addPoint = useTemplateStore((s) => s.addPoint)
  const setTitle = useTemplateStore((s) => s.setSectionTitle)

  useEffect(() => {
    const existing = useTemplateStore.getState().templates.find((t) => t.topic === template.topic)
    if (existing) return
    const tpl = addTpl(template.topic)
    const sections = useTemplateStore.getState().getTemplate(tpl.id)!.sections
    for (let i = 0; i < template.sections.length && i < sections.length; i++) {
      setTitle(tpl.id, sections[i].id, template.sections[i].title)
      for (const point of template.sections[i].points) {
        addPoint(tpl.id, sections[i].id, point)
      }
    }
  }, [])

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">口语思路模板</h1>
      <TemplateView template={template as SpeakingTemplate} />
    </div>
  )
}

function ActivateView({ data }: { data: SharedActivate }) {
  const navigate = useNavigate()
  const syncBindings = useAuthStore((s) => s.syncBindings)

  useEffect(() => {
    // Sync student account
    syncBindings([data.student])
    // Auto-import all course data from the built-in seed
    const { createDeck: cd, addCard: ac, decks: existingDecks } = useDeckStore.getState()
    for (const seed of seedDecks) {
      if (existingDecks.find((ed) => ed.title === seed.title)) continue
      const deck = cd(seed.title, seed.description)
      for (const card of seed.cards) {
        ac(deck.id, { front: card.front, back: card.back })
      }
    }
    const { createTemplate: ct, addPoint: ap, setSectionTitle: st, templates: existingTpls } = useTemplateStore.getState()
    for (const seed of seedTemplates) {
      if (existingTpls.find((et) => et.topic === seed.topic)) continue
      const tpl = ct(seed.topic)
      const sections = useTemplateStore.getState().getTemplate(tpl.id)!.sections
      for (let i = 0; i < seed.sections.length && i < sections.length; i++) {
        st(tpl.id, sections[i].id, seed.sections[i].title)
        for (const point of seed.sections[i].points) {
          ap(tpl.id, sections[i].id, point)
        }
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <span className="text-5xl">✅</span>
      <p className="text-lg font-semibold text-[--color-text-primary]">{data.student.name}，激活成功！</p>
      <div className="text-sm text-[--color-text-secondary] text-center space-y-1">
        <p>课程内容已自动导入</p>
        <p>登录账号：{data.student.phone}</p>
        <p>密码：{data.student.password}</p>
      </div>
      <button
        onClick={() => navigate('/login')}
        className="mt-4 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        去登录
      </button>
    </div>
  )
}

function AllCoursesView({ data }: { data: SharedAll }) {
  const navigate = useNavigate()
  const syncBindings = useAuthStore((s) => s.syncBindings)

  useEffect(() => {
    // Sync student bindings
    if (data.students && data.students.length > 0) {
      syncBindings(data.students)
    }
    // Sync all decks
    const { createDeck: cd, addCard: ac, decks: existingDecks } = useDeckStore.getState()
    for (const d of data.decks || []) {
      const exists = existingDecks.find((ed) => ed.title === d.title)
      if (exists) continue
      const deck = cd(d.title, d.description)
      for (const card of d.cards) {
        ac(deck.id, { front: card.front, back: card.back })
      }
    }
    // Sync all templates
    const { createTemplate: ct, addPoint: ap, setSectionTitle: st, templates: existingTpls } = useTemplateStore.getState()
    for (const t of data.templates || []) {
      const exists = existingTpls.find((et) => et.topic === t.topic)
      if (exists) continue
      const tpl = ct(t.topic)
      const sections = useTemplateStore.getState().getTemplate(tpl.id)!.sections
      for (let i = 0; i < t.sections.length && i < sections.length; i++) {
        st(tpl.id, sections[i].id, t.sections[i].title)
        for (const point of t.sections[i].points) {
          ap(tpl.id, sections[i].id, point)
        }
      }
    }
  }, [])

  const deckCount = data.decks?.length || 0
  const tplCount = data.templates?.length || 0
  const studentCount = data.students?.length || 0

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <span className="text-5xl">✅</span>
      <p className="text-lg font-semibold text-[--color-text-primary]">课程数据已同步</p>
      <div className="text-sm text-[--color-text-secondary] text-center space-y-1">
        <p>{deckCount} 套卡片组、{tplCount} 个模板已保存</p>
        {studentCount > 0 && <p>{studentCount} 名学生已绑定</p>}
      </div>
      <button
        onClick={() => navigate('/login')}
        className="mt-4 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        去登录
      </button>
    </div>
  )
}

export default function SharePage() {
  const [params] = useSearchParams()
  const type = params.get('type')
  const encoded = params.get('d')

  if (!encoded) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-[--color-text-secondary]">无效的分享链接</p>
      </div>
    )
  }

  if (type === 'activate') {
    const activate = decode<SharedActivate>(encoded)
    if (!activate || !activate.student) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-[--color-text-secondary]">无效的激活链接</p>
        </div>
      )
    }
    return <ActivateView data={activate} />
  }

  if (type === 'all') {
    const all = decode<SharedAll>(encoded)
    if (!all || !all.decks) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-[--color-text-secondary]">无法解析课程数据</p>
        </div>
      )
    }
    return <AllCoursesView data={all} />
  }

  if (type === 'deck') {
    const deck = decode<SharedDeck>(encoded)
    if (!deck || !deck.cards) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-[--color-text-secondary]">无法解析卡片组数据</p>
        </div>
      )
    }
    return <SharedDeckView title={deck.title} description={deck.description} cards={deck.cards} />
  }

  if (type === 'template') {
    const template = decode<SharedTemplate>(encoded)
    if (!template || !template.sections) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-[--color-text-secondary]">无法解析模板数据</p>
        </div>
      )
    }
    return <SharedTemplateView template={template} />
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <p className="text-[--color-text-secondary]">未知的分享类型</p>
    </div>
  )
}
