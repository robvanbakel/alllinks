import { formatUrl } from "./formatUrl";
import { describe, test, expect } from "vitest";

describe("Format URLs", () => {
   test("strips protocol, WWW and trailing slash", () => {
    const formattedUrl = formatUrl("http://www.example.com/");
    expect(formattedUrl).toBe("example.com");
  });
});
