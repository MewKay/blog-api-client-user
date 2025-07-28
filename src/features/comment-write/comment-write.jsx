import useAuth from "@/hooks/useAuth";
import AuthPrompt from "./auth-prompt/auth-prompt";
import NewCommentInput from "./new-comment-input/new-comment-input";
import PropTypes from "prop-types";

const CommentWrite = ({ updateComments }) => {
  const { user } = useAuth();
  const isUserLogged = user !== null;

  return (
    <div>
      {isUserLogged ? (
        <NewCommentInput updateComments={updateComments} />
      ) : (
        <AuthPrompt />
      )}
    </div>
  );
};

CommentWrite.propTypes = {
  updateComments: PropTypes.func.isRequired,
};

export default CommentWrite;
