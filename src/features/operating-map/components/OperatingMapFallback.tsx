"use client";

import { mapNodes } from "@/features/profile/content";
import { useMapStore } from "../store";
import { MapDetail } from "./MapDetail";

const groups = [
  { title: "Thesis", kinds: ["center"] },
  { title: "Practices", kinds: ["practice"] },
  { title: "Systems", kinds: ["system"] },
  { title: "Principles", kinds: ["principle"] },
] as const;

export function OperatingMapFallback() {
  const selectedNodeId = useMapStore((state) => state.selectedNodeId);
  const selectNode = useMapStore((state) => state.selectNode);

  return (
    <div className="map-fallback">
      <div className="map-fallback__groups" aria-label="Operating Map topics">
        {groups.map((group) => (
          <section className="map-fallback__group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="map-fallback__buttons">
              {mapNodes
                .filter((node) => group.kinds.some((kind) => kind === node.kind))
                .map((node) => (
                  <button
                    aria-pressed={node.id === selectedNodeId}
                    key={node.id}
                    onClick={() => selectNode(node.id)}
                    type="button"
                  >
                    {node.label}
                  </button>
                ))}
            </div>
          </section>
        ))}
      </div>
      <MapDetail />
    </div>
  );
}
