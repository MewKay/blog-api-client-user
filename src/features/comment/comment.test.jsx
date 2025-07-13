import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Comment from "./comment";
import mockComments from "@/testing/mocks/comments";

const mockComment = mockComments[0];

describe("Comment component", () => {
  it("renders correctly", () => {
    const { container } = render(<Comment comment={mockComment} />);

    expect(container).toMatchSnapshot();
  });

  it("shows 'edited' if creation and edition dates differ", () => {
    const editedMock = {
      ...mockComment,
      edited_at: new Date(2017, 11, 24).toISOString(),
    };

    render(<Comment comment={editedMock} />);

    const editedText = screen.getByText(/edited/i);

    expect(editedText).toBeInTheDocument();
  });
});
