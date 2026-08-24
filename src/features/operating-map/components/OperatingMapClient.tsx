"use client";

import {
  Background,
  BackgroundVariant,
  ReactFlow,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";
import { useEffect, useMemo } from "react";

import { mapEdges, mapNodes } from "@/features/profile/content";
import { useMapStore } from "../store";
import { MapDetail } from "./MapDetail";
import { MapNode, type OperatingNode } from "./MapNode";

const nodeTypes = { operating: MapNode };

export function OperatingMapClient() {
  const selectedNodeId = useMapStore((state) => state.selectedNodeId);
  const selectNode = useMapStore((state) => state.selectNode);
  const initializeFromHash = useMapStore((state) => state.initializeFromHash);

  useEffect(() => initializeFromHash(), [initializeFromHash]);

  const nodes = useMemo<OperatingNode[]>(
    () =>
      mapNodes.map((node) => ({
        id: node.id,
        type: "operating",
        data: node,
        position: node.position,
        selected: node.id === selectedNodeId,
        draggable: false,
        selectable: true,
        focusable: true,
        ariaLabel: `${node.kicker}: ${node.label}. ${node.summary}`,
      })),
    [selectedNodeId],
  );

  const edges = useMemo<Edge[]>(
    () =>
      mapEdges.map((edge) => ({
        ...edge,
        type: "smoothstep",
        animated: false,
        focusable: false,
      })),
    [],
  );

  const onNodeClick: NodeMouseHandler<OperatingNode> = (_event, node) => {
    selectNode(node.id);
  };

  return (
    <div className="map-client">
      <div className="map-canvas" aria-label="Interactive map of engineering practices and systems">
        <ReactFlow
          ariaLabelConfig={{
            "node.a11yDescription.default": "Press Enter or Space to inspect this topic.",
          }}
          edges={edges}
          edgesFocusable={false}
          elementsSelectable
          fitView
          fitViewOptions={{ padding: 0.1 }}
          maxZoom={1.12}
          minZoom={0.72}
          nodes={nodes}
          nodesConnectable={false}
          nodesDraggable={false}
          nodesFocusable
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          panOnDrag
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
          zoomOnDoubleClick={false}
          zoomOnPinch
          zoomOnScroll={false}
        >
          <Background color="#cdd6d2" gap={28} size={1} variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
      <MapDetail />
    </div>
  );
}
