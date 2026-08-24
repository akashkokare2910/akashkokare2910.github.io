import { profile } from "../content";

export function ProofRail() {
  return (
    <aside className="proof-rail shell" aria-label="Selected engineering evidence">
      {profile.proof.map((item) => (
        <div className="proof-rail__item" key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </aside>
  );
}
