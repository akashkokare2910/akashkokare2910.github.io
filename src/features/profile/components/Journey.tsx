import { journey } from "../content";

export function Journey() {
  return (
    <section className="journey shell" id="journey" aria-labelledby="journey-title">
      <div className="journey__intro">
        <p className="section-label">Journey</p>
        <h2 id="journey-title">The systems changed. The standard did not.</h2>
      </div>
      <ol className="journey__list">
        {journey.map((item) => (
          <li key={`${item.period}-${item.organization}`}>
            <time>{item.period}</time>
            <div>
              <h3>{item.role}</h3>
              <p className="journey__organization">{item.organization}</p>
              <p>{item.summary}</p>
              {item.proof ? <p className="journey__proof">{item.proof}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
