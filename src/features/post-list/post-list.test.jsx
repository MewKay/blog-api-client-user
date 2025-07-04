import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostList from "./post-list";
import mockPosts from "@/testing/mocks/posts";

vi.mock("@/services/post.service.js", () => ({
  default: {
    getAll: vi.fn(() => Promise.resolve(mockPosts)),
  },
}));

describe("Blog list component", () => {
  it("fetched posts list", async () => {
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
