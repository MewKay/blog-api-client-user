import useFetchPost from "./useFetchPost";
import PropTypes from "prop-types";

const Post = ({ id }) => {
  const { post, loading, error } = useFetchPost(id);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try to refresh the page.</p>;
  }

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
  id: PropTypes.number.isRequired,
};

export default Post;
