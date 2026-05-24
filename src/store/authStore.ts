import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  phone: string
  password: string
  name: string
  role: 'teacher' | 'student' | 'demo'
}

interface AuthState {
  users: User[]
  currentUser: User | null

  login: (phone: string, password: string) => User | null
  loginAsDemo: () => void
  logout: () => void
  addStudent: (phone: string, name: string, password: string) => User
  removeStudent: (phone: string) => void
  getStudents: () => User[]
  syncBindings: (students: { phone: string; name: string; password: string }[]) => void
}

const TEACHER_PHONE = '13312211090'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [
        { phone: TEACHER_PHONE, password: 'Pzh200776', name: 'Evan老师', role: 'teacher' },
      ],
      currentUser: null,

      syncBindings(students) {
        const current = get().users.filter((u) => u.role !== 'student')
        const newStudents: User[] = students.map((s) => ({
          phone: s.phone,
          name: s.name,
          password: s.password,
          role: 'student' as const,
        }))
        const merged = [...current]
        for (const ns of newStudents) {
          const idx = merged.findIndex((u) => u.phone === ns.phone)
          if (idx >= 0) {
            merged[idx] = ns
          } else {
            merged.push(ns)
          }
        }
        set({ users: merged })
      },

      login(phone, password) {
        const existing = get().users.find((u) => u.phone === phone)
        if (existing) {
          if (existing.password !== password) return null
          set({ currentUser: existing })
          return existing
        }
        return null
      },

      loginAsDemo() {
        set({
          currentUser: { phone: '', password: '', name: '体验用户', role: 'demo' },
        })
      },

      logout() {
        const user = get().currentUser
        set({ currentUser: null })
        // 体验用户退出时清除数据
        if (user?.role === 'demo') {
          try {
            localStorage.removeItem('ielts_decks')
            localStorage.removeItem('ielts_templates')
          } catch {}
        }
      },

      addStudent(phone, name, password) {
        const existing = get().users.find((u) => u.phone === phone)
        if (existing) throw new Error('该手机号已存在')
        const user: User = { phone, name, password, role: 'student' }
        set((s) => ({ users: [...s.users, user] }))
        return user
      },

      removeStudent(phone) {
        if (phone === TEACHER_PHONE) return
        set((s) => ({ users: s.users.filter((u) => u.phone !== phone) }))
      },

      getStudents() {
        return get().users.filter((u) => u.role === 'student')
      },
    }),
    { name: 'ielts_auth_v2' }
  )
)
