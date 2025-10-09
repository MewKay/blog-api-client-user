import PropTypes from "prop-types";
import { formatPostDate } from "./post.util";
import { isSameDay } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import styles from "./post.module.css";

const Post = ({ post }) => {
  const { title, text, created_at, edited_at, author } = post;

  const formattedCreateDate = formatPostDate(created_at);
  const formattedEditDate = formatPostDate(edited_at);
  const isPostEdited = !isSameDay(formattedCreateDate, formattedEditDate);

  return (
    <div className={styles.postContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.info}>
        <div className={styles.date}>
          <p className={styles.create}>{formattedCreateDate}</p>
          {isPostEdited && (
            <p className={styles.edit}>{`Last edited ${formattedEditDate}`}</p>
          )}
        </div>
        <EllipsisVertical />
        <p className={styles.username}>{author.username}</p>
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    edited_at: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

export default Post;
