import { useState, useEffect } from 'react'
import { APP_NAME } from '../../constants'
import './Preloader.css'

function Preloader({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 600)
    }, 2400)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className={`preloader ${fadeOut ? 'preloader--fade' : ''}`}>
      <div className="preloader__glossy" />
      <div className="preloader__content">
        <div className="preloader__shield">
          <svg viewBox="0 0 96 96" className="preloader__icon">
            <path
              className="preloader__shield-path"
              d="M79.27 1.33H16.89c0 4.52-3.65 8.18-8.17 8.18v36.67c0 22.42 15.05 42.04 36.69 47.87l2.67.72 2.67-.72c21.65-5.83 36.69-25.45 36.69-47.87V9.51c-4.52 0-8.17-3.66-8.17-8.18z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="preloader__lock-path"
              d="M39.85 36.97h-4.16v-7c0-6.83 5.56-12.39 12.39-12.39s12.39 5.56 12.39 12.39v7h-4.16v-7c0-4.54-3.69-8.23-8.23-8.23s-8.23 3.69-8.23 8.23zm23.58 2.5H32.72a.41.41 0 00-.41.41v24.46c0 .23.18.41.41.41h30.71a.41.41 0 00.41-.41V39.88a.41.41 0 00-.41-.41zM50.83 52.58v3.06a2.91 2.91 0 01-5.81 0v-3.38a3.99 3.99 0 01-1-2.58 4.01 4.01 0 018.01 0c0 1.14-.48 2.17-1.25 2.9z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <p className="preloader__text">{APP_NAME}</p>
        <div className="preloader__bar">
          <div className="preloader__bar-fill" />
        </div>
      </div>
    </div>
  )
}

export default Preloader
