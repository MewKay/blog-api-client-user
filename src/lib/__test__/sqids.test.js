import { describe, it, expect } from "vitest";
import sqids from "../sqids";
import Sqids from "sqids";

describe("sqids wrapper", () => {
  it("returns falsy if encodedId length is different than eight", () => {
    const result1 = sqids.decode("short");
    const result2 = sqids.decode("verylong1dthisis");

    expect(result1).toBeFalsy();
    expect(result2).toBeFalsy();
  });

  it("returns falsy if encodedId decoded to more than one number", () => {
    const encodedTestId = new Sqids({
      alphabet: import.meta.env.VITE_SQIDS_ALPHABET,
      minLength: 8,
    }).encode([1, 2, 3]);
    const result = sqids.decode(encodedTestId);

    expect(result).toBeFalsy();
  });

  it("returns falsy if encodedId is not canonical", () => {
    const encodedTestId = sqids.encode(6);
    const nonCanonicalId = encodedTestId.replace(encodedTestId.charAt(-1), "0");

    const result = sqids.decode(nonCanonicalId);

    expect(result).toBeFalsy();
  });
});
