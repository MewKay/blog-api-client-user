import PropTypes from "prop-types";

const CommentList = ({ commentList }) => {
  return (
    <ul>
      {commentList.map((comment) => (
        <li key={comment.id}>
          <div>
            <h6>{comment.user.username}</h6>
            <p>{comment.user.updated_at}</p>
          </div>
          <p>{comment.text}</p>
        </li>
      ))}
    </ul>
  );
};

CommentList.propTypes = {
  commentList: PropTypes.array(),
};

export default CommentList;
