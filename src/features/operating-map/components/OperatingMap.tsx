import "../operating-map.css";

import { MobileOperatingMap } from "./MobileOperatingMap";
import { OperatingMapGraph } from "./OperatingMapGraph";

export function OperatingMap() {
  return (
    <section className="operating-map" id="map" aria-labelledby="map-title">
      <div className="shell section-intro">
        <p className="section-label">Operating Map</p>
        <h2 id="map-title">How the work connects.</h2>
        <p>Three systems. One engineering thesis. Open a node for the evidence.</p>
      </div>
      <div className="shell operating-map__interactive">
        <div className="operating-map__desktop">
          <OperatingMapGraph />
        </div>
        <div className="operating-map__mobile">
          <MobileOperatingMap />
        </div>
      </div>
    </section>
  );
}
