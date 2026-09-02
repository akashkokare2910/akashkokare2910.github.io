import Image from "next/image";

import { profile } from "../content";

export function Hero() {
  return (
    <section className="hero shell" id="thesis" aria-labelledby="hero-title">
      <div className="hero__identity">
        <div className="hero__portrait-wrap" aria-hidden="true">
          <Image
            className="hero__portrait"
            src="/akash-kokare.jpg"
            alt=""
            width={300}
            height={375}
            priority
          />
        </div>
        <p className="hero__eyebrow">
          <span>{profile.identity.name}</span>
          <span aria-hidden="true">/</span>
          <span>{profile.identity.role}</span>
          <span aria-hidden="true">/</span>
          <span>{profile.identity.organization}</span>
        </p>
        <p className="hero__native" lang="mr">
          {profile.identity.nativeName}
        </p>
      </div>

      <div className="hero__statement">
        <h1 id="hero-title">{profile.thesis.heading}</h1>
        <p>{profile.thesis.body}</p>
        <div className="hero__actions">
          <a className="text-link" href="#map">
            Explore the operating map
            <span aria-hidden="true">↓</span>
          </a>
          <a className="text-link text-link--muted" href="/resume/">
            Read résumé
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
