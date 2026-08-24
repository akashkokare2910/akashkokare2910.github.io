import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { mapEdges, mapNodes } from "@/features/profile/content";
import { OperatingMapGraph } from "./OperatingMapGraph";

describe("OperatingMapGraph", () => {
  it("renders every topic once in one responsive semantic graph", () => {
    render(<OperatingMapGraph />);

    for (const node of mapNodes) {
      expect(screen.getByText(node.label)).toBeInTheDocument();
      expect(screen.getByText(node.summary)).toBeInTheDocument();
    }

    expect(screen.getAllByRole("group")).toHaveLength(mapNodes.length);
  });

  it("draws every authored relationship without client-side behavior", () => {
    const { container } = render(<OperatingMapGraph />);

    expect(container.querySelectorAll("[data-map-edge]")).toHaveLength(mapEdges.length);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
