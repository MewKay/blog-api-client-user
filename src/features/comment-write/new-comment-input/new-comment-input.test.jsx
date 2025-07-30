import { describe, expect, it, vi } from "vitest";
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
  it("should render correctly", () => {
    useBlogComments.mockReturnValueOnce({ postId: 5 });
    const { container } = render(<NewCommentInput />);

    expect(container).toMatchSnapshot();
  });

  it("should be able to type on textbox", async () => {
    useBlogComments.mockReturnValueOnce({ postId: 5 });
    const user = userEvent.setup();
    render(<NewCommentInput />);

    const commentTextBox = screen.getByPlaceholderText(/new comment/i);
    await user.type(commentTextBox, userComment);

    expect(commentTextBox).toHaveValue(userComment);
  });

  it("should send the correct postId and text with an auth token, while resetting the form and calls updateComments", async () => {
    authService.getToken = vi.fn().mockReturnValueOnce(mockToken);
    commentService.createOne = vi.fn();
    const mockUpdateComments = vi.fn();
    useBlogComments.mockReturnValueOnce({
      postId: 5,
      updateComments: mockUpdateComments,
    });

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
});
