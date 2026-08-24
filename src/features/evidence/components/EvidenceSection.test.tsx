import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { evidenceCases } from "@/features/profile/content";
import { EvidenceSection } from "./EvidenceSection";

describe("EvidenceSection", () => {
  it("renders exactly three unique cases from the content source", () => {
    render(<EvidenceSection />);

    const caseHeadings = evidenceCases.map((item) =>
      screen.getByRole("heading", { level: 3, name: item.title }),
    );

    expect(caseHeadings).toHaveLength(3);
    expect(new Set(caseHeadings.map((heading) => heading.textContent)).size).toBe(3);
  });

  it("exposes evidence labels and verified destinations", () => {
    render(<EvidenceSection />);

    expect(screen.getByText("20 manually audited cases")).toBeInTheDocument();
    expect(screen.getByText("15 deterministic rules")).toBeInTheDocument();
    expect(screen.getByText("7 zero-shot time-series foundation models")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "PyPI" })).toHaveAttribute(
      "href",
      "https://pypi.org/project/mcplint-cli/",
    );
  });
});
