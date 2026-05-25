import { useState, useEffect } from 'react'
import { APP_NAME, SUPPORT_EMAIL } from '../../constants'
import './Header.css'

function Header() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <div className="header__brand">
          <img
            src="/favicon.svg"
            alt={`${APP_NAME} logo`}
            className="header__logo"
          />
          <span className="header__name">{APP_NAME}</span>
        </div>

        <div
          className="header__help"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <HelpIcon />
          <span className="header__help-text">Help</span>
          {showTooltip && (
            <div className="header__tooltip">
              Need help? Contact us at {SUPPORT_EMAIL}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function HelpIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export default Header
