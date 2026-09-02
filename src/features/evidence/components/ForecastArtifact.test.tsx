import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ForecastArtifact } from "./ForecastArtifact";

describe("ForecastArtifact", () => {
  it("shows the execution path and three delivery branches", () => {
    render(<ForecastArtifact />);

    for (const stage of [
      "Inputs",
      "Validation gate",
      "Job control",
      "Inference",
      "Authenticated API",
    ]) {
      expect(screen.getByRole("heading", { name: stage })).toBeInTheDocument();
    }
    for (const output of ["Product", "MCP", "Agent"]) {
      expect(screen.getByText(output)).toBeInTheDocument();
    }
    expect(screen.getAllByTestId("forecast-connector")).toHaveLength(7);
  });
});
