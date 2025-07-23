import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { useLoaderData } from "react-router-dom";
import routes from "@/app/routes/routes";
import mockPosts from "@/testing/mocks/posts";
import postService from "@/services/post.service";
import userEvent from "@testing-library/user-event";
import setupPageRender from "@/testing/utils/setupPageRender";

vi.mock("@/app/layout/header/header.jsx");

vi.mock("../blog-post/blog-post.jsx", () => ({
  default: function MockBlogPost() {
    const { post } = useLoaderData();
    return (
      <>
        <p>This is blog post of {post.author.username}</p>
      </>
    );
  },
}));

describe("Home page", () => {
  it("should route to the correct blog post on post item click", async () => {
    const mockPost = mockPosts[0];

    postService.getAll = vi.fn().mockResolvedValueOnce(mockPosts);
    postService.getById = vi.fn().mockResolvedValueOnce(mockPost);

    const user = userEvent.setup();
    setupPageRender(routes, ["/"]);

    const mockPostLink = await screen.findByRole("link", {
      name: new RegExp(mockPost.title),
    });

    await user.click(mockPostLink);
    const mockBlogPostText = await screen.findByText(
      `This is blog post of ${mockPost.author.username}`,
    );

    expect(mockBlogPostText).toBeInTheDocument();
  });
});
