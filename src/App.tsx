import { useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DeckCreate from './pages/DeckCreate'
import DeckReview from './pages/DeckReview'
import TemplateCreate from './pages/TemplateCreate'
import TemplateReview from './pages/TemplateReview'
import SharePage from './pages/SharePage'
import LoginPage from './pages/LoginPage'
import StudentHome from './pages/StudentHome'
import StudentManage from './pages/StudentManage'

function RequireTeacher({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login', { replace: true }); return }
    if (user.role !== 'teacher') { navigate('/student', { replace: true }) }
  }, [user, navigate])

  if (!user || user.role !== 'teacher') return null
  return <>{children}</>
}

function RequireStudent({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login', { replace: true }); return }
    if (user.role !== 'student') { navigate('/', { replace: true }) }
  }, [user, navigate])

  if (!user || user.role !== 'student') return null
  return <>{children}</>
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/share" element={<SharePage />} />

        <Route element={<Layout />}>
          <Route path="/" element={
            <RequireTeacher><HomePage /></RequireTeacher>
          } />
          <Route path="/students" element={
            <RequireTeacher><StudentManage /></RequireTeacher>
          } />
          <Route path="/deck/new" element={
            <RequireTeacher><DeckCreate /></RequireTeacher>
          } />
          <Route path="/deck/:id" element={
            <RequireTeacher><DeckCreate /></RequireTeacher>
          } />
          <Route path="/deck/:id/review" element={<DeckReview />} />
          <Route path="/template/new" element={
            <RequireTeacher><TemplateCreate /></RequireTeacher>
          } />
          <Route path="/template/:id" element={
            <RequireTeacher><TemplateCreate /></RequireTeacher>
          } />
          <Route path="/template/:id/review" element={<TemplateReview />} />
          <Route path="/student" element={
            <RequireStudent><StudentHome /></RequireStudent>
          } />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
