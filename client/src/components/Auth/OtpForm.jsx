import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../constants'
import './Auth.css'

const RESEND_COOLDOWN = 120 // 2 minutes in seconds

function OtpForm({ email, onSuccess, onBack }) {
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN)

  useEffect(() => {
    if (resendTimer <= 0) return
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [resendTimer])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Invalid OTP')
        return
      }

      setSuccess('Account created! Redirecting to login...')
      setTimeout(() => onSuccess(data), 2000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    try {
      await fetch(`${API_BASE_URL}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setResendTimer(RESEND_COOLDOWN)
    } catch {
      // silent fail
    }
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <h2 className="auth__title">Verify OTP</h2>
      <p className="auth__subtitle">
        We've sent a 6-digit code to <strong>{email}</strong>
      </p>

      {error && <p className="auth__message auth__message--error">{error}</p>}
      {success && <p className="auth__message auth__message--success">{success}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__field">
          <label className="auth__label">Enter OTP</label>
          <input
            className="auth__input"
            type="text"
            value={otp}
            onChange={(e) => { setOtp(e.target.value); setError('') }}
            placeholder="6-digit code"
            maxLength={6}
            required
            disabled={!!success}
          />
        </div>

        <button className="auth__btn" type="submit" disabled={loading || !!success}>
          {loading ? 'Verifying...' : 'Verify & Create Account'}
        </button>
      </form>

      <div className="auth__footer">
        <p>
          {resendTimer > 0 ? (
            <span className="auth__timer">Resend OTP in {formatTime(resendTimer)}</span>
          ) : (
            <span className="auth__link" onClick={handleResend}>Resend OTP</span>
          )}
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <span className="auth__link" onClick={onBack}>← Back</span>
        </p>
      </div>
    </div>
  )
}

export default OtpForm
