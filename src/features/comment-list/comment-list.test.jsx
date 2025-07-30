import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentList from "./comment-list";
import mockComments from "@/testing/mocks/comments";
import useBlogComments from "@/hooks/useBlogComments";
import userEvent from "@testing-library/user-event";

vi.mock("@/hooks/useBlogComments.js", () => ({
  default: vi.fn(),
}));

describe("CommentList component", () => {
  it("display loading message while fetching", async () => {
    useBlogComments.mockReturnValueOnce({
      comments: {
        data: [],
        loading: true,
        error: null,
      },
    });

    render(<CommentList />);

    const loadingMessage = await screen.findByText(/loading/i);

    expect(loadingMessage).toBeInTheDocument();
  });

  it("display error message if it occured button to retry", async () => {
    const updateComments = vi.fn();
    useBlogComments.mockReturnValueOnce({
      comments: {
        data: [],
        loading: false,
        error: new Error("This is error"),
      },
      updateComments,
    });

    const user = userEvent.setup();
    render(<CommentList />);

    const errorMessage = await screen.findByText(/wrong/i);
    const retryButton = await screen.findByRole("button", { name: /retry/i });
    await user.click(retryButton);

    expect(errorMessage).toBeInTheDocument();
    expect(updateComments).toHaveBeenCalled();
  });

  it("fetched posts list", async () => {
    useBlogComments.mockReturnValueOnce({
      comments: {
        data: mockComments,
        loading: false,
        error: null,
      },
    });

    render(<CommentList />);

    const commentList = await screen.findAllByRole("listitem");
    expect(commentList).toHaveLength(mockComments.length);

    for (let comment of mockComments) {
      const commentText = await screen.findByText(comment.text);
      expect(commentText).toBeInTheDocument();
    }
  });
});
