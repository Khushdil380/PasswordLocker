import { useState, useEffect } from 'react'
import { APP_NAME } from '../../constants'
import SearchBox from './SearchBox'
import AddPasswordButton from './AddPasswordButton'
import ProfileSection from './ProfileSection'
import Modal from '../Modal/Modal'
import AddPasswordForm from '../AddPasswordForm/AddPasswordForm'
import './DashboardHeader.css'

function DashboardHeader({ onPasswordAdded, onCategoryCreated, searchQuery, onSearchChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePasswordSuccess = (entry) => {
    setShowAddModal(false)
    if (onPasswordAdded) onPasswordAdded(entry)
  }

  return (
    <>
      <header className={`dash-header ${scrolled ? 'dash-header--scrolled' : ''}`}>
        <div className="dash-header__inner">
          <div className="dash-header__brand">
            <img
              src="/favicon.svg"
              alt={`${APP_NAME} logo`}
              className="dash-header__logo"
            />
            <span className="dash-header__name">{APP_NAME}</span>
          </div>

          <SearchBox value={searchQuery} onChange={onSearchChange} />
          <div className="dash-header__actions">
            <AddPasswordButton onClick={() => setShowAddModal(true)} />
            <ProfileSection onCategoryCreated={onCategoryCreated} />
          </div>
        </div>
      </header>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)}>
        <AddPasswordForm onSuccess={handlePasswordSuccess} />
      </Modal>
    </>
  )
}

export default DashboardHeader
