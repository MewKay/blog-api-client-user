import useBlogComments from "@/hooks/useBlogComments";
import Comment from "../comment/comment";
import Button from "@/components/button/button";
import Loader from "@/components/loader/loader";
import styles from "./comment-list.module.css";

const CommentList = () => {
  const { comments, updateComments } = useBlogComments();
  const { data: commentList, loading, error } = comments;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>
            Something went wrong while fetching the comments. Please try again
            later.
          </p>
          <Button colorScheme={"light"} onClick={updateComments}>
            Retry
          </Button>
        </div>
      ) : (
        <ul className={styles.list}>
          {commentList.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentList;
