import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostList from "./post-list";
import mockPosts from "@/testing/mocks/posts";
import postService from "@/services/post.service";

vi.mock("@/services/post.service.js", () => ({
  default: {
    getAll: vi.fn(),
  },
}));

vi.mock("./post-item/post-item.jsx", () => ({
  default: ({ post }) => <li>{post.title}</li>,
}));

describe("Blog list component", () => {
  it("display loading message while fetching", async () => {
    // Return a pending promise that should lead to an infinite loading
    postService.getAll.mockReturnValueOnce(new Promise(() => {}));

    render(<PostList />);

    const loadingMessage = await screen.findByText(/loading/i);

    expect(loadingMessage).toBeInTheDocument();
  });

  it("display error message if it occured", async () => {
    postService.getAll.mockRejectedValueOnce(new Error("This is an error!"));

    render(<PostList />);

    const errorMessage = await screen.findByText(/wrong/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("fetched posts list", async () => {
    postService.getAll.mockResolvedValueOnce(mockPosts);

    render(<PostList />);
    const firstPostTitle = new RegExp(mockPosts[0].title, "i");
    const secondPostTitle = new RegExp(mockPosts[1].title, "i");

    const postList = await screen.findAllByRole("listitem");
    const firstPost = await screen.findByText(firstPostTitle);
    const secondPost = await screen.findByText(secondPostTitle);

    expect(postList).toHaveLength(mockPosts.length);
    expect(firstPost).toBeInTheDocument();
    expect(secondPost).toBeInTheDocument();
  });
});
