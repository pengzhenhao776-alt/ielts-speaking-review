import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTemplateStore } from '../store/templateStore'
import { generateShareUrl } from '../utils/share'
import TemplateEditor from '../components/Template/TemplateEditor'

export default function TemplateCreate() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const existing = id ? useTemplateStore((s) => s.getTemplate(id)) : undefined

  const [topic, setTopic] = useState(existing?.topic ?? '')
  const [sections, setSections] = useState(
    existing?.sections ?? [
      { id: 's1', title: '开头', points: [] },
      { id: 's2', title: '主体', points: [] },
      { id: 's3', title: '结尾', points: [] },
    ]
  )

  const createTemplate = useTemplateStore((s) => s.createTemplate)
  const updateTemplate = useTemplateStore((s) => s.updateTemplate)
  const deleteTemplate = useTemplateStore((s) => s.deleteTemplate)
  const setSectionTitle = useTemplateStore((s) => s.setSectionTitle)
  const addPoint = useTemplateStore((s) => s.addPoint)
  const updatePoint = useTemplateStore((s) => s.updatePoint)
  const removePoint = useTemplateStore((s) => s.removePoint)
  const toggleLock = useTemplateStore((s) => s.toggleLock)

  const handleSave = () => {
    if (!topic.trim()) return

    if (existing) {
      updateTemplate(existing.id, { topic: topic.trim() })
      sections.forEach((section) => {
        setSectionTitle(existing.id, section.id, section.title)
        const existingSection = existing.sections.find((s) => s.id === section.id)
        if (existingSection) {
          const oldCount = existingSection.points.length
          section.points.forEach((point, i) => {
            if (i < oldCount) {
              if (point !== existingSection.points[i]) {
                updatePoint(existing.id, section.id, i, point)
              }
            } else {
              addPoint(existing.id, section.id, point)
            }
          })
          for (let i = section.points.length; i < oldCount; i++) {
            removePoint(existing.id, section.id, section.points.length)
          }
        }
      })
      navigate(`/template/${existing.id}`)
    } else {
      const template = createTemplate(topic.trim())
      template.sections.forEach((defaultSection) => {
        const localSection = sections.find((s) => s.id === defaultSection.id)
        if (localSection) {
          setSectionTitle(template.id, defaultSection.id, localSection.title)
          localSection.points.forEach((point) => {
            addPoint(template.id, defaultSection.id, point)
          })
        }
      })
      navigate(`/template/${template.id}`)
    }
  }

  const handleDeleteTemplate = () => {
    if (existing && confirm('确定删除整个模板吗？此操作不可撤销。')) {
      deleteTemplate(existing.id)
      navigate('/')
    }
  }

  const handleShare = () => {
    const currentTemplate = useTemplateStore.getState().getTemplate(existing!.id)
    if (!currentTemplate) return
    const url = generateShareUrl('template', {
      topic: currentTemplate.topic,
      sections: currentTemplate.sections,
      locked: currentTemplate.locked,
    })
    navigator.clipboard.writeText(url).then(() => {
      alert('分享链接已复制到剪贴板！')
    })
  }

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
        <h1 className="text-xl font-bold">
          {existing ? '编辑思路模板' : '新建思路模板'}
        </h1>
        {existing && (
          <button
            onClick={() => toggleLock(existing.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              existing.locked
                ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
            }`}
          >
            {existing.locked ? '🔒 已锁定' : '🔓 已解锁'}
          </button>
        )}
        {existing && (
          <div className="ml-auto flex gap-2">
            <button
              onClick={handleShare}
              className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-[--color-text-primary] transition-colors hover:bg-gray-200"
            >
              分享
            </button>
            <button
              onClick={handleDeleteTemplate}
              className="rounded-full px-4 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-50"
            >
              删除
            </button>
          </div>
        )}
      </div>

      <div className="mb-6 rounded-2xl bg-[--color-card] p-5 shadow-sm">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full text-lg font-semibold outline-none placeholder:text-gray-300"
          placeholder="话题名称"
        />
      </div>

      <TemplateEditor
        sections={sections}
        onSectionTitleChange={(sectionId, title) => {
          setSections((prev) =>
            prev.map((s) => (s.id === sectionId ? { ...s, title } : s))
          )
        }}
        onAddPoint={(sectionId, point) => {
          setSections((prev) =>
            prev.map((s) =>
              s.id === sectionId ? { ...s, points: [...s.points, point] } : s
            )
          )
        }}
        onUpdatePoint={(sectionId, index, point) => {
          setSections((prev) =>
            prev.map((s) =>
              s.id === sectionId
                ? { ...s, points: s.points.map((p, i) => (i === index ? point : p)) }
                : s
            )
          )
        }}
        onRemovePoint={(sectionId, index) => {
          setSections((prev) =>
            prev.map((s) =>
              s.id === sectionId
                ? { ...s, points: s.points.filter((_, i) => i !== index) }
                : s
            )
          )
        }}
      />

      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={!topic.trim()}
          className="w-full rounded-full bg-gray-900 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          保存模板
        </button>
      </div>
    </div>
  )
}
