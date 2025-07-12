import { describe, it, expect } from "vitest";
import sqids from "../sqids";
import Sqids from "sqids";

describe("sqids wrapper", () => {
  it("throws Response if encodedId length is different than eight", () => {
    expect(() => sqids.decode("short")).toThrow(Response);
    expect(() => sqids.decode("verylong1dthisis")).toThrow(Response);
  });

  it("throws Response if encodedId decoded to more than one number", () => {
    const encodedTestId = new Sqids({
      alphabet: import.meta.env.VITE_SQIDS_ALPHABET,
      minLength: 8,
    }).encode([1, 2, 3]);

    expect(() => sqids.decode(encodedTestId)).toThrow(Response);
  });

  it("throws Response if encodedId is not canonical", () => {
    const encodedTestId = sqids.encode(6);
    const nonCanonicalId = encodedTestId.replace(encodedTestId.charAt(-1), "0");

    expect(() => sqids.decode(nonCanonicalId)).toThrow(Response);
  });
});
