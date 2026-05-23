import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  phone: string
  password: string
  name: string
  role: 'teacher' | 'student'
}

interface AuthState {
  users: User[]
  currentUser: User | null

  login: (phone: string, password: string) => User | null
  logout: () => void
  addStudent: (phone: string, name: string, password: string) => User
  removeStudent: (phone: string) => void
  getStudents: () => User[]
}

const TEACHER_PHONE = '13312211090'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [
        { phone: TEACHER_PHONE, password: 'Pzh200776', name: 'Evan老师', role: 'teacher' },
      ],
      currentUser: null,

      login(phone, password) {
        const user = get().users.find(
          (u) => u.phone === phone && u.password === password
        )
        if (user) {
          set({ currentUser: user })
        }
        return user ?? null
      },

      logout() {
        set({ currentUser: null })
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
    { name: 'ielts_auth' }
  )
)
