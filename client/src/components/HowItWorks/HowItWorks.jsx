import './HowItWorks.css'

const steps = [
  {
    number: '01',
    title: 'Create Account',
    desc: 'Sign up with your email and set a strong Master Password.',
  },
  {
    number: '02',
    title: 'Add Passwords',
    desc: 'Save your passwords with title, description, and website link.',
  },
  {
    number: '03',
    title: 'Access Anytime',
    desc: 'Login with your Master Password and access all credentials securely.',
  },
  {
    number: '04',
    title: 'Copy & Go',
    desc: 'One-click copy password or navigate directly to the website.',
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
