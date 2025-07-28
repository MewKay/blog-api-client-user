import { Link, useLoaderData } from "react-router-dom";
import Post from "@/features/post/post";
import CommentList from "@/features/comment-list/comment-list";
import useFetchComments from "./useFetchComments";
import CommentWrite from "@/features/comment-write/comment-write";

const BlogPost = () => {
  const { post, postId } = useLoaderData();
  const { comments, updateComments } = useFetchComments(postId);

  return (
    <main>
      <Link to={"/"}>{"<--"} Back to blog list</Link>
      <Post post={post} />
      <CommentWrite updateComments={updateComments} />
      <CommentList commentList={comments.data} />
    </main>
  );
};

export default BlogPost;
