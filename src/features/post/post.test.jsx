import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Post from "./post";
import mockPosts from "@/testing/mocks/posts";
import postService from "@/services/post.service";

vi.mock("@/services/post.service.js", () => ({
  default: {
    getById: vi.fn(),
  },
}));

const mockPost = mockPosts[1];

describe("Post component", () => {
  it("display loading message while fetching", async () => {
    // Return a pending promise that should lead to an infinite loading
    postService.getById.mockReturnValueOnce(new Promise(() => {}));

    render(<Post id={mockPost.id} />);

    const loadingMessage = await screen.findByText(/loading/i);

    expect(loadingMessage).toBeInTheDocument();
  });

  it("display error message if a problem occured", async () => {
    postService.getById.mockRejectedValueOnce(new Error("This is an error!"));

    render(<Post id={mockPost.id} />);

    const errorMessage = await screen.findByText(/wrong/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("fetched blog post with the right id", async () => {
    postService.getById.mockResolvedValueOnce(mockPost);

    render(<Post id={mockPost.id} />);

    const postTitleRegexp = new RegExp(mockPost.title);
    const postTitle = await screen.findByText(postTitleRegexp);

    expect(postTitle).toBeInTheDocument();

    expect(postService.getById).toHaveBeenCalledWith(mockPost.id);
  });
});
