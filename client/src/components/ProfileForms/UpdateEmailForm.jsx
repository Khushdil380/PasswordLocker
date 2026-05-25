import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_BASE_URL } from '../../constants'
import OtpInput from './OtpInput'
import '../Auth/Auth.css'
import './ProfileForms.css'

function UpdateEmailForm({ onSuccess }) {
  const { user, login } = useAuth()
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault()
    setError('')

    if (!email || !email.includes('@') || !email.split('@')[1]?.includes('.')) {
      setError('Please enter a valid email address')
      return
    }
    if (email.toLowerCase() === user?.email) {
      setError('New email must be different from current email')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/profile/email/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ newEmail: email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message); return }
      setStep('otp')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) { setError('Please enter the 6-digit OTP'); return }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/profile/email/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ newEmail: email, otp }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message); return }

      login(data.user)
      setStep('success')
      setTimeout(onSuccess, 1500)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div>
        <h2 className="auth__title">Email Updated</h2>
        <p className="auth__message auth__message--success">
          Email updated successfully!
        </p>
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <OtpInput
        title="Verify New Email"
        subtitle={`OTP sent to ${email}`}
        otp={otp}
        setOtp={setOtp}
        error={error}
        loading={loading}
        onSubmit={handleVerifyOtp}
        onResend={handleSendOtp}
      />
    )
  }

  return (
    <div>
      <h2 className="auth__title">Update Email</h2>
      <p className="auth__subtitle">Current: {user?.email}</p>

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={handleSendOtp}>
        <div className="auth__field">
          <label className="auth__label">New Email</label>
          <input
            className={`auth__input ${error ? 'auth__input--error' : ''}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
            autoFocus
          />
        </div>
        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>
    </div>
  )
}

export default UpdateEmailForm
