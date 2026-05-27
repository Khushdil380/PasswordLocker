import { useState } from 'react'
import './ViewPassword.css'

function PasswordDetails({ data }) {
  const [versionIndex, setVersionIndex] = useState(0)
  const [copied, setCopied] = useState('')

  const versions = data.versions || []
  const current = versions[versionIndex]

  // Support both old format (fields at top level) and new format (fields per version)
  const getField = (field) => {
    if (current && current[field]) return current[field]
    if (data[field]) return data[field]
    return ''
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    })
  }

  const copyToClipboard = async (text, field) => {
    await navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 1500)
  }

  const handleGoTo = () => {
    let url = getField('destinationLink')
    if (url && !url.startsWith('http')) url = 'https://' + url
    if (url) window.open(url, '_blank')
  }

  const title = getField('title')
  const description = getField('description')
  const destinationLink = getField('destinationLink')
  const userId = getField('userId')

  return (
    <div className="pwd-details">
      <h2 className="pwd-details__title">{title || '—'}</h2>

      <div className="pwd-details__row">
        <span className="pwd-details__label">Description</span>
        <span className="pwd-details__value">{description || '—'}</span>
      </div>

      <div className="pwd-details__row">
        <span className="pwd-details__label">Destination</span>
        <span className="pwd-details__value pwd-details__value--link">
          {destinationLink || '—'}
          {destinationLink && (
            <button className="pwd-details__goto" onClick={handleGoTo}>
              Go To
            </button>
          )}
        </span>
      </div>

      <div className="pwd-details__row">
        <span className="pwd-details__label">User ID</span>
        <span className="pwd-details__value">
          {userId || '—'}
          {userId && (
            <button
              className={`pwd-details__copy ${copied === 'userId' ? 'pwd-details__copy--done' : ''}`}
              onClick={() => copyToClipboard(userId, 'userId')}
            >
              {copied === 'userId' ? '✓' : <CopyIcon />}
            </button>
          )}
        </span>
      </div>

      <div className="pwd-details__row">
        <span className="pwd-details__label">Password</span>
        <span className="pwd-details__value">
          {current?.password || '—'}
          {current?.password && (
            <button
              className={`pwd-details__copy ${copied === 'password' ? 'pwd-details__copy--done' : ''}`}
              onClick={() => copyToClipboard(current.password, 'password')}
            >
              {copied === 'password' ? '✓' : <CopyIcon />}
            </button>
          )}
        </span>
      </div>

      {versions.length > 1 && (
        <div className="pwd-details__nav">
          <button
            className="pwd-details__arrow"
            disabled={versionIndex >= versions.length - 1}
            onClick={() => setVersionIndex((i) => i + 1)}
            aria-label="Older version"
          >
            ◀
          </button>
          <span className="pwd-details__date">
            {current ? formatDate(current.changedAt) : ''}
          </span>
          <button
            className="pwd-details__arrow"
            disabled={versionIndex <= 0}
            onClick={() => setVersionIndex((i) => i - 1)}
            aria-label="Newer version"
          >
            ▶
          </button>
        </div>
      )}

      {versions.length <= 1 && current && (
        <div className="pwd-details__nav">
          <span className="pwd-details__date">
            Updated: {formatDate(current.changedAt)}
          </span>
        </div>
      )}
    </div>
  )
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}

export default PasswordDetails
