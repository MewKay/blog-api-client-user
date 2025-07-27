import { Link, useLoaderData } from "react-router-dom";
import Post from "@/features/post/post";
import CommentList from "@/features/comment-list/comment-list";
import useFetchComments from "./useFetchComments";

const BlogPost = () => {
  const { post, postId } = useLoaderData();
  const { comments } = useFetchComments(postId);

  return (
    <main>
      <Link to={"/"}>{"<--"} Back to blog list</Link>
      <Post post={post} />
      <CommentList commentList={comments.data} />
    </main>
  );
};

export default BlogPost;
