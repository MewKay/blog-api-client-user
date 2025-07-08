import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import PostItem from "./post-item";
import mockPosts from "@/testing/mocks/posts";
import sqids from "@/lib/sqids";
import { subMonths } from "date-fns";
import { MemoryRouter } from "react-router-dom";

describe("Post Item component", () => {
  const mockPost = mockPosts[0];
  // Make the date stale so the data stays the same
  const staticDate = subMonths(new Date(), 4).toISOString();
  mockPost.created_at = staticDate;

  it("renders correctly", () => {
    const { container } = render(<PostItem post={mockPost} />, {
      wrapper: MemoryRouter,
    });

    expect(container).toMatchSnapshot();
  });

  it("calls sqids encoding when rendering", async () => {
    sqids.encode = vi.fn();

    render(<PostItem post={mockPost} />, { wrapper: MemoryRouter });

    expect(sqids.encode).toHaveBeenCalledOnce();
  });
});
