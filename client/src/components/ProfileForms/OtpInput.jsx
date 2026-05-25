import { useState, useEffect } from 'react'
import '../Auth/Auth.css'
import './ProfileForms.css'

function OtpInput({ title, subtitle, otp, setOtp, error, loading, onSubmit, onResend }) {
  const [cooldown, setCooldown] = useState(120)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleResend = (e) => {
    e.preventDefault()
    setCooldown(120)
    onResend(e)
  }

  return (
    <div>
      <h2 className="auth__title">{title}</h2>
      {subtitle && <p className="auth__subtitle">{subtitle}</p>}

      {error && <p className="auth__message auth__message--error">{error}</p>}

      <form className="auth__form" onSubmit={onSubmit}>
        <div className="auth__field">
          <label className="auth__label">Enter 6-digit OTP</label>
          <input
            className={`auth__input ${error ? 'auth__input--error' : ''}`}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            autoFocus
          />
        </div>
        <button className="auth__btn" type="submit" disabled={loading || otp.length !== 6}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>

      <div className="auth__footer">
        <button
          className="auth__link"
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0}
          style={{ border: 'none', background: 'none', cursor: cooldown > 0 ? 'not-allowed' : 'pointer' }}
        >
          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
        </button>
      </div>
    </div>
  )
}

export default OtpInput
