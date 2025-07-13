import PropTypes from "prop-types";
import { formatPostDate } from "./post.util";
import { isSameDay } from "date-fns";

const Post = ({ post }) => {
  const { title, text, created_at, edited_at, author } = post;

  const formattedCreateDate = formatPostDate(created_at);
  const formattedEditDate = formatPostDate(edited_at);
  const isPostEdited = !isSameDay(formattedCreateDate, formattedEditDate);

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <p>{formattedCreateDate}</p>
        {isPostEdited && `( Last edited ${formattedEditDate} )`} |
        <p>{author.username}</p>
      </div>
      <div>{text}</div>
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
