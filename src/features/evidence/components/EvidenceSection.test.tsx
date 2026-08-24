import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { evidenceCases } from "@/features/profile/content";
import { EvidenceSection } from "./EvidenceSection";

afterEach(() => {
  vi.unstubAllGlobals();
});

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

  it("collapses the static-open evidence tree for compact viewports", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
      })),
    );

    const { container } = render(<EvidenceSection />);
    const controller = container.querySelector("script[data-evidence-controller]");

    expect(controller).toBeTruthy();
    window.eval(controller?.textContent ?? "");

    const disclosures = container.querySelectorAll("details[data-responsive-evidence]");
    expect(disclosures).toHaveLength(3);
    for (const disclosure of disclosures) {
      expect(disclosure).not.toHaveAttribute("open");
    }
  });
});
