import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatPostDate } from "./post-item.util";
import sqids from "@/lib/sqids";

const PostItem = ({ post }) => {
  const { id, title, preview, created_at, author, slug } = post;
  const postDate = formatPostDate(created_at);
  const encodedId = sqids.encode(id);

  return (
    <li>
      <Link to={`/posts/${encodedId}/${slug}`}>
        <h3>{title}</h3>
        <p>
          by @{author.username} &middot; {postDate}
        </p>
        <p>{preview}</p>
      </Link>
    </li>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    author: PropTypes.shape({ username: PropTypes.string.isRequired }),
    slug: PropTypes.string.isRequired,
  }),
};

export default PostItem;
