import { beforeEach, describe, expect, it } from "vitest";

import { useMapStore } from "./store";

describe("Operating Map selection", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
    useMapStore.setState({ selectedNodeId: "map-center" });
  });

  it("selects a node and writes a shareable hash", () => {
    useMapStore.getState().selectNode("map-evalforge");

    expect(useMapStore.getState().selectedNodeId).toBe("map-evalforge");
    expect(window.location.hash).toBe("#map-evalforge");
  });

  it("restores a valid node selection from the URL", () => {
    window.history.replaceState(null, "", "/#map-mcplint");
    useMapStore.getState().initializeFromHash();

    expect(useMapStore.getState().selectedNodeId).toBe("map-mcplint");
  });

  it("returns to the thesis node when selection is cleared", () => {
    useMapStore.setState({ selectedNodeId: "map-forecasting" });
    useMapStore.getState().clearSelection();

    expect(useMapStore.getState().selectedNodeId).toBe("map-center");
    expect(window.location.hash).toBe("");
  });
});
