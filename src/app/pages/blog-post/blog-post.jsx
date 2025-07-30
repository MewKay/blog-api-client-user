import { Link, useLoaderData } from "react-router-dom";
import Post from "@/features/post/post";
import CommentList from "@/features/comment-list/comment-list";
import CommentWrite from "@/features/comment-write/comment-write";
import { BlogCommentsProvider } from "@/context/blog-comments.context";

const BlogPost = () => {
  const { post, postId } = useLoaderData();

  return (
    <BlogCommentsProvider postId={postId}>
      <main>
        <Link to={"/"}>{"<--"} Back to blog list</Link>
        <Post post={post} />
        <CommentWrite />
        <CommentList />
      </main>
    </BlogCommentsProvider>
  );
};

export default BlogPost;
