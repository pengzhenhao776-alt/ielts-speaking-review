import { useParams, useNavigate } from 'react-router-dom'
import { useTemplateStore } from '../store/templateStore'
import TemplateView from '../components/Template/TemplateView'

export default function TemplateReview() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const template = id ? useTemplateStore((s) => s.getTemplate(id)) : undefined

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-[--color-text-secondary]">未找到该模板</p>
        <button
          onClick={() => navigate('/')}
          className="rounded-full bg-gray-100 px-6 py-2 text-sm font-medium text-[--color-text-primary]"
        >
          返回首页
        </button>
      </div>
    )
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
        <h1 className="text-xl font-bold">思路模板</h1>
      </div>

      <TemplateView template={template} />
    </div>
  )
}
