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
          Sab passwords ek jagah,{' '}
          <span className="hero__heading-highlight">safe aur secure</span>
        </h1>

        <p className="hero__subheading">
          Ab aapko har ek password yaad rakhne ki zaroorat nahi.
          Bas ek Master Password se apne saare passwords access karo —
          securely encrypted, sirf aapke liye.
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
