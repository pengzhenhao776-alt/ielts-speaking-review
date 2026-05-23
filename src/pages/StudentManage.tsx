import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function StudentManage() {
  const navigate = useNavigate()
  const students = useAuthStore((s) => s.getStudents())
  const addStudent = useAuthStore((s) => s.addStudent)
  const removeStudent = useAuthStore((s) => s.removeStudent)

  const [showForm, setShowForm] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!phone.trim() || !name.trim() || !password.trim()) {
      setError('请填写所有字段')
      return
    }
    if (password.length < 6) {
      setError('密码至少6位')
      return
    }
    try {
      addStudent(phone.trim(), name.trim(), password)
      setPhone('')
      setName('')
      setPassword('')
      setShowForm(false)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const handleRemove = (phone: string, name: string) => {
    if (confirm(`确定删除学生 ${name}（${phone}）吗？`)) {
      removeStudent(phone)
    }
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
        <h1 className="text-xl font-bold">学生管理</h1>
        <button
          onClick={() => setShowForm(true)}
          className="ml-auto rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          添加学生
        </button>
      </div>

      {students.length === 0 ? (
        <div className="rounded-2xl bg-[--color-card] p-10 text-center shadow-sm">
          <p className="text-[--color-text-secondary]">暂无学生账号</p>
          <p className="mt-1 text-sm text-[--color-text-secondary]">
            添加学生后，学生可以用自己的手机号和密码登录
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {students.map((s) => (
            <div
              key={s.phone}
              className="flex items-center justify-between rounded-xl bg-[--color-card] p-4 shadow-sm"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-[--color-text-secondary]">{s.phone}</p>
              </div>
              <button
                onClick={() => handleRemove(s.phone, s.name)}
                className="rounded-full px-3 py-1 text-sm text-red-500 transition-colors hover:bg-red-50"
              >
                删除
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleAdd}
            className="w-full max-w-sm rounded-2xl bg-[--color-card] p-6 shadow-lg"
          >
            <h2 className="mb-5 text-lg font-semibold">添加学生</h2>

            <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
              姓名
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent]"
              placeholder="学生姓名"
              autoFocus
            />

            <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
              手机号（登录账号）
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-4 w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent]"
              placeholder="手机号"
            />

            <label className="mb-1 block text-sm font-medium text-[--color-text-secondary]">
              登录密码
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full rounded-xl border border-[--color-border] bg-gray-50 px-4 py-3 text-base outline-none focus:border-[--color-accent]"
              placeholder="至少6位"
            />

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setShowForm(false); setError('') }}
                className="flex-1 rounded-full border border-[--color-border] bg-white py-3 text-sm font-medium transition-colors hover:bg-gray-50"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-gray-900 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                添加
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
