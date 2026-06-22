import './HowItWorks.css'

const steps = [
  {
    number: '01',
    title: 'Create Account',
    desc: 'Sign up with your email and get started with a default Master Password.',
  },
  {
    number: '02',
    title: 'Add Passwords',
    desc: 'Save credentials with title, description, user ID, and destination link.',
  },
  {
    number: '03',
    title: 'Access Securely',
    desc: 'Enter your Master Password to view any stored credential — fully decrypted.',
  },
  {
    number: '04',
    title: 'Track Changes',
    desc: 'Every update is versioned. Browse history and see exactly what changed.',
  },
]

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-it-works__inner">
        <span className="how-it-works__label">How It Works</span>
        <h2 className="how-it-works__heading">
          Simple steps to secure your passwords
        </h2>
        <div className="how-it-works__steps">
          {steps.map((step, i) => (
            <div key={i} className="how-it-works__card">
              <span className="how-it-works__number">{step.number}</span>
              <h3 className="how-it-works__title">{step.title}</h3>
              <p className="how-it-works__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
