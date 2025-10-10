import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatPostDate } from "./post-item.util";
import sqids from "@/lib/sqids";
import { Dot } from "lucide-react";
import styles from "./post-item.module.css";

const PostItem = ({ post }) => {
  const { id, title, preview, created_at, author, slug } = post;
  const postDate = formatPostDate(created_at);
  const encodedId = sqids.encode(id);

  return (
    <li className={styles.container}>
      <Link to={`/posts/${encodedId}/${slug}`}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.info}>
          <p className={styles.username}>
            by <span>@{author.username}</span>
          </p>
          <Dot />
          <p className={styles.date}>{postDate}</p>
        </div>
        <p className={styles.preview}>{preview}</p>
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
