import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import api from "../api-client";

describe("API Client", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("On OK response", () => {
    const fetchedData = { data: "This is some data" };
    const testBody = { data: "Test body" };

    it.each([
      {
        verb: "get",
        apiCall: () => api.get("/test"),
        expectedRequestOptions: expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      },
      {
        verb: "post",
        apiCall: () => api.post("/test", testBody),
        expectedRequestOptions: expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(testBody),
        }),
      },
      {
        verb: "put",
        apiCall: () => api.put("/test", testBody),
        expectedRequestOptions: expect.objectContaining({
          method: "PUT",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(testBody),
        }),
      },
      {
        verb: "delete",
        apiCall: () => api.delete("/test"),
        expectedRequestOptions: expect.objectContaining({
          method: "DELETE",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      },
    ])(
      "calls fetch on $verb request",
      async ({ apiCall, expectedRequestOptions }) => {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(fetchedData),
        });

        const result = await apiCall();

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/test"),
          expectedRequestOptions,
        );

        expect(result).toBe(fetchedData);
      },
    );
  });

  it("throws on failed response", async () => {
    const errorMessage = "It have to be this way, failing.";
    const thrownMessage = `API Response status 500 : ${errorMessage}`;

    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ error: errorMessage }),
      status: 500,
    });

    await expect(api.get("/failed-test")).rejects.toThrow(thrownMessage);
  });
});
