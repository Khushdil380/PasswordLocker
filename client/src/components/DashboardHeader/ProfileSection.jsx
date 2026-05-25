import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import ProfileDropdown from './ProfileDropdown'
import './ProfileSection.css'

function ProfileSection({ onCategoryCreated }) {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const initials = user?.fullName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div className="profile-section" ref={containerRef}>
      <button
        className="profile-section__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Profile menu"
        aria-expanded={isOpen}
      >
        <span className="profile-section__avatar">{initials}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <ProfileDropdown isOpen={isOpen} onClose={() => setIsOpen(false)} onCategoryCreated={onCategoryCreated} />
    </div>
  )
}

function ChevronIcon({ isOpen }) {
  return (
    <svg
      className={`profile-section__chevron ${isOpen ? 'profile-section__chevron--open' : ''}`}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default ProfileSection
