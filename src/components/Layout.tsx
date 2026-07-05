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
              {currentUser.role === 'teacher' ? '老师' : currentUser.role === 'visitor' ? '体验' : '学生'}
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
      {(currentUser?.role === 'visitor' || currentUser?.role === 'demo') && (
        <div className="mb-5 flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 text-white shadow-sm">
          <div>
            <p className="text-sm font-semibold">体验模式 · 部分内容预览</p>
            <p className="mt-0.5 text-xs text-blue-100">购买后可解锁全部 68 道真题 + 8 套卡片 + 4 套模板</p>
          </div>
          <button
            onClick={() => {
              // Scroll to or navigate - for now just show site
              const el = document.getElementById('upgrade-section')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="shrink-0 ml-3 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-blue-600 transition-opacity hover:opacity-90"
          >
            立即购买
          </button>
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
