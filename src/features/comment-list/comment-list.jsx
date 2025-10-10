import useBlogComments from "@/hooks/useBlogComments";
import Comment from "../comment/comment";
import Button from "@/components/button/button";

const CommentList = () => {
  const { comments, updateComments } = useBlogComments();
  const { data: commentList, loading, error } = comments;

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
          <p>
            Something went wrong while fetching the comments. Please try again
            later.
          </p>
          <Button colorScheme={"light"} onClick={updateComments}>
            Retry
          </Button>
        </div>
      ) : (
        <ul>
          {commentList.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentList;
