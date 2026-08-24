import { describe, expect, it } from "vitest";

import { stripClientRuntime } from "./strip-next-runtime.mjs";

describe("stripClientRuntime", () => {
  it("removes Next hydration assets while preserving structured data", () => {
    const html = `<!doctype html><head>
      <link rel="preload" as="script" href="/_next/runtime.js" />
      <script src="/_next/static/chunks/runtime.js" async></script>
      <script>self.__next_f.push([1, "payload"])</script>
      <script type="application/ld+json">{"@type":"Person"}</script>
    </head><body><details><summary>Topic</summary></details></body>`;

    const result = stripClientRuntime(html);

    expect(result).not.toContain("runtime.js");
    expect(result).not.toContain("self.__next_f");
    expect(result).toContain('type="application/ld+json"');
    expect(result).toContain("<details>");
  });
});
