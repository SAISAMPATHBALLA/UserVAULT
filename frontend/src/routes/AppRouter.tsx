import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
