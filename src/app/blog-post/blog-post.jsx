import { Link, useLoaderData } from "react-router-dom";
import Post from "@/features/post/post";
import CommentList from "@/features/comment-list/comment-list";

const BlogPost = () => {
  const { post, comments } = useLoaderData();

  return (
    <main>
      <Link to={"/"}>{"<--"} Back to blog list</Link>
      <Post post={post} />
      <CommentList commentList={comments} />
    </main>
  );
};

export default BlogPost;
