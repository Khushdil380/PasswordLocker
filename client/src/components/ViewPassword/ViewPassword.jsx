import { useState } from 'react'
import { API_BASE_URL } from '../../constants'
import Modal from '../Modal/Modal'
import MasterPasswordGate from './MasterPasswordGate'
import PasswordDetails from './PasswordDetails'

function ViewPassword({ isOpen, onClose, entryId }) {
  const [data, setData] = useState(null)
  const [verified, setVerified] = useState(false)

  const handleVerified = (entryData) => {
    setData(entryData)
    setVerified(true)
  }

  const handleClose = () => {
    setData(null)
    setVerified(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {!verified ? (
        <MasterPasswordGate entryId={entryId} onVerified={handleVerified} />
      ) : (
        <PasswordDetails data={data} />
      )}
    </Modal>
  )
}

export default ViewPassword
