import './Problem.css'

const problems = [
  {
    icon: '🤯',
    text: 'Multiple accounts, multiple passwords — yaad rakhna almost impossible hai.',
  },
  {
    icon: '⏳',
    text: '"Forgot Password" process slow hai, limited attempts hain, aur kabhi credentials hi nahi milte.',
  },
  {
    icon: '⚠️',
    text: 'Ek hi password har jagah use karna risky hai — ek breach se sab expose.',
  },
  {
    icon: '📝',
    text: 'Sticky notes ya phone mein save karna? Bilkul safe nahi hai.',
  },
]

function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="problem__inner">
        <span className="problem__label">The Problem</span>
        <h2 className="problem__heading">
          Passwords manage karna itna mushkil kyun hai?
        </h2>
        <div className="problem__grid">
          {problems.map((item, i) => (
            <div key={i} className="problem__card">
              <span className="problem__icon">{item.icon}</span>
              <p className="problem__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Problem
