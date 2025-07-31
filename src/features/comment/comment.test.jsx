import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comment from "./comment";

import useBlogComments from "@/hooks/useBlogComments";
import useAuth from "@/hooks/useAuth";
import mockUser from "@/testing/mocks/users";
import mockComments from "@/testing/mocks/comments";

vi.mock("@/hooks/useAuth.js", () => ({
  default: vi.fn(),
}));
vi.mock("@/hooks/useBlogComments.js", () => ({
  default: vi.fn(),
}));
const mockComment = mockComments[0];

describe("Comment component", () => {
  beforeEach(() => {
    useAuth.mockReturnValueOnce({
      user: mockUser,
      isAuthenticated: true,
    });
  });

  it("renders correctly", () => {
    useBlogComments.mockReturnValueOnce({
      setCommentToEdit: vi.fn(),
    });
    const { container } = render(<Comment comment={mockComment} />);

    expect(container).toMatchSnapshot();
  });

  it("shows 'edited' if creation and edition dates differ", () => {
    useBlogComments.mockReturnValueOnce({
      setCommentToEdit: vi.fn(),
    });
    const editedMock = {
      ...mockComment,
      edited_at: new Date(2017, 11, 24).toISOString(),
    };

    render(<Comment comment={editedMock} />);

    const editedText = screen.getByText(/edited/i);

    expect(editedText).toBeInTheDocument();
  });

  it("send the comment to be edited to BlogComments context provider on edit button click", async () => {
    const mockSetCommentToEdit = vi.fn();
    useBlogComments.mockReturnValueOnce({
      setCommentToEdit: mockSetCommentToEdit,
    });

    const user = userEvent.setup();

    render(<Comment comment={mockComment} />);

    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();

    await user.click(editButton);
    expect(mockSetCommentToEdit).toHaveBeenCalledWith(mockComment);
  });
});
