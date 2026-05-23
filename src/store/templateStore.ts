import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SpeakingTemplate, TemplateSection } from '../types'

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function now(): string {
  return new Date().toISOString()
}

const DEFAULT_SECTIONS: Omit<TemplateSection, 'id'>[] = [
  { title: '开头', points: [] },
  { title: '主体', points: [] },
  { title: '结尾', points: [] },
]

interface TemplateState {
  templates: SpeakingTemplate[]

  createTemplate: (topic: string) => SpeakingTemplate
  updateTemplate: (id: string, data: Partial<Pick<SpeakingTemplate, 'topic'>>) => void
  toggleLock: (id: string) => void
  deleteTemplate: (id: string) => void

  setSectionTitle: (templateId: string, sectionId: string, title: string) => void
  addPoint: (templateId: string, sectionId: string, point: string) => void
  updatePoint: (templateId: string, sectionId: string, index: number, point: string) => void
  removePoint: (templateId: string, sectionId: string, index: number) => void

  getTemplate: (id: string) => SpeakingTemplate | undefined
}

export const useTemplateStore = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: [],

      createTemplate(topic) {
        const template: SpeakingTemplate = {
          id: genId(),
          topic,
          sections: DEFAULT_SECTIONS.map((s) => ({ ...s, id: genId() })),
          locked: true,
          createdAt: now(),
          updatedAt: now(),
        }
        set((s) => ({ templates: [...s.templates, template] }))
        return template
      },

      updateTemplate(id, data) {
        set((s) => ({
          templates: s.templates.map((t) =>
            t.id === id ? { ...t, ...data, updatedAt: now() } : t
          ),
        }))
      },

      toggleLock(id) {
        set((s) => ({
          templates: s.templates.map((t) =>
            t.id === id ? { ...t, locked: !t.locked, updatedAt: now() } : t
          ),
        }))
      },

      deleteTemplate(id) {
        set((s) => ({ templates: s.templates.filter((t) => t.id !== id) }))
      },

      setSectionTitle(templateId, sectionId, title) {
        set((s) => ({
          templates: s.templates.map((t) =>
            t.id === templateId
              ? {
                  ...t,
                  sections: t.sections.map((sec) =>
                    sec.id === sectionId ? { ...sec, title } : sec
                  ),
                  updatedAt: now(),
                }
              : t
          ),
        }))
      },

      addPoint(templateId, sectionId, point) {
        set((s) => ({
          templates: s.templates.map((t) =>
            t.id === templateId
              ? {
                  ...t,
                  sections: t.sections.map((sec) =>
                    sec.id === sectionId
                      ? { ...sec, points: [...sec.points, point] }
                      : sec
                  ),
                  updatedAt: now(),
                }
              : t
          ),
        }))
      },

      updatePoint(templateId, sectionId, index, point) {
        set((s) => ({
          templates: s.templates.map((t) =>
            t.id === templateId
              ? {
                  ...t,
                  sections: t.sections.map((sec) =>
                    sec.id === sectionId
                      ? {
                          ...sec,
                          points: sec.points.map((p, i) => (i === index ? point : p)),
                        }
                      : sec
                  ),
                  updatedAt: now(),
                }
              : t
          ),
        }))
      },

      removePoint(templateId, sectionId, index) {
        set((s) => ({
          templates: s.templates.map((t) =>
            t.id === templateId
              ? {
                  ...t,
                  sections: t.sections.map((sec) =>
                    sec.id === sectionId
                      ? { ...sec, points: sec.points.filter((_, i) => i !== index) }
                      : sec
                  ),
                  updatedAt: now(),
                }
              : t
          ),
        }))
      },

      getTemplate(id) {
        return get().templates.find((t) => t.id === id)
      },
    }),
    { name: 'ielts_templates' }
  )
)
