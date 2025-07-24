import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import NewCommentInput from "./new-comment-input";

describe("NewCommentInput component", () => {
  it("should render correctly", () => {
    const { container } = render(<NewCommentInput />);

    expect(container).toMatchSnapshot();
  });
});
