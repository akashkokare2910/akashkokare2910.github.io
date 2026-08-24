const stages = [
  { label: "Ingest", detail: "CSV · Excel · Parquet" },
  { label: "Validate", detail: "schema · gaps · frequency" },
  { label: "Execute", detail: "7 foundation models" },
  { label: "Serve", detail: "API · queue · idempotency" },
  { label: "Use", detail: "product · MCP · agent" },
];

export function ForecastArtifact() {
  return (
    <div className="artifact forecast-flow" aria-label="Forecasting platform from ingestion to use">
      {stages.map((stage, index) => (
        <div className="forecast-flow__stage" key={stage.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{stage.label}</strong>
          <small>{stage.detail}</small>
        </div>
      ))}
    </div>
  );
}
