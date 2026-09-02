import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResumePage, { metadata } from "./page";

describe("HTML resume", () => {
  it("presents semantic experience and project sections", () => {
    render(<ResumePage />);

    expect(screen.getByRole("heading", { level: 1, name: "Akash Kokare" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Selected systems" })).toBeInTheDocument();
    expect(screen.getByText("2025 to now")).toBeInTheDocument();
  });

  it("offers the source PDF without repeating the portfolio hero", () => {
    render(<ResumePage />);

    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "href",
      "/Akash_Kokare_AI_Engineer.pdf",
    );
    expect(
      screen.queryByText("AI systems should behave like dependable software."),
    ).not.toBeInTheDocument();
  });

  it("publishes the resume as a distinct canonical page", () => {
    expect(metadata.alternates).toEqual({ canonical: "/resume/" });
    expect(metadata.openGraph).toMatchObject({ url: "/resume/" });
  });
});
