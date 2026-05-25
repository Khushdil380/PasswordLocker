import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../constants'
import EditCategoryItem from './EditCategoryItem'
import '../Auth/Auth.css'
import './EditCategories.css'

function EditCategoriesForm({ onSuccess }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, { credentials: 'include' })
      const data = await res.json()
      if (res.ok) setCategories(data.categories)
    } catch { /* silent */ }
    finally { setLoading(false) }
  }

  const handleRename = async (id, newName) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name: newName }),
    })
    const data = await res.json()
    if (!res.ok) return data.message
    setCategories((prev) => prev.map((c) => c._id === id ? data.category : c))
    if (onSuccess) onSuccess()
    return null
  }

  const handleDelete = async (id) => {
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c._id !== id))
      if (onSuccess) onSuccess()
    }
  }

  const handleMoveUp = (index) => {
    if (index <= 0) return
    const updated = [...categories]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    setCategories(updated)
    saveOrder(updated)
  }

  const handleMoveDown = (index) => {
    if (index >= categories.length - 1) return
    const updated = [...categories]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    setCategories(updated)
    saveOrder(updated)
  }

  const saveOrder = async (list) => {
    const order = list.map((cat, i) => ({ id: cat._id, order: i + 1 }))
    await fetch(`${API_BASE_URL}/categories/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ order }),
    })
    if (onSuccess) onSuccess()
  }

  if (loading) {
    return (
      <div>
        <h2 className="auth__title">Edit Categories</h2>
        <p className="auth__subtitle">Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="auth__title">Edit Categories</h2>
      <p className="auth__subtitle">Rename, reorder, or delete categories</p>

      {categories.length === 0 ? (
        <p className="auth__subtitle">No categories created yet.</p>
      ) : (
        <div className="edit-cat__list">
          {categories.map((cat, index) => (
            <EditCategoryItem
              key={cat._id}
              category={cat}
              index={index}
              total={categories.length}
              onRename={handleRename}
              onDelete={handleDelete}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EditCategoriesForm
