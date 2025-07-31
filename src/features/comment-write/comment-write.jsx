import useAuth from "@/hooks/useAuth";
import AuthPrompt from "./auth-prompt/auth-prompt";
import NewCommentInput from "./new-comment-input/new-comment-input";
import useBlogComments from "@/hooks/useBlogComments";
import EditCommentInput from "./edit-comment-input/edit-comment-input";

const CommentWrite = () => {
  const { isAuthenticated } = useAuth();
  const { commentToEdit } = useBlogComments();

  return (
    <div>
      {isAuthenticated ? (
        !commentToEdit ? (
          <NewCommentInput />
        ) : (
          <EditCommentInput />
        )
      ) : (
        <AuthPrompt />
      )}
    </div>
  );
};

export default CommentWrite;
