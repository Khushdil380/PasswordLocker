import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Home from '../pages/Home/Home'
import Dashboard from '../pages/Dashboard/Dashboard'
import ResetPassword from '../pages/ResetPassword/ResetPassword'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return null

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Home />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" replace />}
      />
      <Route
        path="/reset-password/:token"
        element={user ? <Navigate to="/dashboard" replace /> : <ResetPassword />}
      />
    </Routes>
  )
}

export default AppRoutes
