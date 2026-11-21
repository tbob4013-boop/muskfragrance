import { describe, expect, it } from "bun:test";
import { priceForSize } from "./pricing";

describe("regular bottle prices", () => {
  it("charges 350 EGP for 35 ml", () => {
    expect(priceForSize(35)).toBe(350);
  });

  it("charges 450 EGP for 50 ml", () => {
    expect(priceForSize(50)).toBe(450);
  });

  it("charges 600 EGP for 100 ml", () => {
    expect(priceForSize(100)).toBe(600);
  });
});