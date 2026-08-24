import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { mapNodes } from "@/features/profile/content";
import { useMapStore } from "../store";
import { OperatingMapFallback } from "./OperatingMapFallback";

describe("OperatingMapFallback", () => {
  beforeEach(() => {
    useMapStore.setState({ selectedNodeId: "map-center" });
  });

  it("makes every map relationship available as semantic content", () => {
    render(<OperatingMapFallback />);

    for (const node of mapNodes) {
      expect(screen.getByRole("button", { name: node.label })).toBeInTheDocument();
    }
  });

  it("shows detail for the selected node", () => {
    render(<OperatingMapFallback />);

    fireEvent.click(screen.getByRole("button", { name: "EvalForge" }));

    expect(screen.getByRole("heading", { name: "EvalForge" })).toBeInTheDocument();
    expect(
      screen.getByText("Behavioral evaluation and release gates for tool-using agents."),
    ).toBeInTheDocument();
  });
});
