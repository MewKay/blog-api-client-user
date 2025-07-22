import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import mockUser from "@/testing/mocks/users";
import authService from "../auth.service";
import api from "../api-client";

const mockToken = "ThisIsSomeToken";
const mockCredentials = {
  username: mockUser.username,
  password: "wordpass",
};
const mockLocalStorage = (() => {
  let storage = {};

  const getItem = (key) => storage[key] || null;

  const setItem = (key, item) => {
    storage[key] = item;
  };

  const removeItem = (key) => {
    delete storage[key];
  };

  const clear = () => {
    storage = {};
  };

  return {
    getItem,
    setItem,
    removeItem,
    clear,
  };
})();
let originalLocalStorage;

describe("Auth service", () => {
  beforeAll(() => {
    originalLocalStorage = window.localStorage;
    window.localStorage = mockLocalStorage;
  });

  afterAll(() => {
    window.localStorage = originalLocalStorage;
  });

  it("stores user and token to localStorage on login", async () => {
    api.post = vi.fn().mockResolvedValue({ user: mockUser, token: mockToken });

    await authService.login(mockCredentials);

    const userResult = JSON.parse(localStorage.getItem("thyblog_user"));
    const tokenResult = localStorage.getItem("thyblog_token");

    expect(userResult).toEqual(mockUser);
    expect(tokenResult).toBe(mockToken);
  });

  it("removes user and token from localStorage on logout", () => {
    localStorage.setItem("thyblog_user", JSON.stringify(mockUser));
    localStorage.setItem("thyblog_token", mockToken);

    authService.logout();

    const userResult = localStorage.getItem("user");
    const tokenResult = localStorage.getItem("token");

    expect(userResult).toBeNull();
    expect(tokenResult).toBeNull();
  });

  it("returns user data from localstorage on getUser", () => {
    localStorage.setItem("thyblog_user", JSON.stringify(mockUser));

    const result = authService.getUser();

    expect(result).toEqual(mockUser);
  });

  it("triggers a storage event on login and logout", async () => {
    let updateCount = 0;
    const eventListener = () => updateCount++;
    window.addEventListener("storage", eventListener);

    await authService.login(mockCredentials);

    expect(updateCount).toBe(1);

    authService.logout();

    expect(updateCount).toBe(2);

    window.removeEventListener("storage", eventListener);
  });
});
