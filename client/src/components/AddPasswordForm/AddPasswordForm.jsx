import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../constants'
import PasswordGenerator from './PasswordGenerator'
import '../Auth/Auth.css'
import './AddPasswordForm.css'

function AddPasswordForm({ onSuccess, editData }) {
  const isEdit = !!editData
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    title: editData?.title || '',
    description: editData?.description || '',
    destinationLink: editData?.destinationLink || '',
    userId: editData?.userId || '',
    password: '',
    category: editData?.category?._id || editData?.category || '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, { credentials: 'include' })
      const data = await res.json()
      if (res.ok) setCategories(data.categories)
    } catch { /* silent */ }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }
    if (!formData.password) {
      setError('Password is required')
      return
    }

    setLoading(true)
    try {
      const url = isEdit
        ? `${API_BASE_URL}/passwords/${editData._id}`
        : `${API_BASE_URL}/passwords`
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message); return }
      onSuccess(data.password)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="auth__title">{isEdit ? 'Update Password' : 'Add New Password'}</h2>

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="add-pwd__row">
          <div className="auth__field">
            <label className="auth__label">Title *</label>
            <input
              className="auth__input"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. SBI Profile Password"
              required
            />
          </div>
          <div className="auth__field">
            <label className="auth__label">User ID</label>
            <input
              className="auth__input"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Username or email"
            />
          </div>
        </div>

        <div className="add-pwd__row">
          <div className="auth__field">
            <label className="auth__label">Description</label>
            <input
              className="auth__input"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description"
            />
          </div>
          <div className="auth__field">
            <label className="auth__label">Destination Link</label>
            <input
              className="auth__input"
              name="destinationLink"
              value={formData.destinationLink}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <PasswordGenerator
          value={formData.password}
          onChange={(val) => setFormData({ ...formData, password: val })}
        />

        <div className="add-pwd__footer">
          <div className="auth__field add-pwd__category-field">
            <label className="auth__label">Tag (Category)</label>
            <select
              className="auth__select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <button className="auth__btn add-pwd__save-btn" type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Save Password'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPasswordForm
