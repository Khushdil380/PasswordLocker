import { useRegisterSW } from 'virtual:pwa-register/react'
import './PWAPrompt.css'

function PWAPrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div className="pwa-update-prompt" role="alert">
      <p>New version available</p>
      <button
        className="pwa-update-btn"
        onClick={() => updateServiceWorker(true)}
      >
        Update
      </button>
    </div>
  )
}

export default PWAPrompt
