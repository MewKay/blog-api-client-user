import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Post from "./post";
import mockPosts from "@/testing/mocks/posts";

const mockPost = mockPosts[1];

describe("Post component", () => {
  it("renders correctly", () => {
    const { container } = render(<Post post={mockPost} loading={false} />);

    expect(container).matchSnapshot();
  });
});
