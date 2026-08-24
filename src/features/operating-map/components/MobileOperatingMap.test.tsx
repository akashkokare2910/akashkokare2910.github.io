import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MobileOperatingMap } from "./MobileOperatingMap";

describe("MobileOperatingMap", () => {
  it("presents the thesis and three systems as one constellation", () => {
    render(<MobileOperatingMap />);

    const map = screen.getByRole("region", {
      name: "Three systems connected by one engineering thesis",
    });

    expect(within(map).getByText("Applied AI engineering")).toBeInTheDocument();
    for (const system of ["EvalForge", "Forecasting platform", "MCPLint"]) {
      expect(within(map).getByRole("link", { name: system })).toBeInTheDocument();
    }
    for (const relation of ["Evaluate behavior", "Serve reliably", "Clarify contracts"]) {
      expect(within(map).getByText(relation)).toBeInTheDocument();
    }
  });

  it("places supporting practices in one disclosure", () => {
    render(<MobileOperatingMap />);

    const summary = screen.getByText("Methods behind the systems");
    const disclosure = summary.closest("details");

    expect(disclosure).toBeTruthy();
    expect(within(disclosure as HTMLElement).getByText("Reliable agents")).toBeInTheDocument();
    expect(within(disclosure as HTMLElement).getByText("Deterministic first")).toBeInTheDocument();
  });
});
