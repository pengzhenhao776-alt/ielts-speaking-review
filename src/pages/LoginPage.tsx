import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const loginAsDemo = useAuthStore((s) => s.loginAsDemo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!phone.trim() || !password.trim()) {
      setError('请输入手机号和密码')
      return
    }
    const user = login(phone.trim(), password)
    if (!user) {
      setError('密码错误，请重试')
      return
    }
    navigate(user.role === 'teacher' ? '/' : '/student')
  }

  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">雅思口语复习</h1>
          <p className="mt-2 text-sm text-[--color-text-secondary]">
            输入手机号登录，首次登录自动注册
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
              手机号
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
              placeholder="请输入手机号"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent] focus:ring-1 focus:ring-[--color-accent]"
              placeholder="请输入密码（至少6位）"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gray-900 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            登录 / 注册
          </button>
        </form>

        <div className="mt-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400">还没有账号？</span>
            </div>
          </div>
          <button
            onClick={() => { loginAsDemo(); navigate('/student') }}
            className="w-full rounded-full border-2 border-blue-200 bg-blue-50 py-3.5 text-base font-medium text-blue-600 transition-colors hover:bg-blue-100"
          >
            免费体验 · 无需注册
          </button>
          <p className="mt-3 text-center text-xs text-[--color-text-secondary]">
            一键试用 · 无需输入手机号
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[--color-text-secondary]">
          注册即享体验内容 · 购买后老师为你升级为完整版
        </p>
      </div>
    </div>
  )
}
