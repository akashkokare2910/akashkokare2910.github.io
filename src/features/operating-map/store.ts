import { create } from "zustand";

import { mapNodes } from "@/features/profile/content";

type MapState = {
  selectedNodeId: string;
  selectNode: (id: string) => void;
  clearSelection: () => void;
  initializeFromHash: () => void;
};

const centerNodeId = "map-center";
const validNodeIds = new Set(mapNodes.map((node) => node.id));

function replaceHash(hash: string) {
  if (typeof window === "undefined") return;

  const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
  window.history.replaceState(null, "", nextUrl);
}

export const useMapStore = create<MapState>((set) => ({
  selectedNodeId: centerNodeId,
  selectNode: (id) => {
    if (!validNodeIds.has(id)) return;
    set({ selectedNodeId: id });
    replaceHash(`#${id}`);
  },
  clearSelection: () => {
    set({ selectedNodeId: centerNodeId });
    replaceHash("");
  },
  initializeFromHash: () => {
    if (typeof window === "undefined") return;
    const id = window.location.hash.slice(1);
    set({ selectedNodeId: validNodeIds.has(id) ? id : centerNodeId });
  },
}));
