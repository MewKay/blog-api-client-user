import useAuth from "@/hooks/useAuth";
import useBlogComments from "@/hooks/useBlogComments";
import { formatDistanceToNowStrict } from "date-fns";
import PropTypes from "prop-types";
import { Dot, Pencil } from "lucide-react";
import styles from "./comment.module.css";

const Comment = ({ comment }) => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const { setCommentToEdit } = useBlogComments();
  const { user, text, edited_at, created_at } = comment;

  const isCommentOfCurrentUser =
    isAuthenticated && currentUser.username === comment.user.username;
  const isCommentEdited = edited_at !== created_at;

  const formattedDate = formatDistanceToNowStrict(created_at, {
    addSuffix: true,
  });

  return (
    <li className={styles.commentContainer}>
      <div className={styles.head}>
        <p className={styles.username}>{user.username}</p>
        <Dot />
        <span className={styles.commentDetails}>
          <p>{formattedDate}</p>
          {isCommentEdited && "(edited)"}
        </span>
      </div>
      <p>{text}</p>
      {isCommentOfCurrentUser && (
        <button
          className={styles.editButton}
          aria-label="Edit your comment"
          onClick={() => setCommentToEdit(comment)}
        >
          <Pencil />
        </button>
      )}
    </li>
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
