import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentForm from "./comment-form";

//Mock props
const handleCommentSubmit = vi.fn();
const handleResetForm = vi.fn();
const placeholder = "This is placeholder";
const inputValue = "This is value";
const setInputValue = vi.fn();

describe("Comment form component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <CommentForm
        handleCommentSubmit={handleCommentSubmit}
        handleResetForm={handleResetForm}
        placeholder={placeholder}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it("calls setInputValue on textarea typing", async () => {
    const user = userEvent.setup();

    render(
      <CommentForm
        handleCommentSubmit={handleCommentSubmit}
        placeholder={placeholder}
        setInputValue={setInputValue}
      />,
    );

    const textarea = screen.getByPlaceholderText(placeholder);
    await user.type(textarea, "ABC");

    expect(setInputValue).toHaveBeenCalledTimes(3);

    await user.type(textarea, "YZ");
    expect(setInputValue).toHaveBeenCalledTimes(5);
  });

  it("calls handleCommentSubmit on Send button click", async () => {
    const user = userEvent.setup();

    render(
      <CommentForm
        handleCommentSubmit={handleCommentSubmit}
        setInputValue={setInputValue}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /Send/i });
    await user.click(submitButton);

    expect(handleCommentSubmit).toHaveBeenCalledOnce();
  });

  it("calls handleResetForm on Cancel button click", async () => {
    const user = userEvent.setup();

    render(
      <CommentForm
        handleCommentSubmit={handleCommentSubmit}
        handleResetForm={handleResetForm}
        setInputValue={setInputValue}
      />,
    );

    const resetButton = screen.getByRole("button", { name: /Cancel/i });
    await user.click(resetButton);

    expect(handleResetForm).toHaveBeenCalledOnce();
  });
});
