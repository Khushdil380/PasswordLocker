import { useState } from 'react'
import { API_BASE_URL } from '../../constants'
import '../Auth/Auth.css'

function MasterPasswordGate({ entryId, onVerified }) {
  const [masterPassword, setMasterPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!masterPassword) {
      setError('Master password is required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/passwords/${entryId}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ masterPassword }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      onVerified(data.entry)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="auth__title">Enter Master Password</h2>
      <p className="auth__subtitle">Required to view stored credentials</p>

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__field">
          <label className="auth__label">Master Password</label>
          <input
            className={`auth__input ${error ? 'auth__input--error' : ''}`}
            type="password"
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            placeholder="Enter your master password"
            autoFocus
          />
        </div>
        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Unlock'}
        </button>
      </form>
    </div>
  )
}

export default MasterPasswordGate
