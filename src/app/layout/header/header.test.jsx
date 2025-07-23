import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./header";
import useAuth from "@/hooks/useAuth";
import mockUser from "@/testing/mocks/users";
import userEvent from "@testing-library/user-event";

vi.mock("@/hooks/useAuth.js", () => ({
  default: vi.fn(),
}));

describe("Header component", () => {
  it("displays log in and sign up links when user is not logged", () => {
    useAuth.mockReturnValueOnce({ user: null, logout: vi.fn() });
    render(<Header />, { wrapper: MemoryRouter });

    const loginLink = screen.getByRole("link", { name: /Log in/i });
    const signupLink = screen.getByRole("link", { name: /Sign up/i });

    expect(loginLink).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();

    const userText = screen.queryByText(new RegExp(mockUser.username));

    expect(userText).not.toBeInTheDocument();
  });

  it("displays username when user is logged", () => {
    useAuth.mockReturnValueOnce({ user: mockUser, logout: vi.fn() });
    render(<Header />, { wrapper: MemoryRouter });

    const loginLink = screen.queryByRole("link", { name: /Log in/i });

    expect(loginLink).not.toBeInTheDocument();

    const userText = screen.getByText(new RegExp(mockUser.username));

    expect(userText).toBeInTheDocument();
  });

  it("calls logout when log out button is clicked", async () => {
    const user = userEvent.setup();
    const logoutFunction = vi.fn();
    useAuth.mockReturnValueOnce({ user: mockUser, logout: logoutFunction });
    render(<Header />, { wrapper: MemoryRouter });

    const logoutButton = screen.getByRole("button", { name: /Log out/i });
    await user.click(logoutButton);

    expect(logoutFunction).toHaveBeenCalled();
  });
});
