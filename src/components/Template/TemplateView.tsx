import type { SpeakingTemplate } from '../../types'

interface Props {
  template: SpeakingTemplate
}

export default function TemplateView({ template }: Props) {
  return (
    <div>
      <h2 className="mb-5 text-xl font-bold">{template.topic}</h2>
      <div className="space-y-4">
        {template.sections.map((section) => (
          <div
            key={section.id}
            className="rounded-2xl bg-[--color-card] p-5 shadow-sm"
          >
            <h3 className="mb-3 text-base font-semibold">{section.title}</h3>
            {section.points.length > 0 ? (
              <ul className="space-y-2">
                {section.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-xl bg-gray-50 px-4 py-2.5"
                  >
                    <span className="mt-0.5 text-xs text-[--color-text-secondary]">
                      {i + 1}.
                    </span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[--color-text-secondary]">暂无要点</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
