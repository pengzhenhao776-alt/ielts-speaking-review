import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import ConfirmModal from './ConfirmModal'

export default function Layout() {
  const navigate = useNavigate()
  const currentUser = useAuthStore((s) => s.currentUser)
  const logout = useAuthStore((s) => s.logout)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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
              onClick={() => setShowLogoutConfirm(true)}
              className="text-sm text-[--color-text-secondary] transition-colors hover:text-[--color-text-primary]"
            >
              退出
            </button>
          </div>
        </div>
      )}
      <Outlet />

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
