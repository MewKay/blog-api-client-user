import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NewCommentInput from "./new-comment-input";
import userEvent from "@testing-library/user-event";
import sqids from "@/lib/sqids";
import commentService from "@/services/comment.service";
import authService from "@/services/auth.service";

const mockPostId = 5;
const mockToken = "LetMeIn";
const userComment = "Great post! Post more!";

describe("NewCommentInput component", () => {
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

  it("should send the correct postId and text with an auth token", async () => {
    sqids.decode = vi.fn().mockReturnValueOnce(mockPostId);
    authService.getToken = vi.fn().mockReturnValueOnce(mockToken);
    commentService.createOne = vi.fn();

    const user = userEvent.setup();
    render(<NewCommentInput />);

    const commentTextBox = screen.getByPlaceholderText(/new comment/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    await user.type(commentTextBox, userComment);
    await user.click(submitButton);

    expect(commentService.createOne).toHaveBeenCalledWith(
      { postId: mockPostId, text: userComment },
      mockToken,
    );
  });
});
