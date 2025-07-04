import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import PostItem from "./post-item";
import mockPosts from "@/testing/mocks/posts";

describe("Post Item component", () => {
  it("renders correctly", () => {
    const { container } = render(<PostItem post={mockPosts[0]} />);

    expect(container).toMatchSnapshot();
  });
});
