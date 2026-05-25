import './CTA.css'

function CTA({ onGetStarted }) {
  return (
    <section className="cta" id="cta">
      <div className="cta__inner">
        <div className="cta__glow" />
        <h2 className="cta__heading">
          Ready to secure your digital life?
        </h2>
        <p className="cta__desc">
          Stop worrying about forgotten passwords. Start managing them
          the smart way — encrypted, organized, and always accessible.
        </p>
        <button className="cta__btn" onClick={onGetStarted}>
          Get Started — It's Free
        </button>
      </div>
    </section>
  )
}

export default CTA
