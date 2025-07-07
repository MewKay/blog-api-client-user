import postService from "@/services/post.service";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Post = ({ id }) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    postService
      .getById(id)
      .then((post) => {
        setPost(post);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setPost({});
        setLoading(false);
        setError(error.message);
      });
  }, [id]);

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
