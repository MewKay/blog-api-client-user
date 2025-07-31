import useAuth from "@/hooks/useAuth";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from "prop-types";

const Comment = ({ comment }) => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const { user, text, edited_at, created_at } = comment;

  const isCommentOfCurrentUser =
    isAuthenticated && currentUser.username === comment.user.username;
  const isCommentEdited = edited_at !== created_at;

  const formattedDate = formatDistanceToNowStrict(created_at, {
    addSuffix: true,
  });

  return (
    <>
      <div>
        <h6>{user.username}</h6>
        <span>
          <p>&middot; {formattedDate}</p>
          {isCommentEdited && "(edited)"}
        </span>
      </div>
      <p>{text}</p>
      {isCommentOfCurrentUser && <button>Edit</button>}
    </>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    text: PropTypes.string.isRequired,
    edited_at: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
};

export default Comment;
