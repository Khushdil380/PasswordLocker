import './Solution.css'

const solutions = [
  {
    icon: '🔐',
    title: 'One Master Password',
    desc: 'Ek password se apne saare credentials access karo — koi confusion nahi.',
  },
  {
    icon: '🛡️',
    title: 'Encrypted Storage',
    desc: 'Passwords encrypted format mein store hote hain — koi bhi read nahi kar sakta.',
  },
  {
    icon: '⚡',
    title: 'One-Click Access',
    desc: 'Copy password ya direct website pe jao — fast aur seamless experience.',
  },
  {
    icon: '📂',
    title: 'Smart Categories',
    desc: 'Banking, social, work — sab organized. Jab chahein, jahan chahein access karo.',
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
