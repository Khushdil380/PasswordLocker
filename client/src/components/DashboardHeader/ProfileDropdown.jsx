import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Modal from '../Modal/Modal'
import UpdateNameForm from '../ProfileForms/UpdateNameForm'
import UpdateEmailForm from '../ProfileForms/UpdateEmailForm'
import ChangePasswordForm from '../ProfileForms/ChangePasswordForm'
import ChangeMasterPasswordForm from '../ProfileForms/ChangeMasterPasswordForm'
import CreateCategoryForm from '../ProfileForms/CreateCategoryForm'
import EditCategoriesForm from '../ProfileForms/EditCategoriesForm'
import './ProfileDropdown.css'

const MENU_ITEMS = [
  { key: 'email', label: 'Update Email' },
  { key: 'name', label: 'Update Name' },
  { key: 'password', label: 'Change Password' },
  { key: 'masterPassword', label: 'Change Master Password' },
  { key: 'categories', label: 'Create Categories' },
  { key: 'editCategories', label: 'Edit Categories' },
]

function ProfileDropdown({ isOpen, onClose, onCategoryCreated }) {
  const { logout } = useAuth()
  const [activeModal, setActiveModal] = useState(null)

  const handleItemClick = (key) => {
    onClose()
    setActiveModal(key)
  }

  const handleLogout = () => {
    onClose()
    logout()
  }

  const closeModal = () => setActiveModal(null)

  const handleCategorySuccess = () => {
    if (onCategoryCreated) onCategoryCreated()
  }

  return (
    <>
      <div className={`profile-dropdown ${isOpen ? 'profile-dropdown--open' : ''}`}>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.key}
            className="profile-dropdown__item"
            onClick={() => handleItemClick(item.key)}
          >
            {item.label}
          </button>
        ))}
        <div className="profile-dropdown__divider" />
        <button className="profile-dropdown__item profile-dropdown__item--logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <Modal isOpen={activeModal === 'name'} onClose={closeModal}>
        <UpdateNameForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={activeModal === 'email'} onClose={closeModal}>
        <UpdateEmailForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={activeModal === 'password'} onClose={closeModal}>
        <ChangePasswordForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={activeModal === 'masterPassword'} onClose={closeModal}>
        <ChangeMasterPasswordForm onSuccess={closeModal} />
      </Modal>
      <Modal isOpen={activeModal === 'categories'} onClose={closeModal}>
        <CreateCategoryForm onSuccess={handleCategorySuccess} />
      </Modal>
      <Modal isOpen={activeModal === 'editCategories'} onClose={closeModal}>
        <EditCategoriesForm onSuccess={handleCategorySuccess} />
      </Modal>
    </>
  )
}

export default ProfileDropdown
