import { useSearchParams } from 'react-router-dom'
import { decode } from '../utils/share'
import type { Deck, SpeakingTemplate } from '../types'
import CardDeck from '../components/Card/CardDeck'
import TemplateView from '../components/Template/TemplateView'

interface SharedDeck {
  title: string
  description: string
  cards: Deck['cards']
  locked?: boolean
}

interface SharedTemplate {
  topic: string
  sections: SpeakingTemplate['sections']
  locked?: boolean
}

function LockedMessage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <span className="text-5xl">🔒</span>
      <p className="text-lg font-semibold text-[--color-text-primary]">本节课尚未解锁</p>
      <p className="text-sm text-[--color-text-secondary]">
        请联系老师在课后解锁本节内容
      </p>
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

  if (type === 'deck') {
    const deck = decode<SharedDeck>(encoded)
    if (!deck || !deck.cards) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-[--color-text-secondary]">无法解析卡片组数据</p>
        </div>
      )
    }
    if (deck.locked) return <LockedMessage />
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold">{deck.title}</h1>
          {deck.description && (
            <p className="mt-1 text-sm text-[--color-text-secondary]">{deck.description}</p>
          )}
          <p className="mt-1 text-xs text-[--color-text-secondary]">
            {deck.cards.length} 张卡片
          </p>
        </div>
        <CardDeck cards={deck.cards} readOnly />
      </div>
    )
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
    if (template.locked) return <LockedMessage />
    return (
      <div>
        <h1 className="mb-6 text-xl font-bold">口语思路模板</h1>
        <TemplateView template={template as SpeakingTemplate} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <p className="text-[--color-text-secondary]">未知的分享类型</p>
    </div>
  )
}
