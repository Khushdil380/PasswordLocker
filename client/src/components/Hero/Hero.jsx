import HeroBackground from './HeroBackground'
import './Hero.css'

function Hero({ onGetStarted }) {
  return (
    <section className="hero" id="hero">
      <HeroBackground />

      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Secure · Encrypted · Always Accessible
        </div>

        <h1 className="hero__heading">
          All your passwords in one place,{' '}
          <span className="hero__heading-highlight">safe and secure</span>
        </h1>

        <p className="hero__subheading">
          No more remembering dozens of passwords.
          Access all your credentials with a single Master Password —
          securely encrypted, accessible only by you.
        </p>

        <button className="hero__btn" onClick={onGetStarted}>
          Get Started
          <span className="hero__btn-arrow">→</span>
        </button>
      </div>
    </section>
  )
}

export default Hero
