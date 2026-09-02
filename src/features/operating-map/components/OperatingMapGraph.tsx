import type { CSSProperties } from "react";

import { mapEdges, mapNodes } from "@/features/profile/content";

const STAGE_WIDTH = 1080;
const STAGE_HEIGHT = 720;
const DEFAULT_NODE_WIDTH = 224;
const DEFAULT_NODE_HEIGHT = 85;
const CENTER_NODE_WIDTH = 256;
const CENTER_NODE_HEIGHT = 120;

function centerFor(nodeId: string) {
  const node = mapNodes.find((item) => item.id === nodeId);
  if (!node) throw new Error(`Unknown map node: ${nodeId}`);

  const width = node.kind === "center" ? CENTER_NODE_WIDTH : DEFAULT_NODE_WIDTH;
  const height = node.kind === "center" ? CENTER_NODE_HEIGHT : DEFAULT_NODE_HEIGHT;

  return {
    x: node.position.x + width / 2,
    y: node.position.y + height / 2,
  };
}

function topicPosition(nodeId: string): CSSProperties {
  const center = centerFor(nodeId);
  return {
    "--map-x": `${(center.x / STAGE_WIDTH) * 100}%`,
    "--map-y": `${(center.y / STAGE_HEIGHT) * 100}%`,
  } as CSSProperties;
}

export function OperatingMapGraph() {
  return (
    <div className="map-graph" aria-label="Engineering practices, systems, and principles">
      <svg
        aria-hidden="true"
        className="map-graph__edges"
        preserveAspectRatio="none"
        viewBox={`0 0 ${STAGE_WIDTH} ${STAGE_HEIGHT}`}
      >
        {mapEdges.map((edge) => {
          const source = centerFor(edge.source);
          const target = centerFor(edge.target);

          return (
            <line
              data-map-edge
              key={edge.id}
              x1={source.x}
              x2={target.x}
              y1={source.y}
              y2={target.y}
            />
          );
        })}
      </svg>

      <div className="map-graph__topics">
        {mapNodes.map((node) => (
          <details
            className={`map-topic map-topic--${node.kind}`}
            key={node.id}
            style={topicPosition(node.id)}
          >
            <summary>
              <span>{node.kicker}</span>
              <strong>{node.label}</strong>
            </summary>
            <div className="map-topic__detail">
              <p>{node.summary}</p>
              {node.evidenceId ? (
                <a href={`#${node.evidenceId}`}>
                  View evidence <span aria-hidden="true">↘</span>
                </a>
              ) : null}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
