import { useState } from 'react'
import './EditCategories.css'

function EditCategoryItem({ category, index, total, onRename, onDelete, onMoveUp, onMoveDown }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(category.name)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!name.trim()) { setError('Name required'); return }
    const err = await onRename(category._id, name.trim())
    if (err) { setError(err); return }
    setEditing(false)
    setError('')
  }

  const handleCancel = () => {
    setName(category.name)
    setEditing(false)
    setError('')
  }

  return (
    <div className="edit-cat__item">
      <span className="edit-cat__order">{index + 1}</span>

      {editing ? (
        <div className="edit-cat__edit-row">
          <input
            className="edit-cat__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button className="edit-cat__btn edit-cat__btn--save" onClick={handleSave}>✓</button>
          <button className="edit-cat__btn edit-cat__btn--cancel" onClick={handleCancel}>✕</button>
          {error && <span className="edit-cat__error">{error}</span>}
        </div>
      ) : (
        <span className="edit-cat__name">{category.name}</span>
      )}

      <div className="edit-cat__actions">
        <button className="edit-cat__btn" onClick={onMoveUp} disabled={index === 0} title="Move up">
          ▲
        </button>
        <button className="edit-cat__btn" onClick={onMoveDown} disabled={index === total - 1} title="Move down">
          ▼
        </button>
        {!editing && (
          <button className="edit-cat__btn edit-cat__btn--edit" onClick={() => setEditing(true)} title="Rename">
            ✎
          </button>
        )}
        <button className="edit-cat__btn edit-cat__btn--delete" onClick={() => onDelete(category._id)} title="Delete">
          🗑
        </button>
      </div>
    </div>
  )
}

export default EditCategoryItem
