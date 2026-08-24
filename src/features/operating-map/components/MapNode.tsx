"use client";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

import type { MapNodeItem } from "@/features/profile/types";

export type OperatingNode = Node<MapNodeItem, "operating">;

export function MapNode({ data, selected }: NodeProps<OperatingNode>) {
  return (
    <div className={`map-node map-node--${data.kind}${selected ? " is-selected" : ""}`}>
      <Handle className="map-node__handle" position={Position.Top} type="target" />
      <span>{data.kicker}</span>
      <strong>{data.label}</strong>
      <Handle className="map-node__handle" position={Position.Bottom} type="source" />
    </div>
  );
}
