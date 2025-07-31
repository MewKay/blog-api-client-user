import { useState } from "react";
import authService from "@/services/auth.service";
import useBlogComments from "@/hooks/useBlogComments";
import CommentForm from "@/components/comment-form/comment-form";

const EditCommentInput = () => {
  const { postId, commentToEdit, setCommentToEdit, updateComments } =
    useBlogComments();
  const { text } = commentToEdit;
  const [comment, setComment] = useState(text);

  const handleResetForm = () => {
    setCommentToEdit(null);
    setComment("");
  };

  const handleCommentSubmit = async () => {
    const text = comment;
    const token = authService.getToken();

    // TO DO: Send update comment API

    handleResetForm();
    updateComments();
  };

  return (
    <>
      <CommentForm
        handleCommentSubmit={handleCommentSubmit}
        handleResetForm={handleResetForm}
        inputValue={comment}
        setInputValue={setComment}
      />
    </>
  );
};

export default EditCommentInput;
