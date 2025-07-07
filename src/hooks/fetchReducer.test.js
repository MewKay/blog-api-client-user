import { describe, expect, it } from "vitest";
import fetchReducer from "./fetchReducer";

const initialState = {
  data: null,
  loading: true,
  error: null,
};

describe("fetch reducer", () => {
  it("handles 'FETCH_INIT' action", () => {
    const result = fetchReducer(initialState, { type: "FETCH_INIT" });

    expect(result).toEqual(
      expect.objectContaining({
        loading: true,
        error: null,
      }),
    );
  });

  it("handles 'FETCH_SUCCESS' action", () => {
    const payloadData = { content: "This is some data" };
    const result = fetchReducer(initialState, {
      type: "FETCH_SUCCESS",
      payload: payloadData,
    });

    expect(result).toEqual(
      expect.objectContaining({
        data: payloadData,
        loading: false,
        error: null,
      }),
    );
  });

  it("handles 'FETCH_ERROR' action", () => {
    const payloadData = new Error("This is some error");
    const result = fetchReducer(initialState, {
      type: "FETCH_ERROR",
      payload: payloadData,
    });

    expect(result).toEqual(
      expect.objectContaining({
        loading: false,
        error: expect.anything(),
      }),
    );
  });

  it("throws for unknown action type", () => {
    expect(() =>
      fetchReducer(undefined, { type: "UNKNOWN_ACTION" }),
    ).toThrowError();
  });
});
