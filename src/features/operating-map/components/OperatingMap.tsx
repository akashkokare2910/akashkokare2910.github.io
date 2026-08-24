import "../operating-map.css";

import { OperatingMapGraph } from "./OperatingMapGraph";

export function OperatingMap() {
  return (
    <section className="operating-map" id="map" aria-labelledby="map-title">
      <div className="shell section-intro">
        <p className="section-label">Operating Map</p>
        <h2 id="map-title">How the work connects.</h2>
        <p>
          Four practices, three systems, and one way of deciding what is safe to ship.
          Open a node to inspect the thinking behind it.
        </p>
      </div>
      <div className="shell operating-map__interactive">
        <OperatingMapGraph />
      </div>
    </section>
  );
}
