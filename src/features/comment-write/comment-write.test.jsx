import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CommentWrite from "./comment-write";
import useAuth from "@/hooks/useAuth";

vi.mock("@/hooks/useAuth.js", () => ({
  default: vi.fn(),
}));

describe("Comment Write component", () => {
  it("should render log in and sign up links if user not logged in", () => {
    useAuth.mockReturnValue({ user: null, logout: vi.fn() });
    render(<CommentWrite />, { wrapper: MemoryRouter });

    const loginLink = screen.getByRole("link", { name: /log in/i });
    const signUpLink = screen.getByRole("link", { name: /sign up/i });

    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
});
