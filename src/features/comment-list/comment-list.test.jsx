import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import CommentList from "./comment-list";
import mockComments from "@/testing/mocks/comments";

vi.mock("../comment/comment.jsx", () => ({
  default: ({ comment }) => <p>{comment.text}</p>,
}));

describe("CommentList component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <CommentList commentList={mockComments} loading={false} />,
    );

    expect(container).toMatchSnapshot();
  });
});
