import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CommentWrite from "./comment-write";
import useAuth from "@/hooks/useAuth";
import useBlogComments from "@/hooks/useBlogComments";
import mockComments from "@/testing/mocks/comments";

vi.mock("@/hooks/useBlogComments.js", () => ({
  default: vi.fn(),
}));

vi.mock("@/hooks/useAuth.js", () => ({
  default: vi.fn(),
}));

describe("Comment Write component", () => {
  const mockComment = mockComments[0];

  beforeEach(() => {
    useBlogComments.mockReturnValue({
      commentToEdit: null,
    });
  });

  it("should render log in and sign up links if user not logged in", () => {
    useAuth.mockReturnValue({ isAuthenticated: false });
    render(<CommentWrite />, {
      wrapper: MemoryRouter,
    });

    const loginLink = screen.getByRole("link", { name: /log in/i });
    const signUpLink = screen.getByRole("link", { name: /sign up/i });

    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });

  it("should render a new comment input if user is logged", () => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    render(<CommentWrite />, {
      wrapper: MemoryRouter,
    });

    const newCommentTextArea = screen.getByPlaceholderText(/new comment/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    expect(newCommentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should render a textarea input with the comment to input issued if user is logged", () => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    useBlogComments.mockReturnValue({
      commentToEdit: mockComment,
    });

    render(<CommentWrite />, {
      wrapper: MemoryRouter,
    });

    const editCommentTextArea = screen.getByDisplayValue(mockComment.text);
    const submitButton = screen.getByRole("button", { name: /send/i });

    expect(editCommentTextArea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
