import { useState } from 'react'
import { API_BASE_URL } from '../../constants'
import OtpInput from './OtpInput'
import '../Auth/Auth.css'

function ChangePasswordForm({ onSuccess }) {
  const [step, setStep] = useState('password') // password | otp | success
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/profile/password/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ purpose: 'change-password' }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message); return }
      setStep('otp')
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)
    try {
      await fetch(`${API_BASE_URL}/profile/password/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ purpose: 'change-password' }),
      })
    } catch { /* silent */ }
    finally { setLoading(false) }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) { setError('Enter 6-digit OTP'); return }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/profile/password/change`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ otp, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message); return }
      setStep('success')
      setTimeout(onSuccess, 1500)
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div>
        <h2 className="auth__title">Password Changed</h2>
        <p className="auth__message auth__message--success">
          Password changed successfully!
        </p>
      </div>
    )
  }

  if (step === 'otp') {
    return (
      <OtpInput
        title="Verify OTP"
        subtitle="OTP sent to your registered email"
        otp={otp}
        setOtp={setOtp}
        error={error}
        loading={loading}
        onSubmit={handleVerifyOtp}
        onResend={sendOtp}
      />
    )
  }

  return (
    <div>
      <h2 className="auth__title">Change Password</h2>
      <p className="auth__subtitle">Enter your new login password</p>

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={handlePasswordSubmit}>
        <div className="auth__field">
          <label className="auth__label">New Password</label>
          <input
            className="auth__input"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
            autoFocus
          />
        </div>
        <div className="auth__field">
          <label className="auth__label">Confirm Password</label>
          <input
            className={`auth__input ${error ? 'auth__input--error' : ''}`}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Continue'}
        </button>
      </form>
    </div>
  )
}

export default ChangePasswordForm
