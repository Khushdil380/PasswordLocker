import { useState } from 'react'
import { API_BASE_URL } from '../../constants'
import './Auth.css'

function LoginForm({ onSwitchToSignup, onSwitchToForgot, onSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed')
        return
      }
      onSuccess(data)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="auth__title">Welcome Back</h2>
      <p className="auth__subtitle">Login to access your passwords</p>

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
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

        <div className="auth__field">
          <label className="auth__label">Password</label>
          <input
            className="auth__input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="auth__footer">
        <p>
          <span className="auth__link" onClick={onSwitchToForgot}>
            Forgot Password?
          </span>
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          Don't have an account?{' '}
          <span className="auth__link" onClick={onSwitchToSignup}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
