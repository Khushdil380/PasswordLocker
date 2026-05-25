import PasswordItem from './PasswordItem'
import './PasswordList.css'

function PasswordList({ passwords, onView, onEdit }) {
  if (passwords.length === 0) {
    return (
      <div className="pwd-list__empty">
        <p>No passwords saved yet.</p>
        <p>Click "+ Add Password" to get started.</p>
      </div>
    )
  }

  return (
    <div className="pwd-list">
      <div className="pwd-list__header">
        <span className="pwd-list__col pwd-list__col--title">Title</span>
        <span className="pwd-list__col pwd-list__col--desc">Description</span>
        <span className="pwd-list__col pwd-list__col--tag">Tag</span>
        <span className="pwd-list__col pwd-list__col--date">Last Updated</span>
        <span className="pwd-list__col pwd-list__col--actions">Actions</span>
      </div>
      {passwords.map((pwd) => (
        <PasswordItem key={pwd._id} entry={pwd} onView={onView} onEdit={onEdit} />
      ))}
    </div>
  )
}

export default PasswordList
