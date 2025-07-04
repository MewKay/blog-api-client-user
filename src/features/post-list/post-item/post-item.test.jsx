import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import PostItem from "./post-item";
import mockPosts from "@/testing/mocks/posts";
import { subMonths } from "date-fns";

describe("Post Item component", () => {
  it("renders correctly", () => {
    // Make the date stale so the data stays the same
    const mockPost = mockPosts[0];
    delete mockPost.created_at;
    const staticDate = subMonths(new Date(), 4).toISOString();

    const { container } = render(
      <PostItem post={{ created_at: staticDate, ...mockPost }} />,
    );

    expect(container).toMatchSnapshot();
  });
});
