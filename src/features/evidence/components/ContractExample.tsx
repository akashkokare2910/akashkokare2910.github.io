export function ContractExample() {
  return (
    <div className="artifact contract-example" aria-label="Ambiguous and distinguishable MCP tool contracts">
      <div className="contract-example__column">
        <p>Ambiguous</p>
        <code>get_customer</code>
        <span>Get customer information.</span>
        <code>find_customer</code>
        <span>Find customer information.</span>
        <strong className="contract-example__score is-fault">42 / ambiguous</strong>
      </div>
      <div className="contract-example__divider" aria-hidden="true">→</div>
      <div className="contract-example__column">
        <p>Distinguishable</p>
        <code>get_customer_by_id</code>
        <span>Retrieve one customer when the canonical ID is known.</span>
        <code>search_customers</code>
        <span>Search by partial name or email when the ID is unknown.</span>
        <strong className="contract-example__score">91 / clear</strong>
      </div>
    </div>
  );
}
