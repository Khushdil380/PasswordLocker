import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../constants'
import '../../components/Auth/Auth.css'
import './ResetPassword.css'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: formData.newPassword }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      setSuccess(true)
      setTimeout(() => navigate('/', { replace: true }), 3000)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="reset-page">
        <div className="reset-page__card">
          <div className="reset-page__icon">✓</div>
          <h2 className="auth__title">Password Reset Successful</h2>
          <p className="auth__subtitle">
            Your password has been changed. Redirecting to login...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="reset-page">
      <div className="reset-page__card">
        <div className="reset-page__logo">
          <img src="/favicon.svg" alt="Password Locker" width="48" height="48" />
        </div>
        <h2 className="auth__title">Reset Your Password</h2>
        <p className="auth__subtitle">Enter a new password for your account</p>

        {error && <p className="auth__message auth__message--error">{error}</p>}

        <form className="auth__form" onSubmit={handleSubmit}>
          <div className="auth__field">
            <label className="auth__label">New Password</label>
            <input
              className={`auth__input ${error ? 'auth__input--error' : ''}`}
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Min 6 characters"
              autoFocus
              required
            />
          </div>

          <div className="auth__field">
            <label className="auth__label">Confirm Password</label>
            <input
              className={`auth__input ${error ? 'auth__input--error' : ''}`}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button className="auth__btn" type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="auth__footer">
          <span className="auth__link" onClick={() => navigate('/')}>
            ← Back to Home
          </span>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
