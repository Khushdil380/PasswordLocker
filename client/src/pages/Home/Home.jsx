import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import Problem from '../../components/Problem/Problem'
import Solution from '../../components/Solution/Solution'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import Privacy from '../../components/Privacy/Privacy'
import CTA from '../../components/CTA/CTA'
import Footer from '../../components/Footer/Footer'
import AuthModal from '../../components/Auth/AuthModal'

function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLoginSuccess = (data) => {
    login(data.user)
    navigate('/dashboard', { replace: true })
  }

  return (
    <>
      <Header />
      <main>
        <Hero onGetStarted={() => setAuthOpen(true)} />
        <Problem />
        <Solution />
        <HowItWorks />
        <Privacy />
        <CTA onGetStarted={() => setAuthOpen(true)} />
      </main>
      <Footer />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}

export default Home
