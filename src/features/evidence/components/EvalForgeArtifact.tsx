import Image from "next/image";

export function EvalForgeArtifact() {
  return (
    <div className="artifact artifact--trace" aria-label="An agent failure revealed by its trace">
      <div className="trace-story">
        <div className="trace-story__request">
          <span>Requested</span>
          <strong>Refund order #9999</strong>
        </div>
        <div className="trace-story__path" aria-label="Observed execution path">
          <span>list_orders</span>
          <i aria-hidden="true">→</i>
          <span className="is-fault">refund_order #1042</span>
          <i aria-hidden="true">→</i>
          <span>success response</span>
        </div>
        <div className="trace-story__verdict">
          <span>Final text</span>
          <strong>Looks correct</strong>
          <span>Environment state</span>
          <strong className="is-fault">Wrong order changed</strong>
        </div>
      </div>
      <figure className="artifact-shot">
        <Image
          alt="EvalForge comparison showing a do not ship verdict after candidate regressions"
          height={946}
          loading="lazy"
          src="/evalforge-quality-gate.webp"
          width={900}
        />
        <figcaption>
          Aggregate task success improved. The release still failed because previously passing
          cases regressed.
        </figcaption>
      </figure>
    </div>
  );
}
