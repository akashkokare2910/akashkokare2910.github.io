import { describe, expect, it } from "vitest";

import { evidenceCases, mapNodes, profile } from "./content";

const bannedPhrases = [
  "cutting-edge",
  "passionate",
  "at the intersection",
  "game-changing",
  "seamless",
];

describe("portfolio content", () => {
  it("keeps identifiers unique", () => {
    const identifiers = [
      ...mapNodes.map((node) => node.id),
      ...evidenceCases.map((item) => item.id),
    ];

    expect(new Set(identifiers).size).toBe(identifiers.length);
  });

  it("contains exactly three evidence cases", () => {
    expect(evidenceCases).toHaveLength(3);
  });

  it("uses the full name only in the identity source", () => {
    expect(profile.identity.name).toBe("Akash Kokare");
    expect(JSON.stringify({ mapNodes, evidenceCases })).not.toContain(
      profile.identity.name,
    );
  });

  it("avoids generic marketing copy", () => {
    const copy = JSON.stringify({ profile, mapNodes, evidenceCases }).toLowerCase();

    for (const phrase of bannedPhrases) {
      expect(copy).not.toContain(phrase);
    }
  });
});
