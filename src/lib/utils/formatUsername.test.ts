import { formatUsername } from "./formatUsername";
import { describe, test, expect } from "vitest";

describe("Format username", () => {
   test("strips capitals and spaces", () => {
    const formattedUsername = formatUsername("John Doe");
    expect(formattedUsername).toBe("johndoe");
  });

   test("strips special characters", () => {
    const formattedUsername = formatUsername("John#Doe!");
    expect(formattedUsername).toBe("johndoe");
  });
});
