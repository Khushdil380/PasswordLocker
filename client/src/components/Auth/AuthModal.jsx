import { useState } from 'react'
import Modal from '../Modal/Modal'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import OtpForm from './OtpForm'
import ForgotPasswordForm from './ForgotPasswordForm'

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [view, setView] = useState('login')
  const [otpEmail, setOtpEmail] = useState('')

  const handleClose = () => {
    setView('login')
    setOtpEmail('')
    onClose()
  }

  const handleOtpSent = (email) => {
    setOtpEmail(email)
    setView('otp')
  }

  const handleOtpVerified = () => {
    setView('login')
    setOtpEmail('')
  }

  const handleLoginSuccess = (data) => {
    handleClose()
    onLoginSuccess(data)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {view === 'login' && (
        <LoginForm
          onSwitchToSignup={() => setView('signup')}
          onSwitchToForgot={() => setView('forgot')}
          onSuccess={handleLoginSuccess}
        />
      )}
      {view === 'signup' && (
        <SignupForm
          onSwitchToLogin={() => setView('login')}
          onOtpSent={handleOtpSent}
        />
      )}
      {view === 'otp' && (
        <OtpForm
          email={otpEmail}
          onSuccess={handleOtpVerified}
          onBack={() => setView('signup')}
        />
      )}
      {view === 'forgot' && (
        <ForgotPasswordForm
          onSwitchToLogin={() => setView('login')}
        />
      )}
    </Modal>
  )
}

export default AuthModal
