import './Privacy.css'

const promises = [
  {
    icon: '🔏',
    title: 'End-to-End Encryption',
    desc: 'Your passwords are encrypted before they leave your device. Even we cannot read them.',
  },
  {
    icon: '🧠',
    title: 'Zero Knowledge Architecture',
    desc: 'We never store your Master Password. Only you can unlock your vault.',
  },
  {
    icon: '🚫',
    title: 'No Third-Party Sharing',
    desc: 'Your data is yours alone. We will never sell, share, or monetize your information.',
  },
  {
    icon: '⏱️',
    title: 'Auto Logout Protection',
    desc: 'Sessions expire after 1 hour of inactivity to prevent unauthorized access.',
  },
]

function Privacy() {
  return (
    <section className="privacy" id="privacy">
      <div className="privacy__inner">
        <span className="privacy__label">Privacy & Promises</span>
        <h2 className="privacy__heading">Your trust is our foundation</h2>
        <p className="privacy__subtitle">
          Here is what we guarantee to every user.
        </p>
        <div className="privacy__grid">
          {promises.map((item, i) => (
            <div key={i} className="privacy__card">
              <span className="privacy__card-icon">{item.icon}</span>
              <h3 className="privacy__card-title">{item.title}</h3>
              <p className="privacy__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Privacy
