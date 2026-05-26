import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Preloader from './components/Preloader/Preloader'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <AuthProvider>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
