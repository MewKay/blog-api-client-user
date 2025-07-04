import PropTypes from "prop-types";

const PostItem = ({ post }) => {
  const { title, preview, created_at, author } = post;

  return (
    <li>
      <h3>{title}</h3>
      <p>
        by @{author.username} at {created_at}
      </p>
      <p>{preview}</p>
    </li>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    author: PropTypes.shape({ username: PropTypes.string.isRequired }),
  }),
};

export default PostItem;
