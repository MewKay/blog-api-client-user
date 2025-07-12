import PropTypes from "prop-types";

const Post = ({ post }) => {
  const { title, text, created_at, author } = post;

  return (
    <div>
      <h2>{title}</h2>
      <p>
        {created_at} | {author.username}
      </p>
      <div>{text}</div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default Post;
