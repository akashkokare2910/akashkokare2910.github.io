"use client";

import { mapNodes } from "@/features/profile/content";
import { useMapStore } from "../store";

export function MapDetail() {
  const selectedNodeId = useMapStore((state) => state.selectedNodeId);
  const selectedNode = mapNodes.find((node) => node.id === selectedNodeId) ?? mapNodes[0];

  return (
    <aside className="map-detail" aria-live="polite" aria-atomic="true">
      <p className="map-detail__kicker">{selectedNode.kicker}</p>
      <h3>{selectedNode.label}</h3>
      <p>{selectedNode.summary}</p>
      {selectedNode.evidenceId ? (
        <a className="map-detail__link" href={`#${selectedNode.evidenceId}`}>
          Inspect the evidence <span aria-hidden="true">↓</span>
        </a>
      ) : null}
    </aside>
  );
}
