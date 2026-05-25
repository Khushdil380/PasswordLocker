import './HeroBackground.css'

function HeroBackground() {
  return (
    <div className="hero-bg">
      <div className="hero-bg__gradient" />
      <div className="hero-bg__orb hero-bg__orb--1" />
      <div className="hero-bg__orb hero-bg__orb--2" />
      <div className="hero-bg__orb hero-bg__orb--3" />
      <div className="hero-bg__grid" />

      <svg className="hero-bg__icons" aria-hidden="true">
        <FloatEmoji x="8%" y="20%" delay="0s" emoji="🔒" />
        <FloatEmoji x="85%" y="15%" delay="1.5s" emoji="🛡️" />
        <FloatEmoji x="12%" y="70%" delay="3s" emoji="🔑" />
        <FloatEmoji x="78%" y="65%" delay="2s" emoji="🔐" />
        <FloatEmoji x="50%" y="85%" delay="4s" emoji="🛡️" />
        <FloatEmoji x="90%" y="45%" delay="1s" emoji="🔑" />
      </svg>
    </div>
  )
}

function FloatEmoji({ x, y, delay, emoji }) {
  return (
    <g style={{ '--float-delay': delay }} className="hero-bg__float-icon">
      <text x={x} y={y} fontSize="22" fill="rgba(159,58,170,0.08)">{emoji}</text>
    </g>
  )
}

export default HeroBackground
