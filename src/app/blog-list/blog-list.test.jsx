import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogList from "./blog-list";

const mockPostList = [
  {
    id: 1,
    title: "This is my first post",
    text: "This is the body of my post",
    created_at: new Date(2025, 4, 16).toISOString(),
    author: {
      username: "Some_random_person",
    },
  },
  {
    id: 2,
    title: "Art of testing",
    text: "Testing is mandatory, nuff said",
    created_at: new Date(2023, 8, 21).toISOString(),
    author: {
      username: "thu_sun",
    },
  },
];

vi.mock("@/services/post.service.js", () => ({
  default: {
    getAll: vi.fn(() => Promise.resolve(mockPostList)),
  },
}));

describe("Blog list component", () => {
  it("fetched posts list", async () => {
    render(<BlogList />);
    const firstPostTitle = new RegExp(mockPostList[0].title, "i");
    const secondPostTitle = new RegExp(mockPostList[1].title, "i");

    const postList = await screen.findAllByRole("listitem");
    const firstPost = await screen.findByText(firstPostTitle);
    const secondPost = await screen.findByText(secondPostTitle);

    screen.debug();
    expect(postList).toHaveLength(mockPostList.length);
    expect(firstPost).toBeInTheDocument();
    expect(secondPost).toBeInTheDocument();
  });
});
