import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditCommentInput from "./edit-comment-input";
import authService from "@/services/auth.service";
import useBlogComments from "@/hooks/useBlogComments";
import mockComments from "@/testing/mocks/comments";

vi.mock("@/hooks/useBlogComments.js", () => ({
  default: vi.fn(),
}));

const mockComment = mockComments[0];
const mockToken = "MeHavePermission";

const setup = () => {
  const user = userEvent.setup();
  render(<EditCommentInput />);
  const textarea = screen.getByRole("textbox");
  const submitButton = screen.getByRole("button", { name: /send/i });
  const cancelButton = screen.getByRole("button", { name: /cancel/i });

  return {
    user,
    textarea,
    submitButton,
    cancelButton,
  };
};

describe("EditCommentInput component", () => {
  let mockSetCommentToEdit;
  let mockUpdateComments;

  beforeEach(() => {
    mockSetCommentToEdit = vi.fn();
    mockUpdateComments = vi.fn();
    authService.getToken = vi.fn().mockReturnValue(mockToken);

    useBlogComments.mockReturnValue({
      postId: 5,
      commentToEdit: mockComment,
      setCommentToEdit: mockSetCommentToEdit,
      updateComments: mockUpdateComments,
    });
  });

  it("renders correctly", () => {
    const { container } = render(<EditCommentInput />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to type on textbox with the comment to edit", async () => {
    const { user, textarea } = setup();

    const additionalText = " and happy new year (not).";
    await user.type(textarea, additionalText);

    expect(textarea).toHaveValue(mockComment.text + additionalText);
  });

  it("should clear the form and call setCommentToEdit with null when clicking cancel button", async () => {
    const { user, textarea, cancelButton } = setup();

    await user.click(cancelButton);
    expect(textarea).toHaveValue("");
    expect(mockSetCommentToEdit).toHaveBeenNthCalledWith(1, null);
  });
});
