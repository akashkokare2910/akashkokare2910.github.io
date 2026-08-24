import type { EvidenceCase as EvidenceCaseData } from "@/features/profile/types";
import { ContractExample } from "./ContractExample";
import { EvalForgeArtifact } from "./EvalForgeArtifact";
import { ForecastArtifact } from "./ForecastArtifact";

type EvidenceCaseProps = {
  item: EvidenceCaseData;
};

function Artifact({ type }: { type: EvidenceCaseData["artifact"] }) {
  if (type === "trace") return <EvalForgeArtifact />;
  if (type === "contract") return <ContractExample />;
  return <ForecastArtifact />;
}

export function EvidenceCase({ item }: EvidenceCaseProps) {
  return (
    <article className="evidence-case" id={item.id}>
      <header className="evidence-case__header">
        <p className="section-label">{item.index}</p>
        <h3>{item.title}</h3>
        <p className="evidence-case__thesis">{item.thesis}</p>
        <div className="evidence-case__links">
          {item.links.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <dl className="evidence-case__proofline">
          {item.facts.slice(0, 2).map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <details className="evidence-case__depth">
        <summary>
          <span>Open case evidence</span>
          <small>Problem · ownership · system proof</small>
        </summary>

        <div className="evidence-case__body">
          <dl className="evidence-decisions">
            <div>
              <dt>Problem</dt>
              <dd>{item.problem}</dd>
            </div>
            <div>
              <dt>Ownership</dt>
              <dd>{item.ownership}</dd>
            </div>
            <div>
              <dt>Decision</dt>
              <dd>{item.decision}</dd>
            </div>
          </dl>

          <Artifact type={item.artifact} />

          <dl className="evidence-facts">
            {item.facts.slice(2).map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </details>
    </article>
  );
}
