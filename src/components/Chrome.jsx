/**
 * Site chrome — sticky header, gradient hero and stats bar. Deliberately a
 * near-copy of the Global Employment Guides site so the two read as one
 * product; see the token block at the top of styles.css.
 */

export function Header() {
  return (
    <header>
      <a className="logo" href="https://heroforce.github.io/heroforce-country-guide/">
        <div className="logo-icon" aria-hidden="true">
          ⚡
        </div>
        <div className="logo-text">
          HeroForce <span>by Employment Hero</span>
        </div>
      </a>
      <span className="header-tag">EOR Cost Calculator</span>
    </header>
  );
}

export function Hero() {
  return (
    <div className="hero">
      <h1>Global Employment Cost Calculator</h1>
      <p>
        Employer statutory costs for hiring in any covered country — line by line, in local
        currency, with the source behind every rate.
      </p>
    </div>
  );
}

export function StatsBar({ countryCount, verifiedCount, updated }) {
  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-dot" />
        <strong>{countryCount}</strong> countries covered
      </div>
      <div className="stat">
        <span className="stat-dot" />
        <strong>{verifiedCount}</strong> verified against primary sources
      </div>
      <div className="stat">Updated {updated}</div>
    </div>
  );
}
