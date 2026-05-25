import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_BASE_URL } from '../../constants'
import '../Auth/Auth.css'

function UpdateNameForm({ onSuccess }) {
  const { user, login } = useAuth()
  const [name, setName] = useState(user?.fullName || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const trimmed = name.trim()
    if (!trimmed) {
      setError('Name cannot be empty')
      return
    }
    if (trimmed.length > 50) {
      setError('Name must be 50 characters or less')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/profile/name`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ fullName: trimmed }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Failed to update name')
        return
      }

      login(data.user)
      onSuccess()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="auth__title">Update Name</h2>
      <p className="auth__subtitle">Change your display name</p>

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__field">
          <label className="auth__label">Full Name</label>
          <input
            ref={inputRef}
            className={`auth__input ${error ? 'auth__input--error' : ''}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
        </div>
        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Name'}
        </button>
      </form>
    </div>
  )
}

export default UpdateNameForm
