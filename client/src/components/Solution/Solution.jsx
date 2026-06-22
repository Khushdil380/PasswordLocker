import './Solution.css'

const solutions = [
  {
    icon: '🔐',
    title: 'One Master Password',
    desc: 'Access all your credentials with a single password — no confusion, no clutter.',
  },
  {
    icon: '🛡️',
    title: 'Encrypted Storage',
    desc: 'Passwords are stored in AES-256 encrypted format — no one can read them, not even us.',
  },
  {
    icon: '⚡',
    title: 'One-Click Access',
    desc: 'Copy passwords or navigate directly to websites — fast and seamless.',
  },
  {
    icon: '📂',
    title: 'Smart Categories',
    desc: 'Organize by Banking, Social, Work — access what you need, when you need it.',
  },
]

function Solution() {
  return (
    <section className="solution" id="solution">
      <div className="solution__inner">
        <span className="solution__label">Our Solution</span>
        <h2 className="solution__heading">
          Password Locker makes it simple
        </h2>
        <div className="solution__grid">
          {solutions.map((item, i) => (
            <div key={i} className="solution__card">
              <span className="solution__icon">{item.icon}</span>
              <h3 className="solution__title">{item.title}</h3>
              <p className="solution__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solution
