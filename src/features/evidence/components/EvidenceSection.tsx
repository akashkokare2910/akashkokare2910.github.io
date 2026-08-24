import "../evidence.css";

import { responsiveEvidenceController } from "@/features/evidence/responsiveEvidenceController";
import { evidenceCases } from "@/features/profile/content";
import { EvidenceCase } from "./EvidenceCase";

export function EvidenceSection() {
  return (
    <section className="evidence" id="evidence" aria-labelledby="evidence-title">
      <div className="shell section-intro">
        <p className="section-label">Selected evidence</p>
        <h2 id="evidence-title">Three systems. Three hard decisions.</h2>
        <p>
          The work is presented as problems, ownership, and observable proof, not a technology
          inventory.
        </p>
      </div>
      <div className="shell evidence__cases">
        {evidenceCases.map((item) => (
          <EvidenceCase item={item} key={item.id} />
        ))}
      </div>
      <script
        data-evidence-controller
        dangerouslySetInnerHTML={{ __html: responsiveEvidenceController }}
      />
    </section>
  );
}
