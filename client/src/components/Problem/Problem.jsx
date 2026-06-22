import './Problem.css'

const problems = [
  {
    icon: '🤯',
    text: 'Multiple accounts, multiple passwords — remembering them all is nearly impossible.',
  },
  {
    icon: '⏳',
    text: '"Forgot Password" flows are slow, have limited attempts, and sometimes credentials never arrive.',
  },
  {
    icon: '⚠️',
    text: 'Reusing one password everywhere is risky — one breach exposes everything.',
  },
  {
    icon: '📝',
    text: 'Saving passwords on sticky notes or in your phone? Not safe at all.',
  },
]

function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="problem__inner">
        <span className="problem__label">The Problem</span>
        <h2 className="problem__heading">
          Why is managing passwords so difficult?
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
