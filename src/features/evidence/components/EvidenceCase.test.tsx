import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { evidenceCases } from "@/features/profile/content";
import { EvidenceCase } from "./EvidenceCase";

describe("EvidenceCase", () => {
  it("keeps two headline facts visible and moves depth into one disclosure", () => {
    const item = evidenceCases[2];
    render(<EvidenceCase item={item} />);

    const article = screen.getByRole("article");
    const proofline = article.querySelector(".evidence-case__proofline");

    expect(proofline).toBeTruthy();
    expect(within(proofline as HTMLElement).getByText(item.facts[0].value)).toBeInTheDocument();
    expect(within(proofline as HTMLElement).getByText(item.facts[1].value)).toBeInTheDocument();

    const disclosure = within(article).getByText("Open case evidence").closest("details");
    expect(disclosure).toBeTruthy();
    expect(within(disclosure as HTMLElement).getByText(item.problem)).toBeInTheDocument();
  });

  it("renders each verified fact once", () => {
    const item = evidenceCases[0];
    render(<EvidenceCase item={item} />);

    for (const fact of item.facts) {
      expect(screen.getAllByText(fact.value)).toHaveLength(1);
    }
  });
});
