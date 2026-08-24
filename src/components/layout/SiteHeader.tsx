export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="shell site-header__inner">
        <a className="identity-mark" href="#thesis" aria-label="Back to introduction">
          AK
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#map">Map</a>
          <a href="#evidence">Evidence</a>
          <a href="#journey">Journey</a>
          <a href="/resume/">Résumé</a>
        </nav>
      </div>
    </header>
  );
}
