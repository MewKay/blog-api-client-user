import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewCommentInput from "./new-comment-input";
import commentService from "@/services/comment.service";
import authService from "@/services/auth.service";
import useBlogComments from "@/hooks/useBlogComments";

vi.mock("@/hooks/useBlogComments.js", () => ({
  default: vi.fn(),
}));

const mockToken = "LetMeIn";
const userComment = "Great post! Post more!";

describe("NewCommentInput component", () => {
  let mockUpdateComments;

  beforeEach(() => {
    mockUpdateComments = vi.fn();
    authService.getToken = vi.fn().mockReturnValue(mockToken);
    commentService.createOne = vi.fn();

    useBlogComments.mockReturnValue({
      postId: 5,
      updateComments: mockUpdateComments,
    });
  });

  it("should render correctly", () => {
    const { container } = render(<NewCommentInput />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to type on textbox", async () => {
    const user = userEvent.setup();
    render(<NewCommentInput />);

    const commentTextBox = screen.getByPlaceholderText(/new comment/i);
    await user.type(commentTextBox, userComment);

    expect(commentTextBox).toHaveValue(userComment);
  });

  it("should send the correct postId and text with an auth token, while resetting the form and calls updateComments", async () => {
    const user = userEvent.setup();
    render(<NewCommentInput />);

    const commentTextBox = screen.getByPlaceholderText(/new comment/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    await user.type(commentTextBox, userComment);
    await user.click(submitButton);

    expect(commentService.createOne).toHaveBeenCalledWith(
      { postId: 5, text: userComment },
      mockToken,
    );

    expect(commentTextBox).toHaveValue("");
    expect(mockUpdateComments).toHaveBeenCalled();
  });

  it("should clear the form when clicking cancel button", async () => {
    const user = userEvent.setup();
    render(<NewCommentInput />);

    const commentTextBox = screen.getByPlaceholderText(/new comment/i);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    await user.type(commentTextBox, userComment);
    await user.click(cancelButton);

    expect(commentTextBox).toHaveValue("");
  });
});
