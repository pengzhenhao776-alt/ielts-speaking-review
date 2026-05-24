import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import QuestionBank from './pages/QuestionBank'

function RequireTeacher({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.currentUser)
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'teacher') return <Navigate to="/student" replace />
  return <>{children}</>
}

function RequireStudent({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.currentUser)
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'student') return <Navigate to="/" replace />
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
          <Route path="/question-bank" element={<QuestionBank />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
