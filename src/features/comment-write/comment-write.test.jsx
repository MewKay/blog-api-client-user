import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CommentWrite from "./comment-write";
import useAuth from "@/hooks/useAuth";
import mockUser from "@/testing/mocks/users";

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

  it("should render a textarea input if user is logged", () => {
    useAuth.mockReturnValue({ user: mockUser, logout: vi.fn() });
    render(<CommentWrite />, { wrapper: MemoryRouter });

    const newCommentTextArea = screen.getByPlaceholderText(/new comment/i);
    const newCommentButton = screen.getByRole("button", { name: /send/i });

    expect(newCommentTextArea).toBeInTheDocument();
    expect(newCommentButton).toBeInTheDocument();
  });
});
