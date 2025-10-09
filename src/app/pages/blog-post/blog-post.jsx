import { useLoaderData } from "react-router-dom";
import Post from "@/features/post/post";
import CommentList from "@/features/comment-list/comment-list";
import CommentWrite from "@/features/comment-write/comment-write";
import { BlogCommentsProvider } from "@/context/blog-comments.context";
import BackLink from "@/components/back-link/back-link";
import ROUTES_PATH from "@/app/routes/path";

const BlogPost = () => {
  const { post, postId } = useLoaderData();

  return (
    <BlogCommentsProvider postId={postId}>
      <main>
        <BackLink to={ROUTES_PATH.home} label="Back to blog list" />
        <Post post={post} />
        <CommentWrite />
        <CommentList />
      </main>
    </BlogCommentsProvider>
  );
};

export default BlogPost;
