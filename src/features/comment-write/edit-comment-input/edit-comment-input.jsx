import { useEffect, useState } from "react";
import authService from "@/services/auth.service";
import useBlogComments from "@/hooks/useBlogComments";
import CommentForm from "@/components/comment-form/comment-form";
import commentService from "@/services/comment.service";

const EditCommentInput = () => {
  const { postId, commentToEdit, setCommentToEdit, updateComments } =
    useBlogComments();
  const { text } = commentToEdit;
  const [comment, setComment] = useState(text);

  useEffect(() => {
    setComment(text);
  }, [text]);

  const handleResetForm = () => {
    setCommentToEdit(null);
    setComment("");
  };

  const handleCommentSubmit = async () => {
    const newText = comment;
    const token = authService.getToken();

    await commentService.updateOne(
      { postId, commentId: commentToEdit.id, text: newText },
      token,
    );

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
