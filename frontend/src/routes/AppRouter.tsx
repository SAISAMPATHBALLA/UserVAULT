import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from '../components/ProtectedRoute'
import { ProtectedRouteforAuth } from '../components/ProtectedRoute'
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<ProtectedRouteforAuth><RegisterPage /></ProtectedRouteforAuth>} />
        <Route path="/login" element={<ProtectedRouteforAuth><LoginPage/></ProtectedRouteforAuth>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
