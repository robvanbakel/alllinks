import { validateAndNormalizeUrl } from "./validateAndNormalizeUrl";
import { describe, test, expect } from "vitest";

describe("Parse and validate URLs", () => {
  test("returns `null` when an empty is provided", () => {
    const normalizedUrl = validateAndNormalizeUrl("");
    expect(normalizedUrl).toBeNull();
  });

  test("returns `null` when URL is invalid", () => {
    const normalizedUrl = validateAndNormalizeUrl("example");
    expect(normalizedUrl).toBeNull();
  });

  test("normalizes URL", () => {
    const normalizedUrl = validateAndNormalizeUrl("example.com");
    expect(normalizedUrl).toBe("http://example.com");
  });
});
