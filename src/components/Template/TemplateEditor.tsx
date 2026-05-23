import { useState } from 'react'
import type { TemplateSection } from '../../types'

interface Props {
  sections: TemplateSection[]
  onSectionTitleChange: (sectionId: string, title: string) => void
  onAddPoint: (sectionId: string, point: string) => void
  onUpdatePoint: (sectionId: string, index: number, point: string) => void
  onRemovePoint: (sectionId: string, index: number) => void
  readOnly?: boolean
}

export default function TemplateEditor({
  sections,
  onSectionTitleChange,
  onAddPoint,
  onUpdatePoint,
  onRemovePoint,
  readOnly,
}: Props) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <SectionBlock
          key={section.id}
          section={section}
          onTitleChange={(title) => onSectionTitleChange(section.id, title)}
          onAddPoint={(point) => onAddPoint(section.id, point)}
          onUpdatePoint={(index, point) => onUpdatePoint(section.id, index, point)}
          onRemovePoint={(index) => onRemovePoint(section.id, index)}
          readOnly={readOnly}
        />
      ))}
    </div>
  )
}

function SectionBlock({
  section,
  onTitleChange,
  onAddPoint,
  onUpdatePoint,
  onRemovePoint,
  readOnly,
}: {
  section: TemplateSection
  onTitleChange: (title: string) => void
  onAddPoint: (point: string) => void
  onUpdatePoint: (index: number, point: string) => void
  onRemovePoint: (index: number) => void
  readOnly?: boolean
}) {
  const [newPoint, setNewPoint] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleAdd = () => {
    if (!newPoint.trim()) return
    onAddPoint(newPoint.trim())
    setNewPoint('')
  }

  const handleStartEdit = (index: number, current: string) => {
    setEditingIndex(index)
    setEditValue(current)
  }

  const handleSaveEdit = (index: number) => {
    if (editValue.trim()) {
      onUpdatePoint(index, editValue.trim())
    }
    setEditingIndex(null)
    setEditValue('')
  }

  return (
    <div className="rounded-2xl bg-[--color-card] p-5 shadow-sm">
      {readOnly ? (
        <h3 className="mb-3 text-base font-semibold">{section.title}</h3>
      ) : (
        <input
          value={section.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="mb-3 w-full text-base font-semibold outline-none"
          placeholder="段落标题"
        />
      )}

      {section.points.length > 0 && (
        <ul className="mb-3 space-y-2">
          {section.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-xl bg-gray-50 px-4 py-2.5"
            >
              <span className="mt-0.5 text-xs text-[--color-text-secondary]">
                {i + 1}.
              </span>
              {editingIndex === i && !readOnly ? (
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleSaveEdit(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(i)
                    if (e.key === 'Escape') setEditingIndex(null)
                  }}
                  className="flex-1 bg-transparent text-sm outline-none"
                  autoFocus
                />
              ) : (
                <span
                  className="flex-1 text-sm"
                  onDoubleClick={() => !readOnly && handleStartEdit(i, point)}
                >
                  {point}
                </span>
              )}
              {!readOnly && editingIndex !== i && (
                <button
                  onClick={() => handleStartEdit(i, point)}
                  className="text-xs text-[--color-text-secondary] hover:text-[--color-accent]"
                >
                  编辑
                </button>
              )}
              {!readOnly && (
                <button
                  onClick={() => onRemovePoint(i)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  删除
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!readOnly && (
        <div className="flex gap-2">
          <input
            value={newPoint}
            onChange={(e) => setNewPoint(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
            className="flex-1 rounded-xl border border-[--color-border] bg-gray-50 px-4 py-2 text-sm outline-none focus:border-[--color-accent]"
            placeholder="添加要点..."
          />
          <button
            onClick={handleAdd}
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            添加
          </button>
        </div>
      )}
    </div>
  )
}
