const stages = [
  { label: "Inputs", detail: "CSV · Excel · Parquet" },
  { label: "Validation gate", detail: "schema · gaps · frequency" },
  { label: "Job control", detail: "queue · restart-safe idempotency" },
  { label: "Inference", detail: "7 zero-shot foundation models" },
  { label: "Authenticated API", detail: "one workflow · tenant boundaries" },
] as const;

const outputs = ["Product", "MCP", "Agent"] as const;

export function ForecastArtifact() {
  return (
    <figure className="artifact forecast-topology" aria-labelledby="forecast-topology-title">
      <figcaption id="forecast-topology-title">
        One dependable path from uploaded data to every interface.
      </figcaption>
      <p className="forecast-topology__cue">
        Swipe the system path <span aria-hidden="true">→</span>
      </p>

      <div className="forecast-topology__viewport">
        <svg aria-hidden="true" className="forecast-topology__connectors" viewBox="0 0 1000 360">
          <path d="M110 110 H275" data-testid="forecast-connector" />
          <path d="M325 110 H475" data-testid="forecast-connector" />
          <path d="M525 110 H675" data-testid="forecast-connector" />
          <path d="M725 110 H875" data-testid="forecast-connector" />
          <path d="M900 145 C890 220 720 225 700 275" data-testid="forecast-connector" />
          <path d="M900 145 V275" data-testid="forecast-connector" />
          <path d="M900 145 C910 220 975 225 975 275" data-testid="forecast-connector" />
        </svg>

        <ol className="forecast-topology__stages">
          {stages.map((stage, index) => (
            <li key={stage.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h4>{stage.label}</h4>
              <p>{stage.detail}</p>
            </li>
          ))}
        </ol>

        <div className="forecast-topology__delivery">
          <p>Delivery surfaces</p>
          <ul>
            {outputs.map((output) => (
              <li key={output}>{output}</li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
