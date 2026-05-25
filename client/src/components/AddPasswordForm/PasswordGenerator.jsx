import '../Auth/Auth.css'
import './AddPasswordForm.css'

function PasswordGenerator({ value, onChange }) {
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let result = ''
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    onChange(result)
  }

  return (
    <div className="auth__field">
      <label className="auth__label">Password *</label>
      <div className="add-pwd__password-row">
        <input
          className="auth__input add-pwd__password-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter or generate password"
          required
        />
        <button
          type="button"
          className="add-pwd__generate-btn"
          onClick={generatePassword}
        >
          Generate
        </button>
      </div>
    </div>
  )
}

export default PasswordGenerator
