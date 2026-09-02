import { profile } from "@/features/profile/content";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="shell site-footer__inner">
        <div>
          <p className="section-label">Contact</p>
          <p className="site-footer__prompt">Have a difficult AI system to make dependable?</p>
        </div>
        <a className="text-link text-link--large" href={profile.booking.href}>
          {profile.booking.label}
          <span aria-hidden="true">↗</span>
        </a>
        <nav className="site-footer__links" aria-label="Elsewhere">
          {profile.links
            .filter((link) => link.label !== "Email")
            .map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          <a href="/Akash_Kokare_AI_Engineer.pdf">PDF résumé</a>
        </nav>
      </div>
    </footer>
  );
}
