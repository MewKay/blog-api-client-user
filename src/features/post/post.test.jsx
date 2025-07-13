import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Post from "./post";
import mockPosts from "@/testing/mocks/posts";
import { addMonths } from "date-fns";

const mockPost = mockPosts[1];

describe("Post component", () => {
  it("renders correctly", () => {
    const { container } = render(<Post post={mockPost} />);

    expect(container).matchSnapshot();
  });

  it("display edited date if post was modified", () => {
    const editedPost = {
      ...mockPost,
      edited_at: addMonths(mockPost.created_at, 2).toISOString(),
    };

    render(<Post post={editedPost} />);

    const editedText = screen.getByText(/edited/i);

    expect(editedText).toBeInTheDocument();
  });
});
