import useAuth from "@/hooks/useAuth";
import AuthPrompt from "./auth-prompt/auth-prompt";
import NewCommentInput from "./new-comment-input/new-comment-input";

const CommentWrite = () => {
  const { user } = useAuth();
  const isUserLogged = user !== null;

  return <div>{isUserLogged ? <NewCommentInput /> : <AuthPrompt />}</div>;
};

export default CommentWrite;
