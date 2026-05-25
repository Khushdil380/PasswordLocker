import './PasswordList.css'

function PasswordItem({ entry, onView, onEdit }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const truncate = (text, max) => {
    if (!text) return '—'
    return text.length > max ? text.slice(0, max) + '...' : text
  }

  return (
    <div className="pwd-item">
      <div className="pwd-item__row pwd-item__row--top">
        <span className="pwd-item__title">{truncate(entry.title, 10)}</span>
        <span className="pwd-item__desc">{truncate(entry.description, 12)}</span>
        <span className="pwd-item__tag">{entry.category?.name || '—'}</span>
        <span className="pwd-item__date">{formatDate(entry.updatedAt)}</span>
        <span className="pwd-item__actions">
          <button className="pwd-item__action" aria-label="View password" title="View" onClick={() => onView(entry._id)}>
            <EyeIcon />
          </button>
          <button className="pwd-item__action" aria-label="Edit password" title="Update" onClick={() => onEdit(entry)}>
            <EditIcon />
          </button>
        </span>
      </div>
      <div className="pwd-item__row pwd-item__row--bottom">
        <span className="pwd-item__meta">
          {truncate(entry.description, 12)}
        </span>
        <span className="pwd-item__meta-tag">
          {entry.category?.name || '—'}
        </span>
        <span className="pwd-item__meta-date">
          {formatDate(entry.updatedAt)}
        </span>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

export default PasswordItem
