import './AddPasswordButton.css'

function AddPasswordButton({ onClick }) {
  return (
    <button className="add-password-btn" aria-label="Add Password" onClick={onClick}>
      <PlusIcon />
      <span className="add-password-btn__text">Add Password</span>
    </button>
  )
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export default AddPasswordButton
