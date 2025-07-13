import PropTypes from "prop-types";
import Comment from "../comment/comment";

const CommentList = ({ commentList }) => {
  return (
    <ul>
      {commentList.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
};

CommentList.propTypes = {
  commentList: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }),
      text: PropTypes.string.isRequired,
      edited_at: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    }),
  ),
};

export default CommentList;
