import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentForm from "./comment-form";
import ranges from "@/constants/validationRanges";

let mockProps;

const setup = (props) => {
  const user = userEvent.setup();

  const component = render(<CommentForm {...mockProps} {...props} />);

  const textarea = screen.getByPlaceholderText(mockProps.placeholder);
  const submitButton = screen.getByRole("button", { name: /Send/i });
  const resetButton = screen.getByRole("button", { name: /Cancel/i });
  const errorMessage = screen.queryByText(/Comment is required to be between/);

  return {
    user,
    component,
    textarea,
    submitButton,
    resetButton,
    errorMessage,
    unmount: component.unmount,
  };
};

describe("Comment form component", () => {
  beforeEach(() => {
    mockProps = {
      handleCommentSubmit: vi.fn(),
      handleResetForm: vi.fn(),
      placeholder: "This is placeholder",
      inputValue: "This is value",
      setInputValue: vi.fn(),
    };
  });

  it("renders correctly", () => {
    const { component } = setup();

    expect(component.container).toMatchSnapshot();
  });

  it("calls setInputValue on textarea typing", async () => {
    const { user, textarea } = setup();

    await user.type(textarea, "ABC");
    expect(mockProps.setInputValue).toHaveBeenCalledTimes(3);

    await user.type(textarea, "YZ");
    expect(mockProps.setInputValue).toHaveBeenCalledTimes(5);
  });

  it("calls handleCommentSubmit on Send button click", async () => {
    const { user, submitButton } = setup();
    await user.click(submitButton);

    expect(mockProps.handleCommentSubmit).toHaveBeenCalledOnce();
  });

  it("calls handleResetForm on Cancel button click", async () => {
    const { user, resetButton } = setup();
    await user.click(resetButton);

    expect(mockProps.handleResetForm).toHaveBeenCalledOnce();
  });

  it("shows when form invalid but only when textarea value is not empty", () => {
    const tooLongComment = (() => {
      let comment = "";
      for (let i = 0; i < ranges.commentText.max + 1; i++) {
        comment += "A";
      }

      return comment;
    })();

    const { errorMessage: firstErrorMessage, unmount } = setup({
      inputValue: "",
    });
    expect(firstErrorMessage).not.toBeInTheDocument();
    unmount();

    const { errorMessage: secondErrorMessage } = setup({
      inputValue: tooLongComment,
    });
    expect(secondErrorMessage).toBeInTheDocument();
  });

  it("does not call handleCommentSubmit if form is invalid", async () => {
    const { user, submitButton } = setup({ inputValue: "" });
    await user.click(submitButton);

    expect(mockProps.handleCommentSubmit).not.toHaveBeenCalled();
  });
});
