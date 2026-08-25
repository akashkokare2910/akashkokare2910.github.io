import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "./Hero";

describe("portfolio identity", () => {
  it("shows the full identity once and gives the page a thesis", () => {
    render(
      <>
        <Hero />
        <SiteFooter />
      </>,
    );

    expect(screen.getAllByText("Akash Kokare")).toHaveLength(1);
    expect(screen.getByText("आकाश कोकरे")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "AI systems should behave like dependable software.",
      }),
    ).toBeInTheDocument();
  });

  it("keeps the footer focused on contact instead of repeating identity", () => {
    render(<SiteFooter />);

    expect(screen.queryByText("Akash Kokare")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Book a 30-minute call" })).toHaveAttribute(
      "href",
      "https://cal.com/akash-kokare/30min",
    );
  });

  it("uses Next public asset paths without a duplicated public segment", () => {
    const { container } = render(
      <>
        <Hero />
        <SiteFooter />
      </>,
    );

    const portraitSource = container.querySelector("img")?.getAttribute("src");
    expect(portraitSource).toContain("akash-kokare.jpg");
    expect(portraitSource).not.toContain("%2Fpublic%2F");
    expect(screen.getByRole("link", { name: "PDF résumé" })).toHaveAttribute(
      "href",
      "/Akash_Kokare_AI_Engineer.pdf",
    );
  });
});
