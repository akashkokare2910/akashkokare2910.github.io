import "@xyflow/react/dist/style.css";
import "../operating-map.css";

import { OperatingMapFallback } from "./OperatingMapFallback";
import { OperatingMapLazy } from "./OperatingMapLazy";

export function OperatingMap() {
  return (
    <section className="operating-map" id="map" aria-labelledby="map-title">
      <div className="shell section-intro">
        <p className="section-label">Operating Map</p>
        <h2 id="map-title">How the work connects.</h2>
        <p>
          Four practices, three systems, and one way of deciding what is safe to ship.
          Select a node to inspect the thinking behind it.
        </p>
      </div>
      <div className="shell operating-map__interactive">
        <div className="operating-map__desktop">
          <OperatingMapLazy />
        </div>
        <div className="operating-map__fallback">
          <OperatingMapFallback />
        </div>
        <noscript>
          <style>{`.operating-map__fallback{display:block}.operating-map__desktop{display:none}`}</style>
        </noscript>
      </div>
    </section>
  );
}
