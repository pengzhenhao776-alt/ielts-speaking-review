import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Layout() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.currentUser)
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="mx-auto max-w-3xl px-5 py-6">
      {currentUser && (
        <div className="mb-6 flex items-center justify-between border-b border-[--color-border] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{currentUser.name}</span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-[--color-text-secondary]">
              {currentUser.role === 'teacher' ? '老师' : '学生'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {currentUser.role === 'teacher' && (
              <button
                onClick={() => navigate('/students')}
                className="text-sm text-[--color-text-secondary] transition-colors hover:text-[--color-text-primary]"
              >
                学生管理
              </button>
            )}
            <button
              onClick={() => { logout(); navigate('/login') }}
              className="text-sm text-[--color-text-secondary] transition-colors hover:text-[--color-text-primary]"
            >
              退出
            </button>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  )
}
