import authService from "@/services/auth.service";
import commentService from "@/services/comment.service";
import useBlogComments from "@/hooks/useBlogComments";
import CommentForm from "@/components/comment-form/comment-form";
import { useState } from "react";

const NewCommentInput = () => {
  const { postId, updateComments } = useBlogComments();
  const [comment, setComment] = useState("");

  const handleResetForm = () => {
    setComment("");
  };

  const handleCommentSubmit = async () => {
    const text = comment;
    const token = authService.getToken();

    await commentService.createOne({ postId, text }, token);
    handleResetForm();
    updateComments();
  };

  return (
    <>
      <CommentForm
        handleCommentSubmit={handleCommentSubmit}
        handleResetForm={handleResetForm}
        placeholder="Write a new comment..."
        inputValue={comment}
        setInputValue={setComment}
      />
    </>
  );
};

export default NewCommentInput;
