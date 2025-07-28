import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import {
  BlogCommentsContext,
  BlogCommentsProvider,
} from "./blog-comments.context";
import commentService from "@/services/comment.service";
import mockComments from "@/testing/mocks/comments";
import userEvent from "@testing-library/user-event";

vi.mock("@/services/comment.service.js", () => ({
  default: {
    getAllByPostId: vi.fn(),
  },
}));

const mockPostId = 4;

const MockConsumerComponent = () => {
  const { postId, comments, updateComments } = useContext(BlogCommentsContext);
  const { data: commentList, loading, error } = comments;

  return (
    <div>
      <p>{postId}</p>
      <div>
        {loading ? (
          <p>Loading</p>
        ) : error ? (
          <p>This is error</p>
        ) : (
          <ul>
            {commentList?.map((comment) => (
              <li key={comment.id}>Comment : {comment.text}</li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={updateComments}>Update</button>
    </div>
  );
};

const renderProvider = () => {
  render(
    <BlogCommentsProvider postId={mockPostId}>
      <MockConsumerComponent />
    </BlogCommentsProvider>,
  );
};

describe("BlogComments context", () => {
  it.each([
    {
      contextValue: "postId",
      caseSetup: () => {},
      displayValue: mockPostId,
    },
    {
      contextValue: "comments.loading",
      caseSetup: () => {
        commentService.getAllByPostId.mockReturnValueOnce(
          new Promise(() => {}),
        );
      },
      displayValue: /loading/i,
    },
    {
      contextValue: "comments.error",
      caseSetup: () => {
        commentService.getAllByPostId.mockRejectedValueOnce(
          new Error("This is an error!"),
        );
      },
      displayValue: /error/i,
    },
    {
      contextValue: "comments.data",
      caseSetup: () => {
        commentService.getAllByPostId.mockResolvedValueOnce(mockComments);
      },
      displayValue: mockComments,
    },
  ])(
    "provides $contextValue to context consumers",
    async ({ caseSetup, displayValue }) => {
      caseSetup();
      renderProvider();
      const isDisplayValueComments = Array.isArray(displayValue);

      if (!isDisplayValueComments) {
        const valueElement = await screen.findByText(displayValue);
        expect(valueElement).toBeInTheDocument();
      } else {
        for (let value of displayValue) {
          const valuePattern = new RegExp(value.text);
          const valueElement = await screen.findByText(valuePattern);
          expect(valueElement).toBeInTheDocument();
        }
      }
    },
  );

  it("provides updateComments function to context consumers", async () => {
    const user = userEvent.setup();
    commentService.getAllByPostId.mockResolvedValueOnce(mockComments);
    renderProvider();

    const commentsText = async () => await screen.findAllByText(/Comment :/i);
    expect(await commentsText()).toHaveLength(mockComments.length);

    const newMockComments = structuredClone(mockComments);
    newMockComments.push({ id: 34, text: "This is ultimate comment" });
    commentService.getAllByPostId.mockResolvedValueOnce(newMockComments);

    const updateButton = await screen.findByText(/update/i);
    await user.click(updateButton);

    const newCommentsText = await commentsText();

    newCommentsText.forEach((comment) => {
      expect(comment).toBeInTheDocument();
    });
    expect(await commentsText()).toHaveLength(newMockComments.length);
  });
});
