import useBlogComments from "@/hooks/useBlogComments";
import Comment from "../comment/comment";

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
          <button onClick={updateComments}>Retry</button>
        </div>
      ) : (
        <ul>
          {commentList.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentList;
