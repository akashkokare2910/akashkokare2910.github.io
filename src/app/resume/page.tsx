import type { Metadata } from "next";

import { evidenceCases, journey, profile } from "@/features/profile/content";
import "./resume.css";

export const metadata: Metadata = {
  title: "Résumé | Akash Kokare",
  description: "Experience, selected AI systems, and engineering capabilities.",
};

const capabilities = [
  { label: "AI systems", value: "Agent evaluation, MCP, RAG, time-series foundation models, OpenAI, Amazon Bedrock" },
  { label: "Platforms", value: "Python, FastAPI, PostgreSQL, Supabase, Redis, async execution, multi-tenant APIs" },
  { label: "Product", value: "Next.js App Router, React, TypeScript, system visualization, developer tooling" },
  { label: "Delivery", value: "AWS, Docker, GitHub Actions, CI quality gates, PyPI Trusted Publishing" },
] as const;

export default function ResumePage() {
  return (
    <main className="resume-page">
      <header className="resume-header">
        <a className="resume-back" href="/"><span aria-hidden="true">←</span> Portfolio</a>
        <div className="resume-header__actions">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href="/Akash_Kokare_AI_Engineer.pdf">Download PDF</a>
        </div>
      </header>

      <article className="resume-sheet">
        <header className="resume-identity">
          <p>{profile.identity.role} · {profile.identity.organization}</p>
          <h1>{profile.identity.name}</h1>
          <p className="resume-identity__summary">
            Applied AI engineer building forecasting platforms, agent reliability tooling, MCP interfaces, and the production systems around them.
          </p>
          <ul className="resume-contact" aria-label="Contact and profile links">
            <li>{profile.identity.location}</li>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            {profile.links.filter((link) => link.label !== "Email").map((link) => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </header>

        <section className="resume-section" aria-labelledby="resume-experience">
          <h2 id="resume-experience">Experience</h2>
          <ol className="resume-experience">
            {journey.map((item) => (
              <li key={`${item.period}-${item.organization}`}>
                <time>{item.period}</time>
                <div>
                  <h3>{item.role}</h3>
                  <p className="resume-muted">{item.organization}</p>
                  <p>{item.summary}</p>
                  {item.proof ? <p className="resume-proof">{item.proof}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="resume-section" aria-labelledby="resume-systems">
          <h2 id="resume-systems">Selected systems</h2>
          <div className="resume-systems">
            {evidenceCases.map((item) => (
              <article key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.thesis}</p>
                <ul>
                  {item.facts.slice(0, 3).map((fact) => (
                    <li key={fact.label}><strong>{fact.label}:</strong> {fact.value}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section" aria-labelledby="resume-capabilities">
          <h2 id="resume-capabilities">Capabilities</h2>
          <dl className="resume-capabilities">
            {capabilities.map((item) => (
              <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
            ))}
          </dl>
        </section>

        <section className="resume-section resume-education" aria-labelledby="resume-education">
          <h2 id="resume-education">Education</h2>
          <div>
            <h3>Atharva College of Engineering, Mumbai</h3>
            <p>Bachelor of Engineering · Information Technology · 2018 to 2022</p>
          </div>
        </section>
      </article>
    </main>
  );
}
