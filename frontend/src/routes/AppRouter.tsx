import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/login'
import DashboardPage from '../pages/dashboard'
import HomePage from '../pages/home'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from '../components/ProtectedRoute'
import { ProtectedRouteforAuth } from '../components/ProtectedRoute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
        <Route path="/register" element={<ProtectedRouteforAuth><RegisterPage /></ProtectedRouteforAuth>} />
        <Route path="/login" element={<ProtectedRouteforAuth><LoginPage /></ProtectedRouteforAuth>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
