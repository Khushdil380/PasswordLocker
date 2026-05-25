import { useState } from 'react'
import { API_BASE_URL } from '../../constants'
import './Auth.css'

function SignupForm({ onSwitchToLogin, onOtpSent }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Signup failed')
        return
      }
      onOtpSent(formData.email)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="auth__title">Create Account</h2>
      <p className="auth__subtitle">Sign up to get started</p>

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__field">
          <label className="auth__label">Full Name</label>
          <input
            className="auth__input"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="auth__field">
          <label className="auth__label">Email</label>
          <input
            className="auth__input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="auth__row">
          <div className="auth__field">
            <label className="auth__label">Password</label>
            <input
              className="auth__input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 chars"
              required
            />
          </div>
          <div className="auth__field">
            <label className="auth__label">Confirm Password</label>
            <input
              className="auth__input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter"
              required
            />
          </div>
        </div>

        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Create Account'}
        </button>
      </form>

      <div className="auth__footer">
        <p>
          Already have an account?{' '}
          <span className="auth__link" onClick={onSwitchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignupForm
