import { useState } from 'react'
import { API_BASE_URL } from '../../constants'
import '../Auth/Auth.css'

function CreateCategoryForm({ onSuccess }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError('Category name is required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: name.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      setSuccess(`"${data.category.name}" created!`)
      setName('')
      if (onSuccess) onSuccess(data.category)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="auth__title">Create Category</h2>
      <p className="auth__subtitle">Organize your passwords into groups</p>

      {error && <p className="auth__message auth__message--error">{error}</p>}
      {success && <p className="auth__message auth__message--success">{success}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__field">
          <label className="auth__label">Category Name</label>
          <input
            className={`auth__input ${error ? 'auth__input--error' : ''}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Personal, Office, Banking"
            autoFocus
          />
        </div>
        <button className="auth__btn" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  )
}

export default CreateCategoryForm
