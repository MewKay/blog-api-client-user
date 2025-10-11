import { useLoaderData } from "react-router-dom";
import Post from "@/features/post/post";
import CommentList from "@/features/comment-list/comment-list";
import CommentWrite from "@/features/comment-write/comment-write";
import { BlogCommentsProvider } from "@/context/blog-comments.context";
import BackLink from "@/components/back-link/back-link";
import paths from "@/app/routes/paths";
import ScrollButton from "@/components/scroll-button/scroll-button";
import useScrollButtonVisibility from "@/hooks/useScrollButtonVisibility";

const BlogPost = () => {
  const { post, postId } = useLoaderData();
  const scrollVisibility = useScrollButtonVisibility();

  return (
    <BlogCommentsProvider postId={postId}>
      <main>
        <BackLink to={paths.home.path} label="Back to blog list" />
        <Post post={post} />
        <CommentWrite />
        <CommentList />
        <ScrollButton isVisible={scrollVisibility} />
      </main>
    </BlogCommentsProvider>
  );
};

export default BlogPost;
