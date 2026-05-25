import { useState } from 'react'
import { API_BASE_URL } from '../../constants'
import './Auth.css'

function ForgotPasswordForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Failed to send reset link')
        return
      }
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div>
        <h2 className="auth__title">Check Your Email</h2>
        <p className="auth__subtitle">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        <div className="auth__footer">
          <span className="auth__link" onClick={onSwitchToLogin}>
            ← Back to Login
          </span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="auth__title">Forgot Password</h2>
      <p className="auth__subtitle">Enter your email to receive a reset link</p>

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__field">
          <label className="auth__label">Email</label>
          <input
            className="auth__input"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder="Enter your email"
            required
          />
        </div>

        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="auth__footer">
        <span className="auth__link" onClick={onSwitchToLogin}>
          ← Back to Login
        </span>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
