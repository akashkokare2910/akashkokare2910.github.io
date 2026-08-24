import { mapNodes } from "@/features/profile/content";

const relationshipLabels = {
  "map-evalforge": "Evaluate behavior",
  "map-forecasting": "Serve reliably",
  "map-mcplint": "Clarify contracts",
} as const;

function requireNode(id: string) {
  const node = mapNodes.find((item) => item.id === id);
  if (!node) throw new Error(`Missing operating-map node: ${id}`);
  return node;
}

export function MobileOperatingMap() {
  const center = requireNode("map-center");
  const systems = Object.keys(relationshipLabels).map(requireNode);
  const methods = mapNodes.filter(
    (node) => node.id !== center.id && !systems.some((system) => system.id === node.id),
  );

  return (
    <div className="mobile-map">
      <section
        aria-label="Three systems connected by one engineering thesis"
        className="mobile-map__constellation"
      >
        <svg aria-hidden="true" className="mobile-map__edges" viewBox="0 0 320 320">
          <path d="M160 152 C122 126 92 93 66 61" />
          <path d="M160 152 C199 126 228 93 255 61" />
          <path d="M160 171 C160 215 160 244 160 277" />
        </svg>

        <div className="mobile-map__center">
          <span>{center.kicker}</span>
          <strong>{center.label}</strong>
        </div>

        {systems.map((system) => (
          <a
            aria-label={system.label}
            className={`mobile-map__system mobile-map__system--${system.evidenceId}`}
            href={`#${system.evidenceId}`}
            key={system.id}
          >
            <span>{system.kicker}</span>
            <strong>{system.label}</strong>
          </a>
        ))}

        {systems.map((system) => (
          <span
            className={`mobile-map__relation mobile-map__relation--${system.evidenceId}`}
            key={`${system.id}-relation`}
          >
            {relationshipLabels[system.id as keyof typeof relationshipLabels]}
          </span>
        ))}
      </section>

      <details className="mobile-map__methods">
        <summary>Methods behind the systems</summary>
        <ul>
          {methods.map((method) => (
            <li key={method.id}>
              <span>{method.kicker}</span>
              <strong>{method.label}</strong>
              <p>{method.summary}</p>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
